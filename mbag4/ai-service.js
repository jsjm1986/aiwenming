class AIService {
    constructor() {
        this.apiEndpoint = '/api/chat';  // 改为你的后端API地址
        // 设置基本配置
        this.isSimulated = false;
        this.retryCount = 3;
        this.retryDelay = 1000;
        
        // 添加状态管理
        this.statusTimeout = null;
        this.statusDuration = 3000;

        // 添加请求限制配置
        this.requestLimits = {
            deepseek: {
                requestsPerMinute: 30,
                lastRequestTime: 0,
                minInterval: 2000
            },
            glm: {
                requestsPerMinute: 1,
                lastRequestTime: 0,
                minInterval: 60000,  // 1分钟
                backoffFactor: 2,
                maxInterval: 300000,  // 5分钟
                currentBackoff: 60000,
                isWaiting: false
            }
        };

        // 添加请求计数器
        this.requestCounts = {
            deepseek: {
                count: 0,
                resetTime: Date.now()
            },
            glm: {
                count: 0,
                resetTime: Date.now()
            }
        };

        if (!window.CONFIG || !window.CONFIG.models) {
            console.error('CONFIG not found, using default configuration');
            this.config = {
                models: {
                    deepseek: {
                        name: 'DeepSeek',
                        endpoint: 'https://api.deepseek.com/v1/chat/completions',
                        apiKey: 'sk-e2248350819f46adaaf811cc1e6d1bd7',
                        maxTokens: 4000,
                        temperature: 0.7,
                        model: "deepseek-chat"
                    }
                }
            };
        } else {
            this.config = window.CONFIG;
        }

        // 初始化当前模型
        this.currentModel = this.config.models.deepseek;
        console.log('Initialized with model:', this.currentModel.name);
    }

    // 添加请求限制检查方法
    async checkRequestLimit(modelName) {
        const limit = this.requestLimits[modelName];
        const counter = this.requestCounts[modelName];
        if (!limit || !counter) return true;

        const now = Date.now();
        
        // 重置计数器
        if (now - counter.resetTime >= 60000) {
            counter.count = 0;
            counter.resetTime = now;
        }

        // 检查请求频率
        if (counter.count >= limit.requestsPerMinute) {
            this.updateRequestStatus(`${modelName} 达到请求限制，等待重置...`, 'warning');
            await new Promise(resolve => setTimeout(resolve, 60000));
            counter.count = 0;
            counter.resetTime = Date.now();
        }

        // 检查请求间隔
        const timeSinceLastRequest = now - limit.lastRequestTime;
        if (timeSinceLastRequest < limit.minInterval) {
            const waitTime = limit.minInterval - timeSinceLastRequest;
            this.updateRequestStatus(`等待 ${Math.ceil(waitTime/1000)}秒后继续请求...`, 'info');
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        // 更新计数器和时间戳
        counter.count++;
        limit.lastRequestTime = Date.now();
        return true;
    }

    // 更新状态显示方法
    updateRequestStatus(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        const statusElement = document.getElementById('requestStatus');
        if (!statusElement) return;

        // 清除之前的超时
        if (this.statusTimeout) {
            clearTimeout(this.statusTimeout);
        }

        // 更新状态样式和内容
        statusElement.className = `request-status ${type}`;
        statusElement.innerHTML = `
            <span class="status-icon">${this.getStatusIcon(type)}</span>
            <span class="status-message">${message}</span>
        `;
        statusElement.style.display = 'flex';

        // 设置自动隐藏
        this.statusTimeout = setTimeout(() => {
            statusElement.style.opacity = '0';
            setTimeout(() => {
                statusElement.style.display = 'none';
                statusElement.style.opacity = '1';
            }, 300);
        }, this.statusDuration);
    }

    // 获取状态图标
    getStatusIcon(type) {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return '💭';
        }
    }

    // 修改请求方法中的状态更新
    async makeAPIRequest(prompt, attempt = 1) {
        try {
            const model = this.currentModel;
            await this.checkRequestLimit(model.name.toLowerCase());

            this.updateRequestStatus(`正在使用 ${model.name} 处理请求 (第 ${attempt} 次尝试)`);

            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                
                if (model.name === 'DeepSeek') {
                    if (attempt < this.retryCount) {
                        this.updateRequestStatus(
                            `DeepSeek 请求失败，等待重试... (${attempt}/${this.retryCount})`,
                            'warning'
                        );
                        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
                        return this.makeAPIRequest(prompt, attempt + 1);
                    }
                    
                    this.updateRequestStatus('切换到 GLM 模型...', 'warning');
                    this.currentModel = this.config.models.glm;
                    return this.makeGLMRequest(
                        this.currentModel.endpoint,
                        this.currentModel.headers,
                        {
                            messages: [{
                                role: "user",
                                content: prompt
                            }]
                        }
                    );
                }
                
                this.updateRequestStatus(`请求失败: ${response.status}`, 'error');
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            this.updateRequestStatus(`${model.name} 请求成功`, 'success');
            return data.choices[0].message.content;

        } catch (error) {
            console.error('API request error:', error);
            this.updateRequestStatus(`请求出错: ${error.message}`, 'error');
            
            if (this.currentModel.name === 'DeepSeek') {
                if (attempt < this.retryCount) {
                    return this.makeAPIRequest(prompt, attempt + 1);
                }
                this.currentModel = this.config.models.glm;
                return this.makeGLMRequest(
                    this.currentModel.endpoint,
                    this.currentModel.headers,
                    {
                        messages: [{
                            role: "user",
                            content: prompt
                        }]
                    }
                );
            }
            
            throw error;
        }
    }

    // 修改 getAnalysis 方法
    async getAnalysis(prompt, attempt = 1) {
        try {
            const model = this.currentModel;
            await this.checkRequestLimit(model.name.toLowerCase());

            this.updateRequestStatus(`正在分析事件...`);

            let response = await fetch(model.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${model.apiKey}`
                },
                body: JSON.stringify({
                    model: model.model,
                    messages: [{
                        role: "user",
                        content: prompt
                    }],
                    temperature: model.temperature,
                    max_tokens: model.maxTokens
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                
                if (model.name === 'DeepSeek') {
                    if (attempt < this.retryCount) {
                        this.updateRequestStatus(
                            `分析失败，正在重试... (${attempt}/${this.retryCount})`,
                            'warning'
                        );
                        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
                        return this.getAnalysis(prompt, attempt + 1);
                    }
                    
                    this.updateRequestStatus('切换到 GLM 模型继续分析...', 'warning');
                    this.currentModel = this.config.models.glm;
                    return this.makeGLMRequest(
                        this.currentModel.endpoint,
                        this.currentModel.headers,
                        {
                            messages: [{
                                role: "user",
                                content: prompt
                            }]
                        }
                    ).then(response => response.json())
                     .then(data => data.choices[0].message.content);
                }
                
                this.updateRequestStatus(`分析失败: ${response.status}`, 'error');
                throw new Error(`Analysis request failed: ${response.status}`);
            }

            const data = await response.json();
            this.updateRequestStatus(`分析完成`, 'success');
            return data.choices[0].message.content;

        } catch (error) {
            console.error('Analysis error:', error);
            this.updateRequestStatus(`分析出错: ${error.message}`, 'error');
            
            if (this.currentModel.name === 'DeepSeek') {
                this.currentModel = this.config.models.glm;
                return this.makeGLMRequest(
                    this.currentModel.endpoint,
                    this.currentModel.headers,
                    {
                        messages: [{
                            role: "user",
                            content: prompt
                        }]
                    }
                ).then(response => response.json())
                 .then(data => data.choices[0].message.content);
            }
            
            throw error;
        }
    }

    // 添加 getCivilizationResponse 方法
    async getCivilizationResponse(civilization, event, powerAnalysis, stage = 'initial', prompt = '') {
        try {
            const model = this.currentModel;
            await this.checkRequestLimit(model.name.toLowerCase());

            // 构建提示词
            const basePrompt = prompt || `
                作为${civilization.name}，分析以下事件及其影响：
                
                事件：${event}
                
                权力分析：${JSON.stringify(powerAnalysis, null, 2)}
                
                基于文明特征：
                - 政治体系：${civilization.traits.governmentType}
                - 经济体系：${civilization.traits.economicSystem}
                - 文化价值观：${civilization.traits.culturalValues.join(', ')}
                - 发展重点：${civilization.traits.developmentPriorities.join(', ')}
                
                请提供：
                1. 对事件的立场和态度
                2. 具体的应对策略
                3. 可能采取的行动
                4. 对其他文明的影响考虑
                
                请严格按照以下JSON格式返回：
                {
                    "stance": "立场描述",
                    "strategy": "策略描述",
                    "actions": ["具体行动1", "具体行动2"],
                    "considerations": "对其他文明的考虑"
                }
            `;

            this.updateRequestStatus(`分析${civilization.name}的响应...`);

            const response = await fetch(model.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${model.apiKey}`
                },
                body: JSON.stringify({
                    model: model.model,
                    messages: [{
                        role: "user",
                        content: basePrompt
                    }],
                    temperature: model.temperature,
                    max_tokens: model.maxTokens
                })
            });

            if (!response.ok) {
                if (model.name === 'DeepSeek') {
                    this.currentModel = this.config.models.glm;
                    return this.getCivilizationResponse(civilization, event, powerAnalysis, stage, prompt);
                }
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const content = data.choices[0].message.content;

            // 清理响应文本，确保只包含 JSON 部分
            let cleanResponse = content;
            if (content.includes('```json')) {
                cleanResponse = content.split('```json')[1].split('```')[0];
            }
            cleanResponse = cleanResponse.trim();

            try {
                return JSON.parse(cleanResponse);
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.log('Clean response:', cleanResponse);
                
                // 返回一个默认的响应
                return {
                    stance: "无法解析立场",
                    strategy: "无法解析策略",
                    actions: ["无法解析行动"],
                    considerations: "无法解析考虑"
                };
            }

        } catch (error) {
            console.error(`Error getting response for ${civilization.name}:`, error);
            throw new Error(`获取${civilization.name}的响应时发生错误`);
        }
    }

    // 修改 analyzeHistoricalReference 方法
    async analyzeHistoricalReference(civilization, eventText) {
        const prompt = `
            作为${civilization.name}的历史顾问，请基于历史经验分析此事件：
            
            事件内容：${eventText}
            
            请从以下维度分析：
            1. 历史相似案例分析（至少2个案例）
            2. 历史经验教训总结
            3. 历史经验适用性分析
            
            请严格按照以下JSON格式返回：
            {
                "cases": [
                    {
                        "title": "历史案例标题",
                        "year": "发生年份",
                        "description": "案例描述",
                        "outcome": "历史结果",
                        "lessons": ["经验教训1", "经验教训2"]
                    }
                ],
                "lessons": ["总体教训1", "总体教训2"],
                "applicabilityScore": 0.8,
                "summary": "历史经验总结"
            }
        `;
        
        return this.getAnalysis(prompt);
    }

    // 修改 analyzeCivilizationTraits 方法
    async analyzeCivilizationTraits(civilization, eventText) {
        const prompt = `
            作为${civilization.name}的文明专家，基于文明特征分析此事件：
            
            事件内容：${eventText}
            
            文明特征：
            - 政治体系：${civilization.traits.governmentType}
            - 经济体系：${civilization.traits.economicSystem}
            - 文化价值观：${civilization.traits.culturalValues.join(', ')}
            - 发展重点：${civilization.traits.developmentPriorities.join(', ')}
            
            请分析：
            1. 与核心价值观的契合度
            2. 对政治体系的挑战
            3. 对经济体系的影响
            4. 对发展重点的冲击
            5. 文明适应能力评估
            
            请严格按照以下JSON格式返回：
            {
                "valueAlignment": {
                    "score": 0.7,
                    "description": "契合度描述",
                    "keyPoints": ["关键点1", "关键点2"]
                },
                "systemImpacts": {
                    "political": {
                        "level": 0.6,
                        "description": "政治影响描述"
                    },
                    "economic": {
                        "level": 0.5,
                        "description": "经济影响描述"
                    }
                },
                "adaptability": {
                    "description": "适应能力描述",
                    "factors": [
                        {
                            "type": "strength",
                            "name": "优势因素",
                            "strength": 0.8
                        }
                    ]
                }
            }
        `;
        
        return this.getAnalysis(prompt);
    }

    // 修改 analyzeInternalImpact 方法
    async analyzeInternalImpact(civilization, eventText) {
        const prompt = `
            作为${civilization.name}的内政顾问，评估此事件的内部影响：
            
            事件内容：${eventText}
            
            请评估：
            1. 政治稳定性影响
            2. 社会凝聚力影响
            3. 经济发展影响
            4. 文化认同影响
            5. 民众反应预测
            
            请严格按照以下JSON格式返回：
            {
                "stability": {
                    "political": {
                        "level": 0.7,
                        "description": "政治稳定性影响"
                    },
                    "social": {
                        "level": 0.6,
                        "description": "社会稳定性影响"
                    }
                },
                "impacts": {
                    "economic": {
                        "level": 0.5,
                        "description": "经济影响"
                    },
                    "cultural": {
                        "level": 0.8,
                        "description": "文化影响"
                    }
                },
                "publicResponse": {
                    "sentiment": 0.6,
                    "description": "民众反应预测",
                    "factors": ["因素1", "因素2"]
                }
            }
        `;
        
        return this.getAnalysis(prompt);
    }

    // 修改 analyzeExternalRelations 方法
    async analyzeExternalRelations(civilization, eventText) {
        const prompt = `
            作为${civilization.name}的外交战略家，评估此事件的外部影响：
            
            事件内容：${eventText}
            
            请评估：
            1. 国际地位影响
            2. 地区格局影响
            3. 文明间关系影响
            4. 国际话语权影响
            5. 文明竞争力影响
            
            请严格按照以下JSON格式返回：
            {
                "international": {
                    "level": 0.7,
                    "description": "国际影响描述"
                },
                "regional": {
                    "level": 0.6,
                    "description": "地区影响描述"
                },
                "relations": {
                    "level": 0.5,
                    "description": "关系影响描述"
                }
            }
        `;
        
        return this.getAnalysis(prompt);
    }

    // 修改 makeStrategicDecision 方法
    async makeStrategicDecision(civilization, eventText) {
        const prompt = `
            作为${civilization.name}的战略规划师，制定应对方案：
            
            事件内容：${eventText}
            
            请规划：
            1. 总体立场和态度
            2. 战略目标设定
            3. 具体行动计划
            4. 资源调配方案
            5. 风险控制措施
            
            请严格按照以下JSON格式返回：
            {
                "stance": {
                    "position": "立场描述",
                    "attitude": "态度说明",
                    "reasoning": ["理由1", "理由2"]
                },
                "objectives": {
                    "shortTerm": ["短期目标1", "短期目标2"],
                    "mediumTerm": ["中期目标1", "中期目标2"],
                    "longTerm": ["长期目标1", "长期目标2"]
                },
                "actions": {
                    "immediate": ["立即行动1", "立即行动2"],
                    "planned": ["计划行动1", "计划行动2"],
                    "conditional": ["条件行动1", "条件行动2"]
                }
            }
        `;
        
        return this.getAnalysis(prompt);
    }

    // 修改 planImplementation 方法
    async planImplementation(civilization, eventText) {
        const prompt = `
            作为${civilization.name}的执行总监，规划具体实施路径：
            
            事件内容：${eventText}
            
            请规划：
            1. 短期行动计划（1-3个月）
            2. 中期推进方案（3-12个月）
            3. 长期发展规划（1-5年）
            4. 应急预案准备
            5. 效果评估机制
            
            请严格按照以下JSON格式返回：
            {
                "shortTerm": ["短期行动1", "短期行动2"],
                "mediumTerm": ["中期行动1", "中期行动2"],
                "longTerm": ["长期行动1", "长期行动2"],
                "emergencyPlans": ["应急预案1", "应急预案2"]
            }
        `;
        
        return this.getAnalysis(prompt);
    }
}

// 确保类被正确导出
window.AIService = AIService; 