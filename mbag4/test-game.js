class TestGame {
    constructor() {
        // 初始化AI服务
        this.aiService = new AIService();
        
        // 初始化文明
        this.civilizations = [];
        this.initializeCivilizations();
        
        // 事件历史
        this.worldEvents = [];
        
        // 初始化事件处理器
        this.eventHandler = new EventHandler(this);

        // 初始化UI
        this.initializeUI();
    }

    initializeUI() {
        // 创建文明按钮
        const buttonsContainer = document.getElementById('civilizationButtons');
        if (!buttonsContainer) {
            console.error('找不到文明按钮容器');
            return;
        }

        // 清空现有按钮
        buttonsContainer.innerHTML = '';

        // 为每个文明创建按钮组
        this.civilizations.forEach(civ => {
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'civ-button-group';
            
            // 主按钮 - 显示文明详情
            const mainButton = document.createElement('button');
            mainButton.className = 'civ-button main-button';
            mainButton.style.backgroundColor = civ.color;
            mainButton.innerHTML = `
                <span class="civ-icon">🏛️</span>
                <span>${civ.name}</span>
            `;
            mainButton.addEventListener('click', () => this.showCivilizationDetails(civ));

            // AI提示词按钮
            const promptButton = document.createElement('button');
            promptButton.className = 'civ-button prompt-button';
            promptButton.style.backgroundColor = this.adjustColor(civ.color, -20);
            promptButton.innerHTML = `
                <span class="civ-icon">🤖</span>
                <span>AI提示词</span>
            `;
            promptButton.addEventListener('click', () => this.showCivilizationPrompt(civ));

            buttonGroup.appendChild(mainButton);
            buttonGroup.appendChild(promptButton);
            buttonsContainer.appendChild(buttonGroup);
        });

        // 添加按钮组样式
        const style = document.createElement('style');
        style.textContent = `
            .civ-button-group {
                display: flex;
                gap: 5px;
                margin-bottom: 10px;
            }

            .civ-button {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                border: none;
                border-radius: 4px;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .main-button {
                flex: 2;
            }

            .prompt-button {
                flex: 1;
            }

            .civ-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            }

            .civ-icon {
                font-size: 1.2em;
            }

            @media (max-width: 768px) {
                .civ-button-group {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }

    showCivilizationPrompt(civ) {
        const modal = document.getElementById('civilizationModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        if (!modal || !modalTitle || !modalContent) {
            console.error('Modal elements not found');
            return;
        }

        // 获取AI提示词
        const aiPrompt = window.CivilizationPrompts[civ.name];
        if (!aiPrompt) {
            console.error(`No prompt found for ${civ.name}`);
            return;
        }

        modalTitle.innerHTML = `
            <div class="modal-title-content">
                <span class="civ-icon" style="color: ${civ.color}">🤖</span>
                <span class="civ-name">${civ.name} AI Agent 提示词</span>
            </div>
        `;

        modalContent.innerHTML = `
            <div class="prompt-section">
                <div class="prompt-content">
                    <h4>身份与特征</h4>
                    <pre class="prompt-text identity-text">${aiPrompt.identity}</pre>
                </div>
                <div class="prompt-content">
                    <h4>响应格式</h4>
                    <pre class="prompt-text format-text">${aiPrompt.responseFormat}</pre>
                </div>
            </div>
        `;

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .prompt-section {
                padding: 20px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
            }

            .prompt-content {
                margin-bottom: 20px;
            }

            .prompt-content h4 {
                color: ${civ.color};
                margin-bottom: 10px;
                padding-bottom: 5px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .prompt-text {
                white-space: pre-wrap;
                font-family: monospace;
                background: rgba(0, 0, 0, 0.2);
                padding: 15px;
                border-radius: 6px;
                font-size: 14px;
                line-height: 1.5;
                overflow-x: auto;
            }

            .identity-text {
                border-left: 3px solid ${civ.color};
            }

            .format-text {
                border-left: 3px solid #4CAF50;
            }
        `;
        document.head.appendChild(style);

        // 显示模态框
        modal.style.display = 'block';
    }

    // 辅助方法：调整颜色亮度
    adjustColor(color, amount) {
        const hex = color.replace('#', '');
        const num = parseInt(hex, 16);
        const r = Math.min(255, Math.max(0, (num >> 16) + amount));
        const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
        const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }

    initializeCivilizations() {
        const civConfigs = [
            {
                name: "华夏文明",
                color: "#FF5722",
                traits: {
                    governmentType: "中央集权制",
                    economicSystem: "混合经济体制",
                    culturalValues: [
                        "儒家思想",
                        "集体主义",
                        "和谐理念",
                        "等级秩序",
                        "家族观念"
                    ],
                    technologicalFocus: [
                        "农业技术",
                        "基础设施",
                        "制造业",
                        "信息技术",
                        "环保科技"
                    ],
                    religiousBeliefs: [
                        "儒家思想",
                        "道家思想",
                        "佛教文化",
                        "民间信仰"
                    ]
                }
            },
            {
                name: "欧洲文明",
                color: "#2196F3",
                traits: {
                    governmentType: "民主制度",
                    economicSystem: "市场经济",
                    culturalValues: [
                        "个人主义",
                        "自由民主",
                        "人权理念",
                        "法治精神",
                        "科学理性"
                    ],
                    technologicalFocus: [
                        "工业技术",
                        "科学研究",
                        "军事科技",
                        "医疗技术",
                        "航空航天"
                    ],
                    religiousBeliefs: [
                        "基督教",
                        "世俗主义",
                        "多元信仰"
                    ]
                }
            },
            {
                name: "伊斯兰文明",
                color: "#4CAF50",
                traits: {
                    governmentType: "政教合一",
                    economicSystem: "伊斯兰经济",
                    culturalValues: [
                        "伊斯兰教义",
                        "宗教信仰",
                        "家族观念",
                        "传统价值",
                        "群体认同"
                    ],
                    technologicalFocus: [
                        "能源技术",
                        "建筑工程",
                        "军事装备",
                        "通信技术"
                    ],
                    religiousBeliefs: [
                        "伊斯兰教",
                        "伊斯兰法",
                        "宗教传统"
                    ]
                }
            }
            // ... 其他文明配置
        ];

        // 创建文明实例
        this.civilizations = civConfigs.map(config => {
            const civ = new Civilization(config.name, config.color);
            civ.traits = config.traits;
            civ.aiPrompt = window.CivilizationPrompts[config.name];
            return civ;
        });

        console.log('Civilizations initialized:', this.civilizations);
    }

    getWorldState() {
        return {
            civilizations: this.civilizations.map(civ => ({
                name: civ.name,
                traits: civ.traits,
                aiPrompt: civ.aiPrompt
            })),
            events: this.worldEvents
        };
    }
}

// 导出 TestGame 类
export default TestGame; 