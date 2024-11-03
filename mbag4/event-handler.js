class EventHandler {
    constructor(game) {
        this.game = game;
        this.aiService = game.aiService;
        this.currentEventId = 0;
        
        // 修改分析阶段配置
        this.stages = [
            {
                id: 'historical',
                name: '历史经验参照',
                icon: '📚',
                subStages: [
                    { id: 'cases', name: '历史案例分析', icon: '📖' },
                    { id: 'lessons', name: '经验教训总结', icon: '📝' },
                    { id: 'applicability', name: '适用性评估', icon: '🎯' }
                ]
            },
            {
                id: 'civilization',
                name: '文明特征分析',
                icon: '🏛️',
                subStages: [
                    { id: 'values', name: '价值观契合度', icon: '⚖️' },
                    { id: 'challenges', name: '挑战分析', icon: '🔍' },
                    { id: 'adaptability', name: '适应能力评估', icon: '🔄' }
                ]
            },
            {
                id: 'internal',
                name: '内部影响评估',
                icon: '🏠',
                subStages: [
                    { id: 'stability', name: '政治稳定性', icon: '🏛️' },
                    { id: 'economy', name: '经济影响', icon: '💰' },
                    { id: 'society', name: '社会影响', icon: '👥' }
                ]
            },
            {
                id: 'external',
                name: '外部关系评估',
                icon: '🌐',
                subStages: [
                    { id: 'diplomatic', name: '外交关系', icon: '🤝' },
                    { id: 'regional', name: '地区影响', icon: '🗺️' },
                    { id: 'alliance', name: '联盟关系', icon: '🤲' }
                ]
            },
            {
                id: 'strategic',
                name: '战略决策制定',
                icon: '⚡',
                subStages: [
                    { id: 'objectives', name: '目标设定', icon: '🎯' },
                    { id: 'resources', name: '资源调配', icon: '📊' },
                    { id: 'risks', name: '风险评估', icon: '⚠️' }
                ]
            },
            {
                id: 'implementation',
                name: '执行路径规划',
                icon: '📋',
                subStages: [
                    { id: 'shortTerm', name: '短期行动', icon: '⚡' },
                    { id: 'midTerm', name: '中期计划', icon: '📅' },
                    { id: 'longTerm', name: '长期战略', icon: '🎯' }
                ]
            }
        ];
    }

    stageTemplate(stage) {
        return `
            <div class="stage-item" data-stage="${stage.id}">
                <div class="stage-header">
                    <span class="stage-icon">${stage.icon}</span>
                    <div class="stage-info">
                        <div class="stage-name">${stage.name}</div>
                        <div class="stage-status">等待中</div>
                    </div>
                    <div class="stage-progress">
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                    </div>
                </div>
                <div class="sub-stages">
                    ${stage.subStages.map(subStage => `
                        <div class="sub-stage" data-substage="${subStage.id}">
                            <span class="substage-icon">${subStage.icon}</span>
                            <div class="substage-info">
                                <span class="substage-name">${subStage.name}</span>
                                <span class="substage-status">等待中</span>
                            </div>
                            <div class="substage-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async handleEvent(eventText) {
        try {
            const eventId = ++this.currentEventId;
            const responsesPanel = document.getElementById('responsesPanel');
            
            // 清空之前的内容
            responsesPanel.innerHTML = '';
            
            // 创建事件容器
            const eventContainer = document.createElement('div');
            eventContainer.className = 'event-container';
            eventContainer.innerHTML = `
                <div class="event-header">
                    <div class="event-info">
                        <span class="event-id">事件 #${eventId}</span>
                        <span class="event-time">${new Date().toLocaleTimeString()}</span>
                    </div>
                    <div class="event-text">${eventText}</div>
                </div>
                <div class="civilizations-responses"></div>
            `;
            responsesPanel.appendChild(eventContainer);

            const civilizationsContainer = eventContainer.querySelector('.civilizations-responses');

            // 遍历每个文明进行分析
            for (const civilization of this.game.civilizations) {
                try {
                    // 创建文明响应容器
                    const civilizationContainer = document.createElement('div');
                    civilizationContainer.className = 'civilization-response';
                    civilizationContainer.innerHTML = `
                        <div class="civ-header" style="border-color: ${civilization.color}">
                            <div class="civ-badge" style="background: ${civilization.color}">
                                <span class="civ-icon">🏛️</span>
                            </div>
                            <div class="civ-info">
                                <h3>${civilization.name}</h3>
                                <div class="civ-traits">
                                    <span class="trait-tag" title="政治体系">
                                        ${civilization.traits.governmentType}
                                    </span>
                                    <span class="trait-tag" title="经济体系">
                                        ${civilization.traits.economicSystem}
                                    </span>
                                    ${civilization.traits.culturalValues.map(value => 
                                        `<span class="trait-tag" title="文化价值观">${value}</span>`
                                    ).join('')}
                                </div>
                            </div>
                            <div class="civ-actions">
                                <button class="chat-btn" onclick="game.startCivilizationChat('${civilization.id}')">
                                    <span class="btn-icon">💬</span>
                                    <span class="btn-text">对话</span>
                                </button>
                                <div class="analysis-status">
                                    <span class="status-icon">⏳</span>
                                    <span class="status-text">分析中...</span>
                                </div>
                            </div>
                        </div>
                        <div class="analysis-stages"></div>
                    `;
                    civilizationsContainer.appendChild(civilizationContainer);

                    // 执行分析
                    await this.analyzeCivilization(civilization, eventText, civilizationContainer);

                    // 更新明分析状态
                    const statusIcon = civilizationContainer.querySelector('.status-icon');
                    const statusText = civilizationContainer.querySelector('.status-text');
                    statusIcon.textContent = '✅';
                    statusText.textContent = '分析完成';

                } catch (error) {
                    console.error(`Error analyzing ${civilization.name}:`, error);
                    this.showError(civilizationContainer, `分析${civilization.name}时发生错误: ${error.message}`);
                }
            }

        } catch (error) {
            console.error('Error handling event:', error);
            this.showError(responsesPanel, `处理事件 #${this.currentEventId} 时发生错误: ${error.message}`);
        }
    }

    // 格式化时间
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // 获取内容统计
    getContentStats(container) {
        const text = container.textContent;
        const charCount = text.length;
        return `${Math.round(charCount / 100) / 10}K字`;
    }

    // 修改 updateStageProgress 方法
    async updateStageProgress(container, stageId, subStageId, progress) {
        const stageElement = container.querySelector(`[data-stage="${stageId}"]`);
        if (!stageElement) return;

        const subStageElement = stageElement.querySelector(`[data-substage="${subStageId}"]`);
        if (!subStageElement) return;

        // 更新子阶段状态和进度
        const subStageStatus = subStageElement.querySelector('.substage-status');
        const subStageProgress = subStageElement.querySelector('.progress-fill');
        
        // 更新状态文本和样式
        if (subStageStatus) {
            let statusText = '等待中';
            let statusClass = 'waiting';

            if (progress > 0 && progress < 100) {
                statusText = '分析中...';
                statusClass = 'analyzing';
                // 添加进度百分比
                statusText += ` ${Math.round(progress)}%`;
            } else if (progress === 100) {
                statusText = '已完成';
                statusClass = 'completed';
            }

            // 移除所有状态类
            subStageElement.classList.remove('waiting', 'analyzing', 'completed');
            // 添加当前状态类
            subStageElement.classList.add(statusClass);
            
            // 更新状态文本
            subStageStatus.textContent = statusText;
            
            // 添加状态图标
            const statusIcon = document.createElement('span');
            statusIcon.className = 'status-icon';
            switch (statusClass) {
                case 'waiting':
                    statusIcon.textContent = '⏳';
                    break;
                case 'analyzing':
                    statusIcon.textContent = '🔄';
                    break;
                case 'completed':
                    statusIcon.textContent = '✅';
                    break;
            }
            
            // 更新或添加状态图标
            const existingIcon = subStageStatus.querySelector('.status-icon');
            if (existingIcon) {
                existingIcon.replaceWith(statusIcon);
            } else {
                subStageStatus.prepend(statusIcon);
            }
        }
        
        // 更新进度条
        if (subStageProgress) {
            subStageProgress.style.width = `${progress}%`;
            
            // 添加进度条动画效果
            if (progress > 0 && progress < 100) {
                subStageProgress.classList.add('analyzing');
            } else {
                subStageProgress.classList.remove('analyzing');
            }
        }

        // 更新主阶段状态
        const mainStageStatus = stageElement.querySelector('.stage-status');
        const mainProgressBar = stageElement.querySelector('.stage-progress .progress-fill');
        
        // 计算主阶段总进度
        const subStages = stageElement.querySelectorAll('.sub-stage');
        const totalSubStages = subStages.length;
        const completedSubStages = Array.from(subStages).filter(el => 
            el.classList.contains('completed')
        ).length;
        const analyzingSubStages = Array.from(subStages).filter(el => 
            el.classList.contains('analyzing')
        ).length;
        
        // 更新主阶段状态
        if (mainStageStatus) {
            let mainStatusText = '等待中';
            let mainStatusClass = 'waiting';
            let mainStatusIcon = '⏳';

            if (completedSubStages === totalSubStages) {
                mainStatusText = '已完成';
                mainStatusClass = 'completed';
                mainStatusIcon = '✅';
            } else if (analyzingSubStages > 0 || completedSubStages > 0) {
                mainStatusText = '分析中...';
                mainStatusClass = 'analyzing';
                mainStatusIcon = '🔄';
                // 添加总体进度
                const totalProgress = Math.round(
                    ((completedSubStages + (analyzingSubStages * 0.5)) / totalSubStages) * 100
                );
                mainStatusText += ` ${totalProgress}%`;
            }

            // 更新主阶段状态样式
            stageElement.classList.remove('waiting', 'analyzing', 'completed');
            stageElement.classList.add(mainStatusClass);
            
            // 更新主阶段状态文本和图标
            mainStageStatus.innerHTML = `
                <span class="status-icon">${mainStatusIcon}</span>
                <span class="status-text">${mainStatusText}</span>
            `;
        }
        
        // 更新主阶段进度条
        if (mainProgressBar) {
            const mainProgress = (completedSubStages / totalSubStages) * 100;
            mainProgressBar.style.width = `${mainProgress}%`;
            
            // 添加进度条动画效果
            if (mainProgress > 0 && mainProgress < 100) {
                mainProgressBar.classList.add('analyzing');
            } else {
                mainProgressBar.classList.remove('analyzing');
            }
        }
    }

    // 显示错误信息
    showError(container, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span class="error-text">${message}</span>
            </div>
        `;
        container.appendChild(errorElement);
    }

    // 修改 analyzeCivilization 方法
    async analyzeCivilization(civilization, eventText, civilizationContainer) {
        try {
            // 获取分析阶段容器
            const stagesContainer = civilizationContainer.querySelector('.analysis-stages');
            
            // 创建分析进度显示
            const progressContainer = document.createElement('div');
            progressContainer.className = 'analysis-progress';
            progressContainer.innerHTML = `
                <div class="progress-header">
                    <div class="progress-title">
                        <span class="title-icon">📊</span>
                        <h3>分析进度</h3>
                    </div>
                    <div class="progress-stats">
                        <span class="time-elapsed">0:00</span>
                    </div>
                </div>
                <div class="stages-container">
                    ${this.stages.map(stage => `
                        <div class="stage-item" data-stage="${stage.id}">
                            <div class="stage-header">
                                <span class="stage-icon">${stage.icon}</span>
                                <div class="stage-info">
                                    <div class="stage-name">${stage.name}</div>
                                    <div class="stage-status">
                                        <span class="status-icon">⏳</span>
                                        <span class="status-text">等待中</span>
                                    </div>
                                </div>
                                <div class="stage-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="sub-stages">
                                ${stage.subStages.map(subStage => `
                                    <div class="sub-stage" data-substage="${subStage.id}">
                                        <span class="substage-icon">${subStage.icon}</span>
                                        <div class="substage-info">
                                            <span class="substage-name">${subStage.name}</span>
                                            <span class="substage-status">
                                                <span class="status-icon">⏳</span>
                                                <span class="status-text">等待中</span>
                                            </span>
                                        </div>
                                        <div class="substage-progress">
                                            <div class="progress-bar">
                                                <div class="progress-fill"></div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            stagesContainer.appendChild(progressContainer);

            // 开始计时
            const startTime = Date.now();
            const updateTime = () => {
                const elapsed = Math.floor((Date.now() - startTime) / 1000);
                const timeElement = progressContainer.querySelector('.time-elapsed');
                if (timeElement) {
                    timeElement.textContent = this.formatTime(elapsed);
                }
            };
            const timeInterval = setInterval(updateTime, 1000);

            try {
                // 第一阶段：历史经验参照
                const historicalStage = this.stages.find(s => s.id === 'historical');
                let historicalResults = {}; // 用于存储历史分析结果

                for (const subStage of historicalStage.subStages) {
                    // 更新为"分析中"状态
                    await this.updateStageStatus(civilizationContainer, 'historical', subStage.id, 'analyzing', 50);
                    
                    // 只在第一个子阶段进行API调用
                    if (subStage.id === 'cases') {
                        const result = await this.aiService.analyzeHistoricalReference(civilization, eventText);
                        historicalResults = this.cleanAndParseJSON(result);
                    }
                    
                    // 更新为"已完成"状态
                    await this.updateStageStatus(civilizationContainer, 'historical', subStage.id, 'completed', 100);
                    
                    // 根据子阶段显示不同部分的结果
                    const resultElement = document.createElement('div');
                    resultElement.className = 'stage-result';
                    resultElement.innerHTML = this.renderStageResult('historical', {
                        subStage: subStage.id,
                        result: historicalResults
                    });
                    
                    // 检查是否已存在相同的结果显示
                    const existingResult = stagesContainer.querySelector(
                        `.stage-result[data-stage="historical"][data-substage="${subStage.id}"]`
                    );
                    if (existingResult) {
                        existingResult.remove();
                    }
                    
                    // 添加数据属性以便识别
                    resultElement.dataset.stage = 'historical';
                    resultElement.dataset.substage = subStage.id;
                    stagesContainer.appendChild(resultElement);
                }

                // 第二阶段：文明特征分析
                const civilizationStage = this.stages.find(s => s.id === 'civilization');
                for (const subStage of civilizationStage.subStages) {
                    await this.updateStageStatus(civilizationContainer, 'civilization', subStage.id, 'analyzing', 50);
                    const result = await this.aiService.analyzeCivilizationTraits(civilization, eventText);
                    await this.updateStageStatus(civilizationContainer, 'civilization', subStage.id, 'completed', 100);
                    
                    const resultElement = document.createElement('div');
                    resultElement.className = 'stage-result';
                    resultElement.innerHTML = this.renderStageResult('civilization', {
                        subStage: subStage.id,
                        result: this.cleanAndParseJSON(result)
                    });
                    stagesContainer.appendChild(resultElement);
                }

                // 第三阶段：内部影响评估
                const internalStage = this.stages.find(s => s.id === 'internal');
                internalStage.subStages.forEach(subStage => {
                    this.updateStageStatus(civilizationContainer, 'internal', subStage.id, 'waiting', 0);
                });

                for (const subStage of internalStage.subStages) {
                    this.updateStageStatus(civilizationContainer, 'internal', subStage.id, 'analyzing', 50);
                    const result = await this.aiService.analyzeInternalImpact(civilization, eventText);
                    this.updateStageStatus(civilizationContainer, 'internal', subStage.id, 'completed', 100);
                    
                    const resultElement = document.createElement('div');
                    resultElement.className = 'stage-result';
                    resultElement.innerHTML = this.renderStageResult('internal', {
                        subStage: subStage.id,
                        result: this.cleanAndParseJSON(result)
                    });
                    stagesContainer.appendChild(resultElement);
                }

                // 第四阶段：外部关系评估
                const externalStage = this.stages.find(s => s.id === 'external');
                externalStage.subStages.forEach(subStage => {
                    this.updateStageStatus(civilizationContainer, 'external', subStage.id, 'waiting', 0);
                });

                for (const subStage of externalStage.subStages) {
                    this.updateStageStatus(civilizationContainer, 'external', subStage.id, 'analyzing', 50);
                    const result = await this.aiService.analyzeExternalRelations(civilization, eventText);
                    this.updateStageStatus(civilizationContainer, 'external', subStage.id, 'completed', 100);
                    
                    const resultElement = document.createElement('div');
                    resultElement.className = 'stage-result';
                    resultElement.innerHTML = this.renderStageResult('external', {
                        subStage: subStage.id,
                        result: this.cleanAndParseJSON(result)
                    });
                    stagesContainer.appendChild(resultElement);
                }

                // 第五阶段：战略决策制定
                const strategicStage = this.stages.find(s => s.id === 'strategic');
                strategicStage.subStages.forEach(subStage => {
                    this.updateStageStatus(civilizationContainer, 'strategic', subStage.id, 'waiting', 0);
                });

                for (const subStage of strategicStage.subStages) {
                    this.updateStageStatus(civilizationContainer, 'strategic', subStage.id, 'analyzing', 50);
                    const result = await this.aiService.makeStrategicDecision(civilization, eventText);
                    this.updateStageStatus(civilizationContainer, 'strategic', subStage.id, 'completed', 100);
                    
                    const resultElement = document.createElement('div');
                    resultElement.className = 'stage-result';
                    resultElement.innerHTML = this.renderStageResult('strategic', {
                        subStage: subStage.id,
                        result: this.cleanAndParseJSON(result)
                    });
                    stagesContainer.appendChild(resultElement);
                }

                // 第六阶段：执行路径规划
                const implementationStage = this.stages.find(s => s.id === 'implementation');
                implementationStage.subStages.forEach(subStage => {
                    this.updateStageStatus(civilizationContainer, 'implementation', subStage.id, 'waiting', 0);
                });

                for (const subStage of implementationStage.subStages) {
                    this.updateStageStatus(civilizationContainer, 'implementation', subStage.id, 'analyzing', 50);
                    const result = await this.aiService.planImplementation(civilization, eventText);
                    this.updateStageStatus(civilizationContainer, 'implementation', subStage.id, 'completed', 100);
                    
                    const resultElement = document.createElement('div');
                    resultElement.className = 'stage-result';
                    resultElement.innerHTML = this.renderStageResult('implementation', {
                        subStage: subStage.id,
                        result: this.cleanAndParseJSON(result)
                    });
                    stagesContainer.appendChild(resultElement);
                }

            } finally {
                // 清理计时器
                clearInterval(timeInterval);
            }

        } catch (error) {
            console.error(`Error in analyzeCivilization for ${civilization.name}:`, error);
            throw error;
        }
    }

    // 添加辅助方法
    cleanAndParseJSON(text) {
        try {
            // 如果已经是对象，直接返回
            if (typeof text === 'object') return text;
            
            // 清理文本，只保留JSON部分
            let jsonStr = text;
            if (text.includes('```json')) {
                jsonStr = text.split('```json')[1].split('```')[0];
            }
            jsonStr = jsonStr.trim();
            
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return { error: 'JSON解析错误' };
        }
    }

    // 修改 renderStageResult 方法
    renderStageResult(stage, data) {
        const { subStage, result } = data;
        
        return `
            <div class="analysis-result-container">
                <div class="analysis-stage">
                    <div class="stage-header">
                        <div class="stage-icon">${this.getStageIcon(stage)}</div>
                        <h3 class="stage-title">${this.formatStageName(stage)}</h3>
                        <div class="stage-status">
                            <span class="status-icon">✅</span>
                            <span>分析完成</span>
                        </div>
                    </div>
                    <div class="analysis-content">
                        ${this.renderStageContent(stage, subStage, result)}
                    </div>
                </div>
            </div>
        `;
    }

    // 添加渲染内容的方法
    renderStageContent(stage, subStage, result) {
        switch (stage) {
            case 'historical':
                return this.renderHistoricalContent(subStage, result);
            case 'civilization':
                return this.renderCivilizationContent(subStage, result);
            case 'internal':
                return this.renderInternalContent(subStage, result);
            case 'external':
                return this.renderExternalContent(subStage, result);
            case 'strategic':
                return this.renderStrategicContent(subStage, result);
            case 'implementation':
                return this.renderImplementationContent(subStage, result);
            default:
                return '<div class="error-message">未知的分析阶段</div>';
        }
    }

    // 添加各个阶段的具体渲染方法
    renderHistoricalContent(subStage, result) {
        if (!result || typeof result !== 'object') {
            console.error('Invalid result object:', result);
            return '<div class="error-message">数据解析错误</div>';
        }

        switch (subStage) {
            case 'cases':
                if (!result.cases || !Array.isArray(result.cases)) {
                    return '<div class="error-message">案例数据无效</div>';
                }
                return `
                    <div class="cases-analysis">
                        <div class="section-header">
                            <span class="section-icon">📚</span>
                            <h4 class="section-title">历史案例分析</h4>
                        </div>
                        <div class="metric-container">
                            <div class="metric-item">
                                <div class="metric-value">${result.cases.length}</div>
                                <div class="metric-label">相关案例</div>
                            </div>
                            <div class="metric-item">
                                <div class="metric-value">${Math.round(result.applicabilityScore * 100)}%</div>
                                <div class="metric-label">适用性</div>
                            </div>
                        </div>
                        <div class="analysis-list">
                            ${result.cases.map(caseItem => `
                                <div class="list-item">
                                    <span class="item-icon">📖</span>
                                    <div class="item-content">
                                        <div class="item-header">
                                            <span class="tag">
                                                <span class="tag-icon">📅</span>
                                                ${caseItem.year}
                                            </span>
                                            <strong>${caseItem.title}</strong>
                                        </div>
                                        <p class="case-description">${caseItem.description}</p>
                                        <div class="case-outcome">
                                            <div class="outcome-header">
                                                <span class="outcome-icon">🎯</span>
                                                <strong>历史结果：</strong>
                                            </div>
                                            <p>${caseItem.outcome}</p>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            case 'lessons':
                if (!result.lessons || !Array.isArray(result.lessons)) {
                    return '<div class="error-message">经验教训数据无效</div>';
                }
                return `
                    <div class="lessons-analysis">
                        <div class="section-header">
                            <span class="section-icon">💡</span>
                            <h4 class="section-title">历史经验教训</h4>
                        </div>
                        <div class="lessons-list">
                            ${result.lessons.map((lesson, index) => `
                                <div class="lesson-item">
                                    <div class="lesson-number">${index + 1}</div>
                                    <div class="lesson-content">
                                        <p class="lesson-text">${lesson}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            case 'applicability':
                if (typeof result.applicabilityScore !== 'number' || !result.summary) {
                    return '<div class="error-message">适用性数据无效</div>';
                }
                return `
                    <div class="applicability-analysis">
                        <div class="section-header">
                            <span class="section-icon">🎯</span>
                            <h4 class="section-title">历史经验适用性</h4>
                        </div>
                        <div class="applicability-score">
                            <div class="score-label">总体适用性评估</div>
                            <div class="score-meter">
                                <div class="meter-container">
                                    <div class="meter-bar">
                                        <div class="meter-fill ${this.getApplicabilityClass(result.applicabilityScore)}"
                                             style="width: ${result.applicabilityScore * 100}%">
                                        </div>
                                    </div>
                                    <div class="score-value">${Math.round(result.applicabilityScore * 100)}%</div>
                                </div>
                            </div>
                        </div>
                        <div class="applicability-summary">
                            <div class="summary-header">
                                <span class="summary-icon">📊</span>
                                <h5>评估总结</h5>
                            </div>
                            <p class="summary-text">${result.summary}</p>
                        </div>
                    </div>
                `;

            default:
                return '<div class="error-message">未知的分析子阶段</div>';
        }
    }

    // 添加 renderCivilizationContent 方法
    renderCivilizationContent(subStage, result) {
        switch (subStage) {
            case 'values':
                return `
                    <div class="values-analysis">
                        <div class="alignment-section">
                            <h4>价值观契合度分析</h4>
                            <div class="alignment-meter">
                                <div class="meter-container">
                                    <div class="meter-bar">
                                        <div class="meter-fill ${this.getAlignmentClass(result.valueAlignment.score)}"
                                             style="width: ${result.valueAlignment.score * 100}%">
                                        </div>
                                    </div>
                                    <span class="meter-value">${Math.round(result.valueAlignment.score * 100)}%</span>
                                </div>
                            </div>
                            <p class="alignment-description">${result.valueAlignment.description}</p>
                            <div class="key-points">
                                ${result.valueAlignment.keyPoints.map(point => `
                                    <div class="point-item">
                                        <span class="point-marker">•</span>
                                        <span class="point-text">${point}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;

            case 'challenges':
                return `
                    <div class="challenges-analysis">
                        <div class="system-impacts">
                            <h4>系统影响评估</h4>
                            ${Object.entries(result.systemImpacts).map(([key, impact]) => `
                                <div class="impact-item">
                                    <div class="impact-header">
                                        <span class="impact-icon">${this.getSystemIcon(key)}</span>
                                        <span class="impact-name">${this.formatSystemKey(key)}</span>
                                    </div>
                                    <div class="impact-meter">
                                        <div class="meter-container">
                                            <div class="meter-bar">
                                                <div class="meter-fill ${this.getImpactClass(impact.level)}"
                                                     style="width: ${impact.level * 100}%">
                                                </div>
                                            </div>
                                            <span class="meter-value">${Math.round(impact.level * 100)}%</span>
                                        </div>
                                    </div>
                                    <p class="impact-description">${impact.description}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            case 'adaptability':
                return `
                    <div class="adaptability-analysis">
                        <div class="adaptability-overview">
                            <h4>适应能力评估</h4>
                            <p class="adaptability-description">${result.adaptability.description}</p>
                            <div class="factors-grid">
                                ${result.adaptability.factors.map(factor => `
                                    <div class="factor-card">
                                        <div class="factor-header">
                                            <span class="factor-type">${factor.type}</span>
                                            <div class="factor-strength">
                                                <div class="strength-meter">
                                                    <div class="meter-fill" style="width: ${factor.strength * 100}%"></div>
                                                </div>
                                                <span class="strength-value">${Math.round(factor.strength * 100)}%</span>
                                            </div>
                                        </div>
                                        <div class="factor-name">${factor.name}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;

            default:
                return '<div class="error-message">未知的分析子阶段</div>';
        }
    }

    // 添加辅助方法
    getAlignmentClass(score) {
        if (score >= 0.8) return 'high-alignment';
        if (score >= 0.6) return 'medium-alignment';
        return 'low-alignment';
    }

    getImpactClass(level) {
        if (level >= 0.8) return 'critical-impact';
        if (level >= 0.6) return 'significant-impact';
        if (level >= 0.4) return 'moderate-impact';
        return 'minor-impact';
    }

    getSystemIcon(key) {
        const icons = {
            political: '⚖️',
            economic: '💰',
            social: '👥',
            cultural: '🎭',
            technological: '🔬'
        };
        return icons[key] || '📊';
    }

    formatSystemKey(key) {
        const keyMap = {
            political: '政治体系',
            economic: '经济体系',
            social: '社会体系',
            cultural: '文化体系',
            technological: '科技体系'
        };
        return keyMap[key] || key;
    }

    // 修改 updateStageStatus 方法
    async updateStageStatus(container, stageId, subStageId, status, progress) {
        const stageElement = container.querySelector(`[data-stage="${stageId}"]`);
        if (!stageElement) return;

        const subStageElement = stageElement.querySelector(`[data-substage="${subStageId}"]`);
        if (!subStageElement) return;

        const statusElement = subStageElement.querySelector('.substage-status');
        const progressBar = subStageElement.querySelector('.progress-fill');

        // 更新状态文本和图标
        if (statusElement) {
            let statusText = '';
            let statusIcon = '';
            let statusClass = '';
            
            switch (status) {
                case 'waiting':
                    statusText = '等待中';
                    statusIcon = '⏳';
                    statusClass = 'waiting';
                    break;
                case 'analyzing':
                    statusText = '分析中...';
                    statusIcon = '🔄';
                    statusClass = 'analyzing';
                    break;
                case 'completed':
                    statusText = '已完成';
                    statusIcon = '✅';
                    statusClass = 'completed';
                    break;
            }

            statusElement.innerHTML = `
                <span class="status-icon ${statusClass}">${statusIcon}</span>
                <span class="status-text">${statusText}</span>
                ${progress > 0 && progress < 100 ? `<span class="progress-percentage">${Math.round(progress)}%</span>` : ''}
            `;

            // 更新子阶段样式
            subStageElement.classList.remove('waiting', 'analyzing', 'completed');
            subStageElement.classList.add(statusClass);
        }

        // 更新进度条
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
            
            if (status === 'analyzing') {
                progressBar.classList.add('analyzing');
            } else {
                progressBar.classList.remove('analyzing');
            }
        }

        // 更新主阶段状态
        await this.updateMainStageStatus(container, stageId);
    }

    // 修改 updateMainStageStatus 方法
    async updateMainStageStatus(container, stageId) {
        const stageElement = container.querySelector(`[data-stage="${stageId}"]`);
        if (!stageElement) return;

        const subStages = stageElement.querySelectorAll('.sub-stage');
        const totalSubStages = subStages.length;
        const completedSubStages = Array.from(subStages).filter(el => el.classList.contains('completed')).length;
        const analyzingSubStages = Array.from(subStages).filter(el => el.classList.contains('analyzing')).length;

        const mainStatusElement = stageElement.querySelector('.stage-status');
        const mainProgressBar = stageElement.querySelector('.stage-progress .progress-fill');

        if (mainStatusElement) {
            let statusText = '';
            let statusIcon = '';
            let statusClass = '';

            if (completedSubStages === totalSubStages) {
                statusText = '已完成';
                statusIcon = '✅';
                statusClass = 'completed';
            } else if (analyzingSubStages > 0 || completedSubStages > 0) {
                statusText = '分析中...';
                statusIcon = '🔄';
                statusClass = 'analyzing';
                const progress = Math.round(((completedSubStages + (analyzingSubStages * 0.5)) / totalSubStages) * 100);
                statusText += ` ${progress}%`;
            } else {
                statusText = '等待中';
                statusIcon = '⏳';
                statusClass = 'waiting';
            }

            mainStatusElement.innerHTML = `
                <span class="status-icon ${statusClass}">${statusIcon}</span>
                <span class="status-text">${statusText}</span>
            `;

            // 更新主阶段样式
            stageElement.classList.remove('waiting', 'analyzing', 'completed');
            stageElement.classList.add(statusClass);
        }

        // 新主阶段进度条
        if (mainProgressBar) {
            const progress = (completedSubStages / totalSubStages) * 100;
            mainProgressBar.style.width = `${progress}%`;
            
            if (progress > 0 && progress < 100) {
                mainProgressBar.classList.add('analyzing');
            } else {
                mainProgressBar.classList.remove('analyzing');
            }
        }
    }

    // 添加 getStageIcon 方法
    getStageIcon(stage) {
        const icons = {
            historical: {
                icon: '📚',
                cases: '📖',
                lessons: '📝',
                applicability: '🎯'
            },
            civilization: {
                icon: '🏛️',
                values: '⚖️',
                challenges: '🔍',
                adaptability: '🔄'
            },
            internal: {
                icon: '🏠',
                stability: '🏛️',
                economy: '💰',
                society: '👥'
            },
            external: {
                icon: '🌐',
                diplomatic: '🤝',
                regional: '🗺️',
                alliance: '🤲'
            },
            strategic: {
                icon: '⚡',
                objectives: '🎯',
                resources: '📊',
                risks: '⚠️'
            },
            implementation: {
                icon: '📋',
                shortTerm: '⚡',
                midTerm: '📅',
                longTerm: '🎯'
            }
        };

        // 如果是主阶段
        if (icons[stage]) {
            return icons[stage].icon;
        }

        // 如果是子阶段，遍历所有阶段查找
        for (const mainStage in icons) {
            if (icons[mainStage][stage]) {
                return icons[mainStage][stage];
            }
        }

        // 默认图标
        return '📝';
    }

    // 添加 formatStageName 方法
    formatStageName(stage) {
        const names = {
            // 主阶段
            historical: '历史经验参照',
            civilization: '文明特征分析',
            internal: '内部影响评估',
            external: '外部关系评估',
            strategic: '战略决策制定',
            implementation: '执行路径规划',

            // 子阶段
            cases: '历史案例分析',
            lessons: '经验教训总结',
            applicability: '适用性评估',
            values: '价值观契合度',
            challenges: '挑战分析',
            adaptability: '适应能力评估',
            stability: '政治稳定性',
            economy: '经济影响',
            society: '社会影响',
            diplomatic: '外交关系',
            regional: '地区影响',
            alliance: '联盟关系',
            objectives: '目标设定',
            resources: '资源调配',
            risks: '风险评估',
            shortTerm: '短期行动',
            midTerm: '中期计划',
            longTerm: '长期战略'
        };

        return names[stage] || stage;
    }

    // 添加 getStageClass 方法
    getStageClass(stage) {
        const mainStages = ['historical', 'civilization', 'internal', 'external', 'strategic', 'implementation'];
        return mainStages.includes(stage) ? 'main-stage' : 'sub-stage';
    }

    // 添加 getApplicabilityClass 方法
    getApplicabilityClass(score) {
        if (score >= 0.8) return 'high';
        if (score >= 0.6) return 'medium';
        return 'low';
    }

    // 添加其他相关的辅助方法
    getApplicabilityColor(score) {
        if (score >= 0.8) return '#4CAF50';  // 高适用性 - 绿色
        if (score >= 0.6) return '#FFC107';  // 中等适用性 - 黄色
        return '#FF5722';  // 低适用性 - 红色
    }

    getApplicabilityText(score) {
        if (score >= 0.8) return '高度适用';
        if (score >= 0.6) return '较为适用';
        return '适用性低';
    }

    // 添加进度条相关的辅助方法
    getProgressClass(progress) {
        if (progress >= 80) return 'high';
        if (progress >= 40) return 'medium';
        return 'low';
    }

    getProgressColor(progress) {
        if (progress >= 80) return '#4CAF50';
        if (progress >= 40) return '#FFC107';
        return '#FF5722';
    }

    // 添加状态相关的辅助方法
    getStatusClass(status) {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'status-completed';
            case 'in_progress':
                return 'status-in-progress';
            case 'pending':
                return 'status-pending';
            case 'error':
                return 'status-error';
            default:
                return '';
        }
    }

    getStatusIcon(status) {
        switch (status.toLowerCase()) {
            case 'completed':
                return '✅';
            case 'in_progress':
                return '🔄';
            case 'pending':
                return '⏳';
            case 'error':
                return '❌';
            default:
                return '❓';
        }
    }

    getStatusText(status) {
        switch (status.toLowerCase()) {
            case 'completed':
                return '已完成';
            case 'in_progress':
                return '进行中';
            case 'pending':
                return '等待中';
            case 'error':
                return '出错了';
            default:
                return '未知状态';
        }
    }

    // 添加动画相关的辅助方法
    getAnimationClass(type) {
        switch (type) {
            case 'enter':
                return 'fade-in';
            case 'exit':
                return 'fade-out';
            case 'update':
                return 'pulse';
            default:
                return '';
        }
    }

    // 添加格式化相关的辅助方法
    formatPercentage(value) {
        return `${Math.round(value * 100)}%`;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    formatDate(date) {
        return new Date(date).toLocaleString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // 添加 renderInternalContent 方法
    renderInternalContent(subStage, result) {
        switch (subStage) {
            case 'stability':
                return `
                    <div class="stability-analysis">
                        <div class="stability-overview">
                            <h4>政治稳定性分析</h4>
                            <div class="stability-metrics">
                                <div class="metric-row">
                                    <div class="metric-label">政治稳定性</div>
                                    <div class="meter-container">
                                        <div class="meter-bar">
                                            <div class="meter-fill ${this.getStabilityClass(result.stability.political.level)}"
                                                 style="width: ${result.stability.political.level * 100}%">
                                            </div>
                                        </div>
                                        <span class="meter-value">${Math.round(result.stability.political.level * 100)}%</span>
                                    </div>
                                    <p class="metric-description">${result.stability.political.description}</p>
                                </div>
                                <div class="metric-row">
                                    <div class="metric-label">社会稳定性</div>
                                    <div class="meter-container">
                                        <div class="meter-bar">
                                            <div class="meter-fill ${this.getStabilityClass(result.stability.social.level)}"
                                                 style="width: ${result.stability.social.level * 100}%">
                                            </div>
                                        </div>
                                        <span class="meter-value">${Math.round(result.stability.social.level * 100)}%</span>
                                    </div>
                                    <p class="metric-description">${result.stability.social.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            case 'economy':
                return `
                    <div class="economic-analysis">
                        <div class="impact-overview">
                            <h4>经济影响评估</h4>
                            <div class="impact-meter">
                                <div class="meter-container">
                                    <div class="meter-bar">
                                        <div class="meter-fill ${this.getImpactClass(result.impacts.economic.level)}"
                                             style="width: ${result.impacts.economic.level * 100}%">
                                        </div>
                                    </div>
                                    <span class="meter-value">${Math.round(result.impacts.economic.level * 100)}%</span>
                                </div>
                            </div>
                            <p class="impact-description">${result.impacts.economic.description}</p>
                        </div>
                    </div>
                `;

            case 'society':
                return `
                    <div class="social-analysis">
                        <div class="public-response">
                            <h4>社会反应分析</h4>
                            <div class="sentiment-meter">
                                <div class="meter-container">
                                    <div class="meter-bar">
                                        <div class="meter-fill ${this.getSentimentClass(result.publicResponse.sentiment)}"
                                             style="width: ${result.publicResponse.sentiment * 100}%">
                                        </div>
                                    </div>
                                    <span class="meter-value">${Math.round(result.publicResponse.sentiment * 100)}%</span>
                                </div>
                            </div>
                            <p class="response-description">${result.publicResponse.description}</p>
                            <div class="response-factors">
                                <h5>关键因素</h5>
                                <ul class="factors-list">
                                    ${result.publicResponse.factors.map(factor => `
                                        <li class="factor-item">
                                            <span class="factor-marker">•</span>
                                            <span class="factor-text">${factor}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;

            default:
                return '<div class="error-message">未知的分析子阶段</div>';
        }
    }

    // 添加 renderExternalContent 方法
    renderExternalContent(subStage, result) {
        switch (subStage) {
            case 'diplomatic':
                return `
                    <div class="diplomatic-analysis">
                        <div class="international-impact">
                            <h4>国际影响评估</h4>
                            <div class="impact-meter">
                                <div class="meter-container">
                                    <div class="meter-bar">
                                        <div class="meter-fill ${this.getImpactClass(result.international.level)}"
                                             style="width: ${result.international.level * 100}%">
                                        </div>
                                    </div>
                                    <span class="meter-value">${Math.round(result.international.level * 100)}%</span>
                                </div>
                            </div>
                            <p class="impact-description">${result.international.description}</p>
                        </div>
                    </div>
                `;

            case 'regional':
                return `
                    <div class="regional-analysis">
                        <div class="regional-impact">
                            <h4>地区影响评估</h4>
                            <div class="impact-meter">
                                <div class="meter-container">
                                    <div class="meter-bar">
                                        <div class="meter-fill ${this.getImpactClass(result.regional.level)}"
                                             style="width: ${result.regional.level * 100}%">
                                        </div>
                                    </div>
                                    <span class="meter-value">${Math.round(result.regional.level * 100)}%</span>
                                </div>
                            </div>
                            <p class="impact-description">${result.regional.description}</p>
                        </div>
                    </div>
                `;

            case 'alliance':
                return `
                    <div class="alliance-analysis">
                        <div class="relations-impact">
                            <h4>关系影响估</h4>
                            <div class="impact-meter">
                                <div class="meter-container">
                                    <div class="meter-bar">
                                        <div class="meter-fill ${this.getImpactClass(result.relations.level)}"
                                             style="width: ${result.relations.level * 100}%">
                                        </div>
                                    </div>
                                    <span class="meter-value">${Math.round(result.relations.level * 100)}%</span>
                                </div>
                            </div>
                            <p class="impact-description">${result.relations.description}</p>
                        </div>
                    </div>
                `;

            default:
                return '<div class="error-message">未知的分析子阶段</div>';
        }
    }

    // 修改 renderStrategicContent 方法
    renderStrategicContent(subStage, result) {
        // 添加数据验证
        if (!result || typeof result !== 'object') {
            console.error('Invalid result object:', result);
            return '<div class="error-message">数据解析错误</div>';
        }

        switch (subStage) {
            case 'objectives':
                if (!result.stance || !result.objectives) {
                    return '<div class="error-message">目标数据无效</div>';
                }
                return `
                    <div class="objectives-analysis">
                        <div class="stance-section">
                            <h4>立场与态度</h4>
                            <div class="stance-content">
                                <p class="stance-position">${result.stance.position || '暂无立场'}</p>
                                <p class="stance-attitude">${result.stance.attitude || '暂无态度'}</p>
                                <div class="stance-reasoning">
                                    <h5>决策依据</h5>
                                    <ul>
                                        ${Array.isArray(result.stance.reasoning) ? 
                                            result.stance.reasoning.map(reason => `
                                                <li>${reason}</li>
                                            `).join('') : 
                                            '<li>暂无决策依据</li>'
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="objectives-section">
                            <h4>战略目标</h4>
                            <div class="objectives-timeline">
                                ${Object.entries({
                                    '短期目标': result.objectives.shortTerm || [],
                                    '中期目标': result.objectives.mediumTerm || [],
                                    '长期目标': result.objectives.longTerm || []
                                }).map(([title, goals]) => `
                                    <div class="timeline-section">
                                        <h5>${title}</h5>
                                        <ul>
                                            ${Array.isArray(goals) && goals.length > 0 ? 
                                                goals.map(goal => `<li>${goal}</li>`).join('') :
                                                '<li>暂无目标</li>'
                                            }
                                        </ul>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;

            case 'resources':
                if (!result.actions) {
                    return '<div class="error-message">资源数据无效</div>';
                }
                return `
                    <div class="resources-analysis">
                        <div class="actions-section">
                            <h4>行动计划</h4>
                            <div class="actions-grid">
                                ${Object.entries({
                                    '立即行动': result.actions.immediate || [],
                                    '计划行动': result.actions.planned || [],
                                    '条件行动': result.actions.conditional || []
                                }).map(([title, actions]) => `
                                    <div class="action-category">
                                        <h5>${title}</h5>
                                        <ul>
                                            ${Array.isArray(actions) && actions.length > 0 ?
                                                actions.map(action => `<li>${action}</li>`).join('') :
                                                '<li>暂无行动</li>'
                                            }
                                        </ul>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;

            case 'risks':
                // 确保 risks 是一个数组，如果不是则提供默认值
                const risks = Array.isArray(result.risks) ? result.risks : [];
                return `
                    <div class="risks-analysis">
                        <div class="risk-assessment">
                            <h4>风险评估</h4>
                            ${risks.length > 0 ? `
                                <div class="risks-grid">
                                    ${risks.map(risk => `
                                        <div class="risk-item">
                                            <div class="risk-header">
                                                <span class="risk-level ${this.getRiskClass(risk.level || 'low')}">${risk.level || '低'}</span>
                                                <h5>${risk.name || '未命名风险'}</h5>
                                            </div>
                                            <p class="risk-description">${risk.description || '无描述'}</p>
                                            <div class="mitigation-measures">
                                                <h6>缓解措施</h6>
                                                <ul>
                                                    ${Array.isArray(risk.mitigation) && risk.mitigation.length > 0 ?
                                                        risk.mitigation.map(measure => `<li>${measure}</li>`).join('') :
                                                        '<li>暂无缓解措施</li>'
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : '<div class="no-risks-message">暂无风险评估数据</div>'}
                        </div>
                    </div>
                `;

            default:
                return '<div class="error-message">未知的分析子阶段</div>';
        }
    }

    // 添加 renderImplementationContent 方法
    renderImplementationContent(subStage, result) {
        switch (subStage) {
            case 'shortTerm':
                return `
                    <div class="short-term-analysis">
                        <h4>短期行动计划</h4>
                        <div class="action-list">
                            ${result.shortTerm.map((action, index) => `
                                <div class="action-item">
                                    <span class="action-number">${index + 1}</span>
                                    <span class="action-text">${action}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            case 'midTerm':
                return `
                    <div class="mid-term-analysis">
                        <h4>中期推进方案</h4>
                        <div class="action-list">
                            ${result.mediumTerm.map((action, index) => `
                                <div class="action-item">
                                    <span class="action-number">${index + 1}</span>
                                    <span class="action-text">${action}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            case 'longTerm':
                return `
                    <div class="long-term-analysis">
                        <h4>长期发展规划</h4>
                        <div class="action-list">
                            ${result.longTerm.map((action, index) => `
                                <div class="action-item">
                                    <span class="action-number">${index + 1}</span>
                                    <span class="action-text">${action}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;

            default:
                return '<div class="error-message">未知的分析子阶段</div>';
        }
    }

    // 添加辅助方法
    getStabilityClass(level) {
        if (level >= 0.8) return 'high-stability';
        if (level >= 0.6) return 'medium-stability';
        return 'low-stability';
    }

    getSentimentClass(sentiment) {
        if (sentiment >= 0.8) return 'very-positive';
        if (sentiment >= 0.6) return 'positive';
        if (sentiment >= 0.4) return 'neutral';
        if (sentiment >= 0.2) return 'negative';
        return 'very-negative';
    }

    getRiskClass(level) {
        switch (level.toLowerCase()) {
            case 'high': return 'high-risk';
            case 'medium': return 'medium-risk';
            case 'low': return 'low-risk';
            default: return '';
        }
    }

    // 修改渲染文明卡片的方法
    renderCivilizationCard(civilization) {
        return `
            <div class="civilization-card">
                <div class="civ-header">
                    <div class="civ-badge" style="background: ${civilization.color}">
                        <span class="civ-icon">🏛️</span>
                    </div>
                    <div class="civ-info">
                        <div class="civ-name">${civilization.name}</div>
                        <div class="civ-type">${civilization.traits.governmentType}</div>
                    </div>
                </div>
                <div class="civ-traits">
                    <span class="trait-tag">
                        <span class="tag-icon">⚖️</span>
                        ${civilization.traits.economicSystem}
                    </span>
                    ${civilization.traits.culturalValues.map(value => `
                        <span class="trait-tag">
                            <span class="tag-icon">🎭</span>
                            ${value}
                        </span>
                    `).join('')}
                </div>
                <div class="card-actions">
                    <button class="details-btn" onclick="game.showCivilizationDetails('${civilization.id}')">
                        <span class="btn-icon">📋</span>
                        查看详情
                    </button>
                    <button class="chat-btn" onclick="game.startCivilizationChat('${civilization.id}')">
                        <span class="btn-icon">🤖</span>
                        文明智能体对话
                    </button>
                </div>
            </div>
        `;
    }
}

// 确保类被正确导出
window.EventHandler = EventHandler; 