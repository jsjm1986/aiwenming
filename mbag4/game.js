class Game {
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
        
        // 初始化UI元素
        this.initializeUI();
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
                    ],
                    socialStructure: {
                        type: "科层制",
                        characteristics: [
                            "官僚体系",
                            "精英阶层",
                            "知识分子群体",
                            "工商阶层",
                            "农民阶层"
                        ]
                    },
                    developmentPriorities: [
                        "社会稳定",
                        "经济发展",
                        "科技创新",
                        "文化传承",
                        "生态保护"
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
                    ],
                    socialStructure: {
                        type: "阶级社会",
                        characteristics: [
                            "中产阶级",
                            "工人阶级",
                            "知识精英",
                            "企业家群体"
                        ]
                    },
                    developmentPriorities: [
                        "技术创新",
                        "市场扩张",
                        "民主建设",
                        "环境保护",
                        "社会福利"
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
                    ],
                    socialStructure: {
                        type: "宗教社会",
                        characteristics: [
                            "宗教领袖",
                            "部族首领",
                            "商人阶层",
                            "普通信众"
                        ]
                    },
                    developmentPriorities: [
                        "宗教传承",
                        "经济发展",
                        "军事防御",
                        "文化保护",
                        "教育普及"
                    ]
                }
            },
            {
                name: "印度文明",
                color: "#9C27B0",
                traits: {
                    governmentType: "联邦民主制",
                    economicSystem: "混合经济",
                    culturalValues: [
                        "多元文化",
                        "宗教传统",
                        "家族观念",
                        "精神追求",
                        "和平共处"
                    ],
                    technologicalFocus: [
                        "软件技术",
                        "生物科技",
                        "航天工程",
                        "可再生能源",
                        "医药研发"
                    ],
                    religiousBeliefs: [
                        "印度教",
                        "佛教",
                        "伊斯兰教",
                        "锡克教"
                    ],
                    socialStructure: {
                        type: "种姓社会",
                        characteristics: [
                            "传统等级",
                            "现代转型",
                            "社会流动",
                            "教育重视"
                        ]
                    },
                    developmentPriorities: [
                        "经济发展",
                        "科技创新",
                        "教育普及",
                        "文化保护",
                        "社会公平"
                    ]
                }
            },
            {
                name: "非洲文明",
                color: "#FFC107",
                traits: {
                    governmentType: "部落联邦制",
                    economicSystem: "资源经济",
                    culturalValues: [
                        "部落传统",
                        "自然崇拜",
                        "共同体精神",
                        "口述传统",
                        "生态智慧"
                    ],
                    technologicalFocus: [
                        "农业技术",
                        "资源开发",
                        "可持续发展",
                        "生",
                        "传统工艺"
                    ],
                    religiousBeliefs: [
                        "泛灵信仰",
                        "祖先崇拜",
                        "自然崇拜",
                        "部落信仰"
                    ],
                    socialStructure: {
                        type: "部落社会",
                        characteristics: [
                            "部落联盟",
                            "长老制度",
                            "氏族关系",
                            "共同体"
                        ]
                    },
                    developmentPriorities: [
                        "资源保护",
                        "部落团结",
                        "传统保护",
                        "经济发展",
                        "教育普及"
                    ]
                }
            },
            {
                name: "美洲文明",
                color: "#3F51B5",
                traits: {
                    governmentType: "联邦制度",
                    economicSystem: "自由市场经济",
                    culturalValues: [
                        "个人自由",
                        "民主制",
                        "创新精神",
                        "多元文化",
                        "竞争意识"
                    ],
                    technologicalFocus: [
                        "军事科技",
                        "航天技术",
                        "信息技术",
                        "生物科技",
                        "人工智能"
                    ],
                    religiousBeliefs: [
                        "基督教",
                        "世俗主义",
                        "多元信仰",
                        "科学主义"
                    ],
                    socialStructure: {
                        type: "多元社会",
                        characteristics: [
                            "移民融合",
                            "阶层流动",
                            "精英主导",
                            "创新创业"
                        ]
                    },
                    developmentPriorities: [
                        "军事优势",
                        "科技领先",
                        "经济霸权",
                        "文化输出",
                        "全球影响"
                    ]
                }
            },
            {
                name: "大洋洲文明",
                color: "#00BCD4",
                traits: {
                    governmentType: "议会民主制",
                    economicSystem: "市场经济",
                    culturalValues: [
                        "环保意识",
                        "多元文化",
                        "原住民权益",
                        "平等理念",
                        "海洋文化"
                    ],
                    technologicalFocus: [
                        "环保科技",
                        "海洋资源",
                        "清洁能源",
                        "生态保护",
                        "农牧业技术"
                    ],
                    religiousBeliefs: [
                        "基督教",
                        "原住民信仰",
                        "世俗主义",
                        "自然崇拜"
                    ],
                    socialStructure: {
                        type: "多元社会",
                        characteristics: [
                            "移民融合",
                            "原住民文化",
                            "环保意识",
                            "海洋特色"
                        ]
                    },
                    developmentPriorities: [
                        "环境保护",
                        "可续发展",
                        "文化多样性",
                        "社会公平",
                        "区域合作"
                    ]
                }
            }
        ];

        // 创建文明例
        this.civilizations = civConfigs.map(config => {
            const civ = new Civilization(config.name, config.color);
            civ.traits = config.traits;
            return civ;
        });

        console.log('Civilizations initialized:', this.civilizations);
    }

    initializeUI() {
        // 初始化文明按钮
        this.initializeCivilizationButtons();
        // 初始化模态框事件
        this.initializeModalEvents();
        // 初始化事件面板
        this.initializeEventPanel();

        // 初始化 AI 算法面板
        this.initializeAIAlgorithmPanel();
    }

    initializeCivilizationButtons() {
        const buttonsContainer = document.querySelector('#civilizationsPanel .civilizations-grid');
        if (!buttonsContainer) {
            console.error('找不到文明按钮容器');
            return;
        }

        buttonsContainer.innerHTML = '';

        // 为每个文明创卡片
        this.civilizations.forEach(civ => {
            const card = document.createElement('div');
            card.className = 'civilization-card';
            card.style.backgroundColor = `${civ.color}11`;
            
            card.innerHTML = `
                <div class="civ-card-header" style="border-left: 4px solid ${civ.color}">
                    <div class="civ-main-info">
                        <span class="civ-icon">🏛️</span>
                        <span class="civ-name">${civ.name}</span>
                    </div>
                    <div class="civ-quick-stats">
                        <span class="stat" title="人口">
                            <i class="stat-icon">👥</i>
                            ${(civ.population / 1000000).toFixed(1)}M
                        </span>
                        <span class="stat" title="科技">
                            <i class="stat-icon">🔬</i>
                            ${Math.round(civ.development.technology * 100)}%
                        </span>
                    </div>
                </div>
                
                <div class="civ-card-body">
                    <div class="progress-section">
                        <div class="progress-item" title="经济发展">
                            <span class="progress-icon">💰</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${civ.development.economy * 100}%">
                                    <div class="progress-glow"></div>
                                </div>
                            </div>
                            <span class="progress-value">${Math.round(civ.development.economy * 100)}%</span>
                        </div>
                        <div class="progress-item" title="军事力量">
                            <span class="progress-icon">⚔️</span>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${civ.development.military * 100}%">
                                    <div class="progress-glow"></div>
                                </div>
                            </div>
                            <span class="progress-value">${Math.round(civ.development.military * 100)}%</span>
                        </div>
                    </div>
                </div>

                <div class="civ-card-footer">
                    <button class="detail-button" style="background-color: ${civ.color}">
                        <span class="button-icon">📊</span>
                        <span class="button-text">查看详情</span>
                    </button>
                </div>
            `;

            // 添加触摸反馈
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
                card.style.transition = 'transform 0.2s ease';
            });

            card.addEventListener('touchend', () => {
                card.style.transform = 'scale(1)';
            });

            // 添加点击事件
            const detailButton = card.querySelector('.detail-button');
            detailButton.addEventListener('click', (e) => {
                e.stopPropagation();  // 防止事件冒泡
                this.showCivilizationDetails(civ);
            });

            buttonsContainer.appendChild(card);
        });

        // 添加移动端优化样式
        const style = document.createElement('style');
        style.textContent = `
            .civilizations-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 12px;
                padding: 12px;
                -webkit-overflow-scrolling: touch;
            }

            .civilization-card {
                background: var(--panel-bg);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
                position: relative;
                touch-action: manipulation;
            }

            .civ-card-header {
                padding: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255, 255, 255, 0.03);
            }

            .civ-main-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .civ-icon {
                font-size: 1.5em;
                background: rgba(255, 255, 255, 0.1);
                padding: 8px;
                border-radius: 12px;
            }

            .civ-name {
                font-size: 1.2em;
                font-weight: 600;
            }

            .civ-quick-stats {
                display: flex;
                gap: 10px;
            }

            .stat {
                display: flex;
                align-items: center;
                gap: 6px;
                background: rgba(255, 255, 255, 0.05);
                padding: 6px 10px;
                border-radius: 8px;
                font-size: 0.9em;
            }

            .civ-card-body {
                padding: 16px;
            }

            .progress-section {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .progress-item {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .progress-icon {
                font-size: 1.2em;
                width: 24px;
                text-align: center;
            }

            .progress-bar {
                flex-grow: 1;
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--primary-color), var(--primary-color-light));
                border-radius: 4px;
                position: relative;
            }

            .progress-value {
                min-width: 45px;
                text-align: right;
                font-size: 0.9em;
                font-family: monospace;
            }

            .civ-card-footer {
                padding: 12px 16px;
                background: rgba(255, 255, 255, 0.02);
            }

            .detail-button {
                width: 100%;
                padding: 12px;
                border: none;
                border-radius: 8px;
                color: white;
                font-size: 1em;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .detail-button:active {
                transform: scale(0.98);
            }

            @media (max-width: 768px) {
                .civilizations-grid {
                    padding: 8px;
                    gap: 8px;
                }

                .civilization-card {
                    border-radius: 12px;
                }

                .civ-card-header {
                    padding: 12px;
                }

                .civ-icon {
                    padding: 6px;
                    border-radius: 8px;
                }

                .stat {
                    padding: 4px 8px;
                    font-size: 0.85em;
                }

                .progress-bar {
                    height: 6px;
                }

                .detail-button {
                    padding: 10px;
                    font-size: 0.95em;
                }
            }

            @media (min-width: 768px) {
                .civilizations-grid {
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }
            }

            .progress-glow {
                position: absolute;
                top: 0;
                right: 0;
                width: 20px;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
                filter: blur(2px);
                animation: glowMove 2s infinite;
            }

            @keyframes glowMove {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
    }

    initializeEventPanel() {
        const eventInput = document.getElementById('eventInput');
        const submitButton = document.getElementById('submitEvent');
        const randomEventBtn = document.getElementById('randomEventBtn');
        const eventPanel = document.querySelector('.event-panel');

        if (!eventInput || !submitButton || !randomEventBtn || !eventPanel) {
            console.error('Event panel elements not found');
            return;
        }

        // 添加随机事件按钮点击事件
        randomEventBtn.addEventListener('click', () => {
            // 随机选择一个事件类型
            const eventTypes = Object.keys(this.randomEvents);
            const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            
            // 从选中的类型中随机选择一个事件
            const eventsOfType = this.randomEvents[randomType];
            const randomEvent = eventsOfType[Math.floor(Math.random() * eventsOfType.length)];
            
            // 设置事件文本
            eventInput.value = randomEvent;
            
            // 添加点击动画效果
            randomEventBtn.classList.add('clicked');
            setTimeout(() => {
                randomEventBtn.classList.remove('clicked');
            }, 200);
        });

        // 提交按钮点击事件
        submitButton.addEventListener('click', async () => {
            const eventText = eventInput.value.trim();
            if (eventText) {
                try {
                    const originalEvent = eventText;
                    this.showThinkingPanel(eventPanel);
                    await this.eventHandler.handleEvent(eventText);
                    this.restoreEventPanel(eventPanel, originalEvent);
                } catch (error) {
                    console.error('Error handling event:', error);
                    this.restoreEventPanel(eventPanel);
                }
            }
        });

        // 添加随机事件数据
        this.randomEvents = {
            // 文明冲突事件
            conflicts: [
                "华夏文明与欧洲文明在太平洋地区爆发军事冲突",
                "伊斯兰文明与欧洲文明在中东地区的紧张局势升级",
                "印度文明与华夏文明在边境地区发生领土争端",
                "美洲文明对外扩张引发多国联合抵制",
                "非洲文明与欧洲文明就资源开发问题产生严重分歧"
            ],
            
            // 文明合作事件
            cooperation: [
                "华夏文明与欧洲文明启动大规模科技合作计划",
                "伊斯兰文明与印度文明建立战略经济伙伴关系",
                "美洲文明与华夏文明签署全面贸易协定",
                "大洋洲文明与非洲文明开展环境保护合作项目",
                "多个文明联合发起全球气候变化应对倡议"
            ],

            // 内部革命事件
            revolution: [
                "华夏文明内部爆发大规模民主改革运动",
                "伊斯兰文明掀起世俗化革命浪潮",
                "印度文明废除种姓制度引发社会剧变",
                "欧洲文明经济体系发生根本性变革",
                "非洲文明传统部落制度面临现代化挑战"
            ],

            // 科技突破事件
            technology: [
                "华夏文明在量子计算领域取得重大突破",
                "欧洲文明成功研发可控核聚变技术",
                "印度文明在生物科技领域实现革命性进展",
                "美洲文明发布新一代人工智能系统",
                "大洋洲文明开发出革命性海洋能源技术"
            ],

            // 文化变革事件
            cultural: [
                "华夏文明传统价值观与现代思潮激烈碰撞",
                "伊斯兰文明青年群体掀起文化变革运动",
                "印度文明出现新兴宗教思潮",
                "欧洲文明多元文化政策引发社会争议",
                "非洲文明传统文化在全球化浪潮中寻求新出路"
            ]
        };

        // 添加按钮点击动画样式
        const style = document.createElement('style');
        style.textContent = `
            .random-event-btn.clicked {
                transform: scale(0.95);
                background: #45a049;
            }
        `;
        document.head.appendChild(style);
    }

    // 修改显示思考中的面板方法
    showThinkingPanel(eventPanel) {
        eventPanel.innerHTML = `
            <div class="thinking-panel">
                <div class="thinking-content">
                    <div class="thinking-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="thinking-tip">AI文明思考中...</div>
                </div>
            </div>
        `;

        // 添加思考中状态的样式
        const style = document.createElement('style');
        style.textContent = `
            .thinking-panel {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 12px;
                margin: 8px 0;
            }

            .thinking-content {
                display: flex;
                align-items: center;
                gap: 12px;
                justify-content: center;
            }

            .thinking-dots {
                display: flex;
                gap: 4px;
            }

            .thinking-dots span {
                width: 6px;
                height: 6px;
                background: var(--primary-color);
                border-radius: 50%;
                animation: dots 1.4s infinite;
                opacity: 0.7;
            }

            .thinking-dots span:nth-child(2) {
                animation-delay: 0.2s;
            }

            .thinking-dots span:nth-child(3) {
                animation-delay: 0.4s;
            }

            .thinking-tip {
                font-size: 0.9em;
                color: var(--text-color);
                opacity: 0.8;
            }

            @keyframes dots {
                0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
                40% { transform: scale(1); opacity: 1; }
            }

            /* 移动端优化 */
            @media (max-width: 768px) {
                .thinking-panel {
                    padding: 10px;
                    margin: 6px 0;
                }

                .thinking-tip {
                    font-size: 0.85em;
                }
            }
        `;
        document.head.appendChild(style);

        // 随机显示提示信息
        const tips = [
            "正在分析事件影响...",
            "评估各文明立场...",
            "计算响应策略...",
            "生成文明反应...",
        ];

        // 每2秒更换一次提示信息
        let currentTipIndex = 0;
        const tipElement = eventPanel.querySelector('.thinking-tip');
        
        const tipInterval = setInterval(() => {
            currentTipIndex = (currentTipIndex + 1) % tips.length;
            tipElement.textContent = tips[currentTipIndex];
        }, 2000);

        // 保存interval ID以便在恢复面板时清除
        eventPanel.dataset.tipInterval = tipInterval;
    }

    // 修改恢复事件输入面板方法
    restoreEventPanel(eventPanel, originalEvent = '') {
        // 清除提示信息定时器
        if (eventPanel.dataset.tipInterval) {
            clearInterval(parseInt(eventPanel.dataset.tipInterval));
        }

        eventPanel.innerHTML = `
            <div class="event-input-container">
                <div class="input-wrapper">
                    <textarea id="eventInput" placeholder="请描述一个世界事件...">${originalEvent}</textarea>
                    <div class="input-hint">
                        <div class="hint-icon">💡</div>
                        <div class="hint-content">
                            <div class="hint-title">提示：详细的事件描述将获得更丰富的文明互动</div>
                            <div class="hint-text">
                                <!-- 保持原有的提示内容 -->
                            </div>
                        </div>
                    </div>
                </div>
                <button id="randomEventBtn" class="random-event-btn" title="随机生成事件">
                    <span class="btn-icon">🎲</span>
                    <span class="btn-text">随机</span>
                </button>
            </div>
            <button id="submitEvent" class="submit-event-btn">
                <span class="submit-icon">📤</span>
                <span class="submit-text">发送事件</span>
            </button>
        `;

        // 重新绑定事件监听器
        this.initializeEventPanel();
    }

    getWorldState() {
        return {
            civilizations: this.civilizations.map(civ => ({
                name: civ.name,
                development: civ.development,
                society: civ.society,
                resources: civ.resources
            })),
            events: this.worldEvents
        };
    }

    updateWorldStateDisplay() {
        const worldStateElement = document.getElementById('worldState');
        worldStateElement.innerHTML = `
            <h3>世界状态</h3>
            <div class="civilizations-status">
                ${this.civilizations.map(civ => `
                    <div class="civilization-status" style="border-color: ${civ.color}">
                        <h4>${civ.name}</h4>
                        <div class="status-indicators">
                            <div class="indicator">
                                <span>稳定:</span>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${civ.society.stability * 100}%"></div>
                                </div>
                            </div>
                            <div class="indicator">
                                <span>经济:</span>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${civ.development.economy * 100}%"></div>
                                </div>
                            </div>
                            <div class="indicator">
                                <span>军事:</span>
                                <div class="progress-bar">
                                    <div class="progress" style="width: ${civ.development.military * 100}%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    update() {
        this.civilizations.forEach(civ => civ.update());
    }
    
    draw() {
        // 不再在画布上绘制文明图形，而是更新文明状态面板
        this.updateCivilizationsDisplay();
    }
    
    updateCivilizationsDisplay() {
        const civilizationsContainer = document.querySelector('.civilizations-container');
        if (!civilizationsContainer) {
            console.error('找不到文明容器元素');
            return;
        }

        // 清空所有内容
        civilizationsContainer.innerHTML = '';

        // 为每个文明创建卡片
        this.civilizations.forEach(civ => {
            const civCard = document.createElement('div');
            civCard.className = 'civilization-card';
            civCard.style.borderColor = civ.color;

            civCard.innerHTML = `
                <div class="civilization-header">
                    <h3 style="color: ${civ.color}">${civ.name}</h3>
                </div>

                <div class="civilization-content">
                    <!-- 基本信息 -->
                    <div class="info-section">
                        <h4>基本状态</h4>
                        <div class="stats-grid">
                            <div class="stat-item">
                                <span class="stat-label">人口:</span>
                                <span class="stat-value">${Math.round(civ.population).toLocaleString()}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">领土:</span>
                                <span class="stat-value">${Math.round(civ.territory)}</span>
                            </div>
                        </div>
                    </div>

                    <!-- 发展指标 -->
                    <div class="info-section">
                        <h4>发展指标</h4>
                        ${this.renderProgressBars(civ.development)}
                    </div>

                    <!-- 会状态 -->
                    <div class="info-section">
                        <h4>社会状态</h4>
                        ${this.renderProgressBars(civ.society)}
                    </div>

                    <!-- 资源状况 -->
                    <div class="info-section">
                        <h4>资源状况</h4>
                        ${this.renderResourceBars(civ.resources)}
                    </div>

                    <!-- 社会矛盾 -->
                    <div class="info-section">
                        <h4>社会矛盾</h4>
                        ${this.renderConflicts(civ.systems.conflicts)}
                    </div>

                    <!-- 文明特征 -->
                    <div class="info-section">
                        <h4>文明特征</h4>
                        <div class="traits-container">
                            ${this.renderTraits(civ)}
                        </div>
                    </div>

                    <!-- 核心标签 -->
                    <div class="info-section">
                        <h4>核心标签</h4>
                        ${this.renderCivTags(civ)}
                    </div>
                </div>
            `;

            civilizationsContainer.appendChild(civCard);
        });
    }

    renderTraits(civ) {
        const traits = civ.ai.personality.mainTraits;
        return Object.entries(traits).map(([trait, value]) => `
            <div class="trait-tag" style="background: ${this.getTraitColor(value)}">
                ${this.formatTraitName(trait)}: ${Math.round(value * 100)}%
            </div>
        `).join('');
    }

    renderProgressBars(data) {
        if (!data) {
            return '<p class="error-message">数据未定义</p>';
        }

        return `
            <div class="progress-bars">
                ${Object.entries(data).map(([key, value]) => `
                    <div class="progress-item">
                        <span class="progress-label">${this.formatStatName(key)}</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${value * 100}%"></div>
                        </div>
                        <span class="progress-percentage">${Math.round(value * 100)}%</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    getProgressColor(value) {
        if (value >= 0.8) return '#4CAF50';      // 深绿
        if (value >= 0.6) return '#8BC34A';      // 浅绿
        if (value >= 0.4) return '#FFC107';      // 黄色
        if (value >= 0.2) return '#FF9800';      // 橙色
        return '#F44336';                        // 红色
    }

    renderResourceBars(resources) {
        return Object.entries(resources).map(([resource, value]) => `
            <div class="resource-bar">
                <span class="resource-label">${this.formatResourceName(resource)}</span>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(value/2000) * 100}%"></div>
                </div>
                <span class="resource-value">${Math.round(value)}</span>
            </div>
        `).join('');
    }

    renderConflicts(conflicts) {
        if (!conflicts) {
            return '<p class="error-message">冲突数据未定义</p>';
        }

        return `
            <div class="conflicts-analysis">
                ${Object.entries(conflicts).map(([type, indicators]) => `
                    <div class="conflict-type">
                        <h4>${this.formatConflictName(type)}</h4>
                        <div class="conflict-indicators">
                            ${Object.entries(indicators).map(([indicator, value]) => `
                                <div class="indicator-item">
                                    <span class="indicator-label">${this.formatIndicatorName(indicator)}</span>
                                    <div class="indicator-bar">
                                        <div class="indicator-fill" style="width: ${value * 100}%"></div>
                                    </div>
                                    <span class="indicator-percentage">${Math.round(value * 100)}%</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderCivTags(civ) {
        const labels = civ.ai.labels;
        return Object.entries(labels.core).map(([category, tags]) => `
            <div class="tag-category">
                <h5>${this.formatCategoryName(category)}</h5>
                <div class="tags">
                    ${tags.map(tag => `
                        <span class="tag">${tag}</span>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    // 辅助方法
    formatTraitName(trait) {
        const nameMap = {
            // 性格特征
            aggression: "攻击性",
            cooperation: "合作性",
            innovation: "创新性",
            tradition: "传统性",
            expansion: "扩张性",
            
            // 标签和属性
            pragmatism: "实用主义",
            collectivism: "集体主义",
            harmony: "和谐理念",
            individualism: "个人主义",
            rationalism: "理性主义",
            faith: "信仰",
            community: "社群意识",
            honor: "荣誉",
            
            // 经济相关
            mixed_economy: "合经济",
            market_economy: "市场经济",
            state_guidance: "国家引导",
            private_enterprise: "私营企业",
            
            // 政治相关
            centralized: "中央集权",
            democratic: "民主制度",
            bureaucratic: "官僚体制",
            participatory: "参与式治理",
            
            // 文化相关
            confucianism: "儒家思想",
            personal_freedom: "个人自由",
            balance: "平衡",
            capitalism: "资本主义",
            free_market: "自由市场"
        };
        return nameMap[trait] || trait;
    }

    formatStatName(stat) {
        const nameMap = {
            technology: "科技",
            economy: "经济",
            culture: "文化",
            military: "军事",
            diplomacy: "外交",
            stability: "稳定性",
            happiness: "幸福度",
            education: "教育",
            healthcare: "医疗"
        };
        return nameMap[stat] || stat;
    }

    formatResourceName(resource) {
        const nameMap = {
            food: "粮食",
            minerals: "产",
            energy: "能源",
            knowledge: "知识",
            influence: "影响力"
        };
        return nameMap[resource] || resource;
    }

    formatConflictName(conflict) {
        const nameMap = {
            class: "阶级���盾",
            ethnic: "族矛盾",
            ideological: "意识形态矛盾",
            economic: "经济矛盾"
        };
        return nameMap[conflict] || conflict;
    }

    formatIndicatorName(indicator) {
        const nameMap = {
            intensity: "强度",
            awareness: "意识",
            mobilization: "动员",
            tensions: "张力",
            discrimination: "歧视",
            integration: "融",
            polarization: "极化",
            radicalization: "激进化",
            tolerance: "包容",
            inequality: "不平等",
            exploitation: "剥",
            resistance: "抵抗"
        };
        return nameMap[indicator] || indicator;
    }

    formatCategoryName(category) {
        const nameMap = {
            identity: "身份特征",
            values: "核心价值观",
            philosophy: "哲学思想"
        };
        return nameMap[category] || category;
    }

    getTraitColor(value) {
        // 根据特征值返回不同的颜色
        const hue = 120 * value; // 0-120 范围的色相，从红色到绿色
        return `hsla(${hue}, 70%, 40%, 0.8)`;
    }

    getConflictColor(value) {
        // 根据冲突程度返回不同的颜色
        const hue = 120 * (1 - value); // 120-0 范围的色相，从绿色到红色
        return `hsla(${hue}, 70%, 40%, 0.8)`;
    }

    initializeModalEvents() {
        const modal = document.getElementById('civilizationModal');
        const closeButton = document.querySelector('.close-button');
        const modalTabs = document.querySelectorAll('.modal-tab');
        const tabContents = document.querySelectorAll('.tab-content');

        if (!modal || !closeButton || !modalTabs.length || !tabContents.length) {
            console.error('Modal elements not found');
            return;
        }

        // 添加初始样式，确保模态框默认隐藏
        modal.style.display = 'none';  // 添加这行确保模态框初始隐藏

        // 关闭模态框
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // 点击模态框外部关闭
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // 标签页切换
        modalTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 移除所有标签页的活动状态
                modalTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // 激活当前标签页
                tab.classList.add('active');
                const tabName = tab.getAttribute('data-tab');
                const content = document.querySelector(`.tab-content[data-tab="${tabName}"]`);
                if (content) {
                    content.classList.add('active');
                }
            });
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });

        console.log('Modal events initialized');
    }

    showCivilizationDetails(civ) {
        console.log('Showing details for civilization:', civ);
        
        // 创建或获取底部面板
        let bottomSheet = document.getElementById('bottomSheet');
        if (!bottomSheet) {
            bottomSheet = document.createElement('div');
            bottomSheet.id = 'bottomSheet';
            bottomSheet.className = 'bottom-sheet';
            document.body.appendChild(bottomSheet);
        }

        // 设置内容
        bottomSheet.innerHTML = `
            <div class="bottom-sheet-content">
                <div class="bottom-sheet-header" style="background: linear-gradient(to right, ${civ.color}22, transparent)">
                    <div class="header-content">
                        <span class="civ-icon">🏛️</span>
                        <h3>${civ.name}</h3>
                    </div>
                    <button class="close-sheet">×</button>
                </div>
                <div class="bottom-sheet-tabs">
                    <button class="sheet-tab active" data-tab="basic">
                        <span class="tab-icon">📊</span>
                        <span class="tab-name">基本信息</span>
                    </button>
                    <button class="sheet-tab" data-tab="social">
                        <span class="tab-icon">👥</span>
                        <span class="tab-name">社会状态</span>
                    </button>
                    <button class="sheet-tab" data-tab="culture">
                        <span class="tab-icon">🎭</span>
                        <span class="tab-name">文化特征</span>
                    </button>
                    <button class="sheet-tab" data-tab="conflicts">
                        <span class="tab-icon">⚔️</span>
                        <span class="tab-name">社会矛盾</span>
                    </button>
                </div>
                <div class="bottom-sheet-body">
                    <div class="tab-content active" data-tab="basic"></div>
                    <div class="tab-content" data-tab="social"></div>
                    <div class="tab-content" data-tab="culture"></div>
                    <div class="tab-content" data-tab="conflicts"></div>
                </div>
            </div>
        `;

        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            .bottom-sheet {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                background: var(--panel-bg);
                border-radius: 20px 20px 0 0;
                z-index: 1000;
                transform: translateY(100%);
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                max-height: 90vh;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
            }

            .bottom-sheet.active {
                transform: translateY(0);
            }

            .bottom-sheet-content {
                padding: 20px;
                padding-bottom: calc(20px + env(safe-area-inset-bottom));
            }

            .bottom-sheet-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding: 15px;
                border-radius: 12px;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }

            .header-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .header-content h3 {
                font-size: 1.3em;
                font-weight: 600;
                margin: 0;
            }

            .civ-icon {
                font-size: 1.5em;
                background: rgba(255, 255, 255, 0.1);
                padding: 8px;
                border-radius: 50%;
            }

            .close-sheet {
                background: none;
                border: none;
                color: var(--text-color);
                font-size: 24px;
                padding: 8px;
                cursor: pointer;
                border-radius: 50%;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .close-sheet:hover {
                background: rgba(255, 255, 255, 0.1);
            }

            .bottom-sheet-tabs {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                overflow-x: auto;
                padding-bottom: 10px;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }

            .bottom-sheet-tabs::-webkit-scrollbar {
                display: none;
            }

            .sheet-tab {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                padding: 12px 20px;
                background: rgba(255, 255, 255, 0.05);
                border: none;
                border-radius: 12px;
                color: var(--text-color);
                white-space: nowrap;
                cursor: pointer;
                transition: all 0.3s ease;
                min-width: 80px;
            }

            .sheet-tab.active {
                background: var(--primary-color);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
            }

            .tab-icon {
                font-size: 1.2em;
            }

            .tab-name {
                font-size: 0.9em;
                opacity: 0.9;
            }

            .bottom-sheet-body {
                padding-bottom: 20px;
            }

            .tab-content {
                display: none;
                animation: fadeIn 0.3s ease;
            }

            .tab-content.active {
                display: block;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* 内容样式 */
            .info-section {
                background: rgba(255, 255, 255, 0.03);
                border-radius: 12px;
                padding: 15px;
                margin-bottom: 15px;
                transition: all 0.3s ease;
            }

            .info-section:hover {
                background: rgba(255, 255, 255, 0.05);
                transform: translateX(5px);
            }

            .info-section h4 {
                color: var(--primary-color);
                margin-bottom: 12px;
                padding-bottom: 8px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 12px;
            }

            .stat-item {
                background: rgba(255, 255, 255, 0.02);
                padding: 12px;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .stat-header {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .stat-icon {
                font-size: 1.2em;
                opacity: 0.8;
            }

            .stat-label {
                flex-grow: 1;
                font-size: 0.9em;
                opacity: 0.9;
            }

            .stat-value {
                font-family: monospace;
                font-size: 1.1em;
                color: var(--primary-color);
            }

            .progress-bar {
                height: 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                overflow: hidden;
                position: relative;
            }

            .progress-fill {
                height: 100%;
                border-radius: 3px;
                transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
            }

            .progress-glow {
                position: absolute;
                top: 0;
                right: 0;
                width: 20px;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
                filter: blur(2px);
                animation: glowMove 2s infinite;
            }

            @keyframes glowMove {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }

            /* 适配深色模式 */
            @media (prefers-color-scheme: dark) {
                .bottom-sheet {
                    background: rgba(18, 18, 18, 0.95);
                }
            }

            /* 移动端优化 */
            @media (max-width: 768px) {
                .bottom-sheet-content {
                    padding: 15px;
                }

                .sheet-tab {
                    padding: 10px 16px;
                }

                .stats-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);

        // 添加交互事件
        const closeBtn = bottomSheet.querySelector('.close-sheet');
        const tabs = bottomSheet.querySelectorAll('.sheet-tab');
        const contents = bottomSheet.querySelectorAll('.tab-content');

        // 关闭按钮事件
        closeBtn.addEventListener('click', () => {
            bottomSheet.classList.remove('active');
        });

        // 标签切换事件
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const tabName = tab.getAttribute('data-tab');
                const content = bottomSheet.querySelector(`.tab-content[data-tab="${tabName}"]`);
                if (content) {
                    content.classList.add('active');
                    this.updateTabContent(civ, tabName, content);
                }
            });
        });

        // 添加拖动关闭功能
        let startY = 0;
        let currentY = 0;
        
        bottomSheet.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        bottomSheet.addEventListener('touchmove', (e) => {
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            if (deltaY > 0) { // 只允许向下拖动
                bottomSheet.style.transform = `translateY(${deltaY}px)`;
            }
        });

        bottomSheet.addEventListener('touchend', () => {
            const deltaY = currentY - startY;
            if (deltaY > 150) { // 如果拖动距离超过150px，关闭面板
                bottomSheet.classList.remove('active');
            } else {
                bottomSheet.style.transform = '';
            }
        });

        // 显示面板并加载初始内容
        setTimeout(() => {
            bottomSheet.classList.add('active');
            this.updateTabContent(civ, 'basic', bottomSheet.querySelector('.tab-content[data-tab="basic"]'));
        }, 50);
    }

    updateTabContent(civ, tabName, content) {
        switch(tabName) {
            case 'basic':
                content.innerHTML = this.renderBasicInfo(civ);
                break;
            case 'social':
                content.innerHTML = this.renderSocialStatus(civ);
                break;
            case 'culture':
                content.innerHTML = this.renderCultureTraits(civ);
                break;
            case 'conflicts':
                content.innerHTML = this.renderConflicts(civ);
                break;
            default:
                content.innerHTML = '<p>请选择要查看的内容</p>';
        }
    }

    renderBasicInfo(civ) {
        return `
            <div class="info-section">
                <h3>文明概况</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-header">
                            <span class="stat-icon">👥</span>
                            <span class="stat-label">人口</span>
                        </div>
                        <span class="stat-value">${Math.round(civ.population).toLocaleString()}</span>
                    </div>
                    <div class="stat-item">
                        <div class="stat-header">
                            <span class="stat-icon">🌍</span>
                            <span class="stat-label">领土</span>
                        </div>
                        <span class="stat-value">${Math.round(civ.territory)}</span>
                    </div>
                </div>
            </div>

            <div class="info-section">
                <h3>发展指标</h3>
                <div class="development-indicators">
                    ${Object.entries(civ.development).map(([key, value]) => `
                        <div class="indicator-item">
                            <div class="indicator-header">
                                <span class="indicator-icon">${this.getIndicatorIcon(key)}</span>
                                <span class="indicator-label">${this.formatStatName(key)}</span>
                                <span class="indicator-value">${Math.round(value * 100)}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${value * 100}%; background-color: ${this.getProgressColor(value)}">
                                    <div class="progress-glow"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="info-section">
                <h3>AI Agent 征</h3>
                <div class="ai-traits">
                    <div class="personality-traits">
                        ${Object.entries(civ.ai.personality).map(([trait, value]) => `
                            <div class="trait-item">
                                <div class="trait-header">
                                    <span class="trait-icon">${this.getTraitIcon(trait)}</span>
                                    <span class="trait-label">${this.formatTraitName(trait)}</span>
                                    <span class="trait-value">${Math.round(value * 100)}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${value * 100}%; background-color: ${this.getTraitColor(value)}">
                                        <div class="progress-glow"></div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderSocialStatus(civ) {
        return `
            <div class="info-section">
                <h3>社会状态</h3>
                <div class="social-indicators">
                    ${Object.entries(civ.society).map(([key, value]) => `
                        <div class="indicator-item">
                            <div class="indicator-header">
                                <span class="indicator-icon">${this.getSocialIcon(key)}</span>
                                <span class="indicator-label">${this.formatStatName(key)}</span>
                                <span class="indicator-value">${Math.round(value * 100)}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${value * 100}%; background-color: ${this.getProgressColor(value)}">
                                    <div class="progress-glow"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="info-section">
                <h3>阶级结构</h3>
                <div class="class-structure">
                    ${Object.entries(civ.systems.socialClass).map(([className, value]) => 
                        className !== 'mobility' ? `
                            <div class="class-item">
                                <div class="class-header">
                                    <span class="class-icon">${this.getClassIcon(className)}</span>
                                    <span class="class-label">${this.formatClassName(className)}</span>
                                    <span class="class-value">${Math.round(value * 100)}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${value * 100}%; background-color: ${this.getClassColor(className)}">
                                        <div class="progress-glow"></div>
                                    </div>
                                </div>
                            </div>
                        ` : ''
                    ).join('')}
                    <div class="mobility-indicator">
                        <div class="mobility-header">
                            <span class="mobility-icon">🔄</span>
                            <span class="mobility-label">社会流动性</span>
                            <span class="mobility-value">${Math.round(civ.systems.socialClass.mobility * 100)}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${civ.systems.socialClass.mobility * 100}%; background-color: ${this.getProgressColor(civ.systems.socialClass.mobility)}">
                                <div class="progress-glow"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCultureTraits(civ) {
        return `
            <div class="culture-traits-container">
                <!-- 政治体系卡片 -->
                <div class="trait-card political-system">
                    <div class="trait-card-header">
                        <span class="trait-icon">⚖️</span>
                        <h4>政治体系</h4>
                    </div>
                    <div class="trait-card-content">
                        <div class="trait-main-value">
                            ${civ.traits.governmentType}
                        </div>
                        <div class="trait-indicators">
                            <div class="indicator">
                                <span class="indicator-label">集中度</span>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="
                                        width: ${this.getPoliticalCentralization(civ) * 100}%;
                                        background: linear-gradient(90deg, 
                                            ${this.getProgressColor(this.getPoliticalCentralization(civ))}88,
                                            ${this.getProgressColor(this.getPoliticalCentralization(civ))}
                                        )
                                    ">
                                        <div class="progress-glow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 经济体系卡片 -->
                <div class="trait-card economic-system">
                    <div class="trait-card-header">
                        <span class="trait-icon">💰</span>
                        <h4>经济体系</h4>
                    </div>
                    <div class="trait-card-content">
                        <div class="trait-main-value">
                            ${civ.traits.economicSystem}
                        </div>
                        <div class="trait-indicators">
                            <div class="indicator">
                                <span class="indicator-label">市场化程度</span>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="
                                        width: ${this.getMarketization(civ) * 100}%;
                                        background: linear-gradient(90deg, 
                                            ${this.getProgressColor(this.getMarketization(civ))}88,
                                            ${this.getProgressColor(this.getMarketization(civ))}
                                        )
                                    ">
                                        <div class="progress-glow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 文化价值观卡片 -->
                <div class="trait-card cultural-values">
                    <div class="trait-card-header">
                        <span class="trait-icon">🎭</span>
                        <h4>文化价值观</h4>
                    </div>
                    <div class="trait-card-content">
                        <div class="values-grid">
                            ${civ.traits.culturalValues.map(value => `
                                <div class="value-item">
                                    <span class="value-icon">${this.getCulturalValueIcon(value)}</span>
                                    <span class="value-text">${value}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- 技术重点卡片 -->
                <div class="trait-card tech-focus">
                    <div class="trait-card-header">
                        <span class="trait-icon">🔬</span>
                        <h4>技术重点</h4>
                    </div>
                    <div class="trait-card-content">
                        <div class="tech-grid">
                            ${civ.traits.technologicalFocus.map(tech => `
                                <div class="tech-item">
                                    <span class="tech-icon">${this.getTechIcon(tech)}</span>
                                    <span class="tech-text">${tech}</span>
                                    <div class="tech-progress">
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="
                                                width: ${this.getTechProgress(civ, tech) * 100}%;
                                                background: linear-gradient(90deg, 
                                                    ${this.getTechColor(tech)}88,
                                                    ${this.getTechColor(tech)}
                                                )
                                            ">
                                                <div class="progress-glow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <!-- 宗教信仰卡片 -->
                <div class="trait-card religious-beliefs">
                    <div class="trait-card-header">
                        <span class="trait-icon">🙏</span>
                        <h4>宗教信仰</h4>
                    </div>
                    <div class="trait-card-content">
                        <div class="beliefs-grid">
                            ${civ.traits.religiousBeliefs.map(belief => `
                                <div class="belief-item">
                                    <span class="belief-icon">${this.getReligionIcon(belief)}</span>
                                    <span class="belief-text">${belief}</span>
                                    <div class="belief-influence">
                                        <span class="influence-label">影响力</span>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="
                                                width: ${this.getReligiousInfluence(civ, belief) * 100}%;
                                                background: linear-gradient(90deg, 
                                                    ${this.getReligionColor(belief)}88,
                                                    ${this.getReligionColor(belief)}
                                                )
                                            ">
                                                <div class="progress-glow"></div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <style>
                .culture-traits-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 20px;
                    padding: 10px;
                }

                .trait-card {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 12px;
                    padding: 15px;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }

                .trait-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    background: rgba(255, 255, 255, 0.08);
                }

                .trait-card-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 15px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                }

                .trait-icon {
                    font-size: 1.5em;
                    background: rgba(255, 255, 255, 0.1);
                    padding: 8px;
                    border-radius: 50%;
                }

                .trait-card-header h4 {
                    margin: 0;
                    color: #81C784;
                    font-size: 1.1em;
                }

                .trait-main-value {
                    font-size: 1.2em;
                    margin-bottom: 15px;
                    padding: 10px;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 6px;
                    text-align: center;
                }

                .values-grid, .tech-grid, .beliefs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 10px;
                }

                .value-item, .tech-item, .belief-item {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 10px;
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                }

                .value-item:hover, .tech-item:hover, .belief-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    transform: translateY(-2px);
                }

                .value-icon, .tech-icon, .belief-icon {
                    font-size: 1.5em;
                    margin-bottom: 5px;
                }

                .value-text, .tech-text, .belief-text {
                    text-align: center;
                    font-size: 0.9em;
                }

                .tech-progress, .belief-influence {
                    width: 100%;
                    margin-top: 5px;
                }

                .influence-label {
                    font-size: 0.8em;
                    opacity: 0.8;
                    margin-bottom: 3px;
                    display: block;
                }

                .progress-bar {
                    height: 6px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 3px;
                    overflow: hidden;
                    position: relative;
                }

                .progress-fill {
                    height: 100%;
                    border-radius: 3px;
                    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }

                .progress-glow {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 20px;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
                    filter: blur(2px);
                    animation: glowMove 2s infinite;
                }

                @keyframes glowMove {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                @media (max-width: 768px) {
                    .culture-traits-container {
                        grid-template-columns: 1fr;
                    }

                    .values-grid, .tech-grid, .beliefs-grid {
                        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    }
                }
            </style>
        `;
    }

    renderConflicts(civ) {
        return `
            <div class="info-section">
                <h3>社会矛盾</h3>
                <div class="conflicts-analysis">
                    ${Object.entries(civ.systems.conflicts).map(([type, indicators]) => `
                        <div class="conflict-category">
                            <div class="category-header">
                                <span class="category-icon">${this.getConflictIcon(type)}</span>
                                <span class="category-label">${this.formatConflictName(type)}</span>
                            </div>
                            <div class="indicators">
                                ${Object.entries(indicators).map(([indicator, value]) => `
                                    <div class="indicator-item">
                                        <div class="indicator-header">
                                            <span class="indicator-label">${this.formatIndicatorName(indicator)}</span>
                                            <span class="indicator-value">${Math.round(value * 100)}%</span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${value * 100}%; background-color: ${this.getConflictColor(value)}">
                                                <div class="progress-glow"></div>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 辅助方法
    getIndicatorIcon(indicator) {
        const icons = {
            technology: '🔬',
            economy: '💰',
            culture: '🎭',
            military: '⚔️',
            diplomacy: '🤝'
        };
        return icons[indicator] || '📊';
    }

    getTraitIcon(trait) {
        const icons = {
            aggression: '⚔️',
            cooperation: '🤝',
            innovation: '💡',
            tradition: '📚',
            expansion: '🌍'
        };
        return icons[trait] || '🎯';
    }

    getSocialIcon(stat) {
        const icons = {
            stability: '⚖️',
            happiness: '😊',
            education: '📚',
            healthcare: '🏥'
        };
        return icons[stat] || '📊';
    }

    getClassIcon(className) {
        const icons = {
            upperClass: '👑',
            middleClass: '👔',
            workingClass: '👷'
        };
        return icons[className] || '👥';
    }

    getConflictIcon(type) {
        const icons = {
            class: '⚔️',
            ethnic: '🌍',
            ideological: '💭',
            economic: '💰'
        };
        return icons[type] || '⚠️';
    }

    showErrorMessage(civilization, error) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `
            <h4>${civilization ? civilization.name : '系'} 错误</h4>
            <p>${error.message}</p>
        `;
        document.getElementById('reactionPanel').appendChild(errorElement);
    }

    // 添加新的辅助渲染方法
    renderProgressBar(value, label, color = null) {
        const percentage = Math.round(value * 100);
        const barColor = color || this.getProgressColor(value);
        return `
            <div class="progress-item">
                <div class="progress-header">
                    <span class="progress-label">${label}</span>
                    <span class="progress-value" style="color: ${barColor}">${percentage}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="
                        width: ${percentage}%; 
                        background: linear-gradient(90deg, 
                            ${barColor}88, 
                            ${barColor}
                        )
                    ">
                        <div class="progress-glow"></div>
                    </div>
                </div>
            </div>
        `;
    }

    formatClassName(className) {
        const nameMap = {
            upperClass: "上层阶级",
            middleClass: "中产阶级",
            workingClass: "工人阶级",
            mobility: "社会流动性",
            elites: "精英阶层",
            masses: "普通民众",
            bureaucrats: "官僚阶层",
            merchants: "商人阶层",
            intellectuals: "知识分子",
            peasants: "农民阶层",
            workers: "工人阶层",
            clergy: "宗教阶层"
        };
        return nameMap[className] || className;
    }

    getClassColor(className) {
        const colorMap = {
            upperClass: "#FFD700",     // 金色
            middleClass: "#90EE90",    // 浅绿色
            workingClass: "#87CEEB",   // 天蓝色
            mobility: "#DDA0DD",       // 梅红色
            elites: "#FFD700",
            masses: "#87CEEB",
            bureaucrats: "#DDA0DD",
            merchants: "#90EE90",
            intellectuals: "#B0C4DE",
            peasants: "#8FBC8F",
            workers: "#87CEEB",
            clergy: "#DDA0DD"
        };
        return colorMap[className] || "#808080"; // 默认灰色
    }

    // 添加辅助方
    getStabilityColor(value) {
        if (value >= 0.8) return '#4CAF50';
        if (value >= 0.6) return '#8BC34A';
        if (value >= 0.4) return '#FFC107';
        if (value >= 0.2) return '#FF9800';
        return '#F44336';
    }

    getEconomyColor(value) {
        if (value >= 0.8) return '#2196F3';
        if (value >= 0.6) return '#03A9F4';
        if (value >= 0.4) return '#00BCD4';
        if (value >= 0.2) return '#009688';
        return '#607D8B';
    }

    showCivilizationPreview(civ, button) {
        const preview = document.createElement('div');
        preview.className = 'civilization-preview';
        preview.innerHTML = `
            <h4>${civ.name}概况</h4>
            <div class="preview-content">
                <div class="preview-stats">
                    <div class="preview-stat">
                        <span class="stat-label">政体</span>
                        <span class="stat-value">${civ.traits.governmentType}</span>
                    </div>
                    <div class="preview-stat">
                        <span class="stat-label">经济</span>
                        <span class="stat-value">${civ.traits.economicSystem}</span>
                    </div>
                </div>
                <div class="preview-traits">
                    <div class="trait-category">
                        <span class="category-label">文化特点</span>
                        <div class="trait-tags">
                            ${civ.traits.culturalValues.slice(0, 3).map(value => 
                                `<span class="trait-tag">${value}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        button.parentNode.appendChild(preview);
    }

    initializeAIAlgorithmPanel() {
        const aiAlgorithmPanel = document.getElementById('aiAlgorithmPanel');
        if (!aiAlgorithmPanel) {
            console.error('找不到AI算法面板');
            return;
        }

        // 创建文明选择器和算法展示区域
        aiAlgorithmPanel.innerHTML = `
            <div class="algorithm-header">
                <h3>AI文明算法与参数分析</h3>
                <div class="civilization-selector">
                    <div class="civ-scroll-container">
                        ${this.civilizations.map(civ => `
                            <button class="civ-select-button" data-civ="${civ.name}" style="background-color: ${civ.color}">
                                <span class="civ-icon">🏛️</span>
                                <span class="civ-name">${civ.name}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="algorithm-content">
                <div class="algorithm-tabs">
                    <div class="tabs-scroll-container">
                        <button class="algorithm-tab active" data-tab="personality">
                            <span class="tab-icon">🧠</span>
                            <span class="tab-name">性格系统</span>
                        </button>
                        <button class="algorithm-tab" data-tab="decision">
                            <span class="tab-icon">⚖️</span>
                            <span class="tab-name">决策系统</span>
                        </button>
                        <button class="algorithm-tab" data-tab="social">
                            <span class="tab-icon">👥</span>
                            <span class="tab-name">社会系统</span>
                        </button>
                        <button class="algorithm-tab" data-tab="response">
                            <span class="tab-icon">📊</span>
                            <span class="tab-name">响应系统</span>
                        </button>
                    </div>
                </div>

                <div class="algorithm-display">
                    <!-- 内容将通过JavaScript动态生成 -->
                </div>
            </div>
        `;

        // 添加移动端优化样式
        const style = document.createElement('style');
        style.textContent = `
            .algorithm-header {
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                margin-bottom: 20px;
            }

            .civilization-selector {
                margin-top: 15px;
                overflow: hidden;
            }

            .civ-scroll-container {
                display: flex;
                gap: 10px;
                overflow-x: auto;
                padding: 10px 5px;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
            }

            .civ-select-button {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 12px 20px;
                border: none;
                border-radius: 10px;
                color: white;
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
                scroll-snap-align: start;
                min-width: 120px;
            }

            .civ-select-button.active {
                transform: scale(1.05);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }

            .algorithm-tabs {
                margin: 20px 0;
                overflow: hidden;
            }

            .tabs-scroll-container {
                display: flex;
                gap: 10px;
                overflow-x: auto;
                padding: 10px 5px;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
            }

            .algorithm-tab {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                padding: 12px 20px;
                background: rgba(255, 255, 255, 0.05);
                border: none;
                border-radius: 10px;
                color: var(--text-color);
                cursor: pointer;
                transition: all 0.3s ease;
                white-space: nowrap;
                scroll-snap-align: start;
                min-width: 100px;
            }

            .algorithm-tab.active {
                background: var(--primary-color);
                transform: scale(1.05);
            }

            .tab-icon {
                font-size: 20px;
            }

            .tab-name {
                font-size: 12px;
            }

            .algorithm-display {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 12px;
                padding: 20px;
                margin-top: 20px;
            }

            .code-block {
                background: rgba(0, 0, 0, 0.3);
                padding: 15px;
                border-radius: 10px;
                font-family: monospace;
                font-size: 14px;
                line-height: 1.5;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
            }

            .parameter-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }

            .parameter-item {
                background: rgba(255, 255, 255, 0.03);
                padding: 15px;
                border-radius: 10px;
                transition: all 0.3s ease;
            }

            .parameter-item:active {
                transform: scale(0.98);
                background: rgba(255, 255, 255, 0.05);
            }

            .parameter-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }

            .progress-bar {
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .progress-glow {
                position: absolute;
                top: 0;
                right: 0;
                width: 20px;
                height: 100%;
                background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3));
                animation: glowMove 2s infinite;
            }

            @keyframes glowMove {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }

            /* 触摸反馈优化 */
            @media (hover: none) {
                .civ-select-button:active,
                .algorithm-tab:active {
                    transform: scale(0.95);
                }
            }

            /* 移动端适配 */
            @media (max-width: 768px) {
                .algorithm-header {
                    padding: 10px;
                }

                .parameter-grid {
                    grid-template-columns: 1fr;
                }

                .code-block {
                    font-size: 12px;
                    padding: 10px;
                }

                .parameter-item {
                    padding: 12px;
                }
            }

            /* 添加滚动条样式 */
            .civ-scroll-container::-webkit-scrollbar,
            .tabs-scroll-container::-webkit-scrollbar {
                height: 4px;
            }

            .civ-scroll-container::-webkit-scrollbar-track,
            .tabs-scroll-container::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 2px;
            }

            .civ-scroll-container::-webkit-scrollbar-thumb,
            .tabs-scroll-container::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
            }
        `;
        document.head.appendChild(style);

        // 添加事件监听器
        const buttons = aiAlgorithmPanel.querySelectorAll('.civ-select-button');
        const tabs = aiAlgorithmPanel.querySelectorAll('.algorithm-tab');
        const display = aiAlgorithmPanel.querySelector('.algorithm-display');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const civName = button.getAttribute('data-civ');
                const civilization = this.civilizations.find(civ => civ.name === civName);
                if (civilization) {
                    // 移除其他按钮的活动状态
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // 显示当前选中标签页的内容
                    const activeTab = aiAlgorithmPanel.querySelector('.algorithm-tab.active');
                    this.showAlgorithmContent(civilization, activeTab.getAttribute('data-tab'), display);
                }
            });
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 移除其他标签的活动状态
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // 获取当前选中的文明
                const activeButton = aiAlgorithmPanel.querySelector('.civ-select-button.active');
                if (activeButton) {
                    const civName = activeButton.getAttribute('data-civ');
                    const civilization = this.civilizations.find(civ => civ.name === civName);
                    if (civilization) {
                        this.showAlgorithmContent(civilization, tab.getAttribute('data-tab'), display);
                    }
                }
            });
        });

        // 默认显示第一个文明的性格系统
        if (this.civilizations.length > 0) {
            const firstCivButton = buttons[0];
            firstCivButton.classList.add('active');
            this.showAlgorithmContent(this.civilizations[0], 'personality', display);
        }
    }

    showAIAlgorithms(civilization) {
        const personalityAlgorithms = document.querySelector('.personality-algorithms .algorithm-section');
        const decisionAlgorithms = document.querySelector('.decision-algorithms .algorithm-section');
        const responseAlgorithms = document.querySelector('.response-algorithms .algorithm-section');

        // 显示性格特征算法
        personalityAlgorithms.innerHTML = `
            <h5>性格计算核心算法</h5>
            <code>
// 攻击性计算
aggression = baseValue(0.5)
    + (militaryFocus * 0.3)
    + (culturalAggression * 0.3)
    + (historicalConflicts * 0.2)
    + (resourcePressure * 0.2)

// 合作性计算
cooperation = baseValue(0.5)
    + (diplomaticTradition * 0.3)
    + (culturalOpenness * 0.3)
    + (allianceHistory * 0.2)
    + (economicInterdependence * 0.2)

// 创新性计算
innovation = baseValue(0.5)
    + (technologicalFocus * 0.3)
    + (educationLevel * 0.3)
    + (culturalCreativity * 0.2)
    + (resourceAvailability * 0.2)
            </code>

            <h5>当前性格参数</h5>
            <div class="parameter-list">
                ${Object.entries(civilization.ai.personality).map(([trait, value]) => `
                    <div class="parameter-item">
                        <div class="parameter-header">
                            <span class="parameter-name">${this.formatTraitName(trait)}</span>
                            <span class="parameter-value">${Math.round(value * 100)}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${value * 100}%; background-color: ${this.getTraitColor(value)}"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // 显示决策制定算法
        decisionAlgorithms.innerHTML = `
            <h5>决策评估算法</h5>
            <code>
// 事件评估
eventScore = (eventSeverity * 0.4) +
             (eventRelevance * 0.3) +
             (eventUrgency * 0.3)

// 响应倾向计算
responseTendency = {
    military: (aggression * 0.4) + (militaryStrength * 0.3) + (threatLevel * 0.3),
    diplomatic: (cooperation * 0.4) + (diplomaticInfluence * 0.3) + (allianceStrength * 0.3),
    economic: (economicStrength * 0.4) + (marketInfluence * 0.3) + (resourceControl * 0.3)
}

// 行动优先级
actionPriority = (responseTendency[actionType] * 0.4) +
                 (actionEffectiveness * 0.3) +
                 (resourceRequirement * 0.3)
            </code>

            <h5>当前决策参数</h5>
            <div class="parameter-list">
                <div class="parameter-item">
                    <div class="parameter-header">
                        <span class="parameter-name">政治体系影响</span>
                        <span class="parameter-value">${civilization.traits.governmentType}</span>
                    </div>
                </div>
                <div class="parameter-item">
                    <div class="parameter-header">
                        <span class="parameter-name">经济体系影响</span>
                        <span class="parameter-value">${civilization.traits.economicSystem}</span>
                    </div>
                </div>
            </div>
        `;

        // 显示响应生成算法
        responseAlgorithms.innerHTML = `
            <h5>响应生成核心算法</h5>
            <code>
// 响应框架生成
response = {
    analysis: generateEventAnalysis(event, personality),
    impact: calculateImpact(event, civilizationState),
    strategy: determineStrategy(analysis, impact, personality),
    actions: prioritizeActions(strategy, resources)
}

// 文明特征影响因子
traitInfluence = {
    cultural: calculateCulturalInfluence(traits),
    political: calculatePoliticalInfluence(traits),
    economic: calculateEconomicInfluence(traits)
}

// 最响应调整
finalResponse = adjustResponseByTraits(response, traitInfluence)
            </code>

            <h5>当前响应参数</h5>
            <div class="parameter-list">
                ${Object.entries(civilization.ai.labels.core).map(([category, labels]) => `
                    <div class="parameter-item">
                        <div class="parameter-header">
                            <span class="parameter-name">${this.formatCategoryName(category)}</span>
                        </div>
                        <div class="labels-container">
                            ${labels.map(label => `
                                <span class="label-tag">${label}</span>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    showAlgorithmContent(civilization, tabName, display) {
        switch(tabName) {
            case 'personality':
                display.innerHTML = this.renderPersonalityAlgorithm(civilization);
                break;
            case 'decision':
                display.innerHTML = this.renderDecisionAlgorithm(civilization);
                break;
            case 'social':
                display.innerHTML = this.renderSocialAlgorithm(civilization);
                break;
            case 'response':
                display.innerHTML = this.renderResponseAlgorithm(civilization);
                break;
            default:
                display.innerHTML = '<p>请选择要查看的算法</p>';
        }
    }

    renderPersonalityAlgorithm(civilization) {
        return `
            <div class="algorithm-section">
                <h4>性格特征计算核心算法</h4>
                <div class="code-block">
                    <pre>
// 攻击性计算
aggression = baseValue(0.5)
    + (militaryFocus * 0.3)
    + (culturalAggression * 0.3)
    + (historicalConflicts * 0.2)
    + (resourcePressure * 0.2)

// 合作性计算
cooperation = baseValue(0.5)
    + (diplomaticTradition * 0.3)
    + (culturalOpenness * 0.3)
    + (allianceHistory * 0.2)
    + (economicInterdependence * 0.2)

// 创新性计算
innovation = baseValue(0.5)
    + (technologicalFocus * 0.3)
    + (educationLevel * 0.3)
    + (culturalCreativity * 0.2)
    + (resourceAvailability * 0.2)
                    </pre>
                </div>

                <h4>当前性格参数</h4>
                <div class="parameter-grid">
                    ${Object.entries(civilization.ai.personality).map(([trait, value]) => `
                        <div class="parameter-item">
                            <div class="parameter-header">
                                <span class="parameter-name">${this.formatTraitName(trait)}</span>
                                <span class="parameter-value">${Math.round(value * 100)}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${value * 100}%; background-color: ${this.getTraitColor(value)}">
                                    <div class="progress-glow"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderDecisionAlgorithm(civilization) {
        // 检查 decisionSystem 是否存在
        if (!civilization.ai || !civilization.ai.decisionSystem) {
            return `
                <div class="algorithm-section">
                    <h4>决策系统未初始化</h4>
                    <p>该文明的决策系统数据尚未完全初始化。</p>
                </div>
            `;
        }

        return `
            <div class="algorithm-section">
                <h4>决策系统核心算法</h4>
                <div class="code-block">
                    <pre>
// 事件评估
eventScore = (eventSeverity * 0.4) +
             (eventRelevance * 0.3) +
             (eventUrgency * 0.3)

// 响应倾向计算
responseTendency = {
    military: (aggression * 0.4) + (militaryStrength * 0.3) + (threatLevel * 0.3),
    diplomatic: (cooperation * 0.4) + (diplomaticInfluence * 0.3) + (allianceStrength * 0.3),
    economic: (economicStrength * 0.4) + (marketInfluence * 0.3) + (resourceControl * 0.3)
}

// 行动优先级
actionPriority = (responseTendency[actionType] * 0.4) +
                 (actionEffectiveness * 0.3) +
                 (resourceRequirement * 0.3)
                </pre>
            </div>

            <h4>当前决策参数</h4>
            <div class="parameter-grid">
                ${Object.entries(civilization.ai.decisionSystem.priorities || {}).map(([priority, value]) => `
                    <div class="parameter-item">
                        <div class="parameter-header">
                            <span class="parameter-name">${this.formatPriorityName(priority)}</span>
                            <span class="parameter-value" style="color: ${this.getProgressColor(value)}">
                                ${Math.round(value * 100)}%
                            </span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="
                                width: ${value * 100}%; 
                                background: linear-gradient(90deg, 
                                    ${this.getProgressColor(value)}88, 
                                    ${this.getProgressColor(value)}
                                )
                            ">
                                <div class="progress-glow"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <h4>决策影响因子</h4>
            <div class="factors-grid">
                ${this.renderDecisionFactors(civilization)}
            </div>
        </div>
    `;
    }

    renderDecisionFactors(civilization) {
        // 默认因子及其权重
        const factors = {
            eventWeight: 0.4,        // 事件权重
            personalityInfluence: 0.3, // 性格影响
            resourceConsideration: 0.3, // 资源考量
            historicalReference: 0.2,  // 历史参考
            culturalBias: 0.2,        // 文化偏好
            politicalFactor: 0.3,     // 政治因素
            economicFactor: 0.3,      // 经济因素
            militaryFactor: 0.3,      // 军事因素
            diplomaticFactor: 0.3,    // 交因素
            socialFactor: 0.2         // 会因素
        };

        return `
            <div class="factors-grid">
                ${Object.entries(factors).map(([factor, value]) => `
                    <div class="factor-item">
                        <div class="factor-header">
                            <span class="factor-icon">${this.getFactorIcon(factor)}</span>
                            <span class="factor-name">${this.formatFactorName(factor)}</span>
                            <span class="factor-value" style="color: ${this.getProgressColor(value)}">
                                ${Math.round(value * 100)}%
                            </span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="
                                width: ${value * 100}%; 
                                background: linear-gradient(90deg, 
                                    ${this.getProgressColor(value)}88, 
                                    ${this.getProgressColor(value)}
                                );
                            ">
                                <div class="progress-glow"></div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderSocialAlgorithm(civilization) {
        return `
            <div class="algorithm-section">
                <h4>社会系统算法</h4>
                <div class="code-block">
                    <pre>
// 社会阶级分布计算
upperClass = baseValue + governmentInfluence + economicFactor
middleClass = baseValue + educationFactor + economicDevelopment
workingClass = 1 - (upperClass + middleClass)

// 社会流动性计算
mobility = (educationLevel * 0.3) + 
          (economicFreedom * 0.3) + 
          (socialPolicy * 0.2) + 
          (politicalSystem * 0.2)

// 社会矛盾计算
conflictIntensity = (inequalityLevel * 0.4) + 
                    (socialPressure * 0.3) + 
                    (politicalTension * 0.3)
                    </pre>
                </div>

                <h4>当前社会参数</h4>
                <div class="parameter-grid">
                    ${Object.entries(civilization.systems.socialClass).map(([className, value]) => `
                        <div class="parameter-item">
                            <div class="parameter-header">
                                <span class="parameter-name">${this.formatClassName(className)}</span>
                                <span class="parameter-value" style="color: ${this.getProgressColor(value)}">
                                    ${Math.round(value * 100)}%
                                </span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="
                                    width: ${value * 100}%; 
                                    background: linear-gradient(90deg, 
                                        ${this.getProgressColor(value)}88, 
                                        ${this.getProgressColor(value)}
                                    )
                                ">
                                    <div class="progress-glow"></div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderResponseAlgorithm(civilization) {
        return `
            <div class="algorithm-section">
                <h4>响应生成算法</h4>
                <div class="code-block">
                    <pre>
// 响应框架生成
response = {
    analysis: generateEventAnalysis(event, personality),
    impact: calculateImpact(event, civilizationState),
    strategy: determineStrategy(analysis, impact, personality),
    actions: prioritizeActions(strategy, resources)
}

// 文明特征影响因子
traitInfluence = {
    cultural: calculateCulturalInfluence(traits),
    political: calculatePoliticalInfluence(traits),
    economic: calculateEconomicInfluence(traits)
}

// 最终响应调整
finalResponse = adjustResponseByTraits(response, traitInfluence)
                    </pre>
                </div>

                <h4>当前响应参数</h4>
                <div class="parameter-grid">
                    ${Object.entries(civilization.ai.labels.core).map(([category, labels]) => `
                        <div class="parameter-item">
                            <div class="parameter-header">
                                <span class="parameter-name">${this.formatCategoryName(category)}</span>
                            </div>
                            <div class="labels-container">
                                ${labels.map(label => `
                                    <span class="label-tag">${label}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    formatPriorityName(priority) {
        const nameMap = {
            stability: "稳定优先",
            development: "发展优先",
            expansion: "扩张优先",
            culture: "文化优先",
            military: "军事优先",
            diplomacy: "外交优先"
        };
        return nameMap[priority] || priority;
    }

    formatFactorName(factor) {
        const nameMap = {
            eventWeight: "事件权重",
            personalityInfluence: "性格影响",
            resourceConsideration: "资源考量",
            historicalReference: "历史参考",
            culturalBias: "文化偏好",
            politicalFactor: "政治因素",
            economicFactor: "经济因素",
            militaryFactor: "军事因素",
            diplomaticFactor: "外交因素",
            socialFactor: "社会因素",
            religiousFactor: "宗教因素",
            technologicalFactor: "科技因素",
            environmentalFactor: "环境因素",
            populationFactor: "人口因素",
            geographicFactor: "地理因素"
        };
        return nameMap[factor] || factor;
    }

    formatFactorValue(value) {
        return `${Math.round(value * 100)}%`;
    }

    getFactorColor(value) {
        if (value >= 0.8) return '#00C853';      // 翠绿
        if (value >= 0.6) return '#64DD17';      // 亮绿
        if (value >= 0.4) return '#FFD600';      // 金黄
        if (value >= 0.2) return '#FF9100';      // 亮橙
        return '#FF1744';                        // 亮红
    }

    getFactorIcon(factor) {
        const iconMap = {
            eventWeight: "⚖️",
            personalityInfluence: "🧠",
            resourceConsideration: "💎",
            historicalReference: "📚",
            culturalBias: "🎭",
            politicalFactor: "🏛️",
            economicFactor: "💰",
            militaryFactor: "⚔️",
            diplomaticFactor: "🤝",
            socialFactor: "👥",
            religiousFactor: "🙏",
            technologicalFactor: "🔬",
            environmentalFactor: "🌍",
            populationFactor: "👥",
            geographicFactor: "🗺️"
        };
        return iconMap[factor] || "📊";
    }

    renderFactorItem(factor, value) {
        return `
            <div class="factor-item">
                <div class="factor-header">
                    <span class="factor-icon">${this.getFactorIcon(factor)}</span>
                    <span class="factor-name">${this.formatFactorName(factor)}</span>
                    <span class="factor-value" style="color: ${this.getFactorColor(value)}">
                        ${Math.round(value * 100)}%
                    </span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="
                        width: ${value * 100}%; 
                        background: linear-gradient(90deg, 
                            ${this.getFactorColor(value)}88, 
                            ${this.getFactorColor(value)}
                        )
                    ">
                        <div class="progress-glow"></div>
                    </div>
                </div>
            </div>
        `;
    }

    getPoliticalCentralization(civ) {
        // 这里需要实现获取政治体系集中度的逻辑
        return 0.8; // 示例值
    }

    getMarketization(civ) {
        // 这里需要实现获取经济体系市场化程度的逻辑
        return 0.7; // 示例值
    }

    getCulturalValueIcon(value) {
        // 这里需要实现获取文化价值观图标的逻辑
        return '🎭'; // 示例值
    }

    getReligiousInfluence(civ, belief) {
        // 这里需要实现获取宗教信仰影响力的逻辑
        return 0.9; // 示例值
    }

    getReligionIcon(belief) {
        // 这里需要实现获取宗教信仰图标的逻辑
        return '🙏'; // 示例值
    }

    getReligionColor(belief) {
        // 这里需要实现获取宗教信仰颜色的逻辑
        return '#FFD700'; // 示例值
    }

    getTechIcon(tech) {
        // 这里需要实现获取技术重点图标的逻辑
        return '🔬'; // 示例值
    }

    getTechProgress(civ, tech) {
        // 这里需要实现获取技术重点进度的逻辑
        return 0.9; // 示例值
    }

    getTechColor(tech) {
        // 这里需要实现获取技术重点颜色的逻辑
        return '#FFD700'; // 示例值
    }
}

// 确保在 DOM 加载完成后初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    try {
        window.game = new Game();
        console.log('Game initialized successfully');
    } catch (error) {
        console.error('Game initialization error:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = `初始化错误: ${error.message}`;
        document.body.appendChild(errorDiv);
    }
}); 