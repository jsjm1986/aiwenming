class Civilization {
    constructor(name, color) {
        this.name = name;
        this.color = color;
        
        // 初始化traits
        this.initializeTraits();
        // 根据文明特征设置基础属性
        this.setInitialStats();
        // 初始化AI
        this.ai = new CivilizationAI(this);
    }

    initializeTraits() {
        // 根据文明名称设置特征
        switch(this.name) {
            case "华夏文明":
                this.traits = {
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
                    }
                };
                break;

            case "欧洲文明":
                this.traits = {
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
                        "���疗技术",
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
                    }
                };
                break;

            case "伊斯兰文明":
                this.traits = {
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
                    }
                };
                break;

            case "印度文明":
                this.traits = {
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
                    }
                };
                break;

            case "非洲文明":
                this.traits = {
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
                        "生态保护",
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
                    }
                };
                break;

            case "美洲文明":
                this.traits = {
                    governmentType: "联邦制度",
                    economicSystem: "自由市场经济",
                    culturalValues: [
                        "个人自由",
                        "民主制度",
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
                    }
                };
                break;

            case "大洋洲文明":
                this.traits = {
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
                    }
                };
                break;

            default:
                this.traits = {
                    governmentType: "未定义",
                    economicSystem: "未定义",
                    culturalValues: [],
                    technologicalFocus: [],
                    religiousBeliefs: [],
                    socialStructure: {
                        type: "未定义",
                        characteristics: []
                    }
                };
                break;
        }
    }

    setInitialStats() {
        // 根据文明名称设置不同的初始值
        switch(this.name) {
            case "华夏文明":
                this.population = 1400000000;  // 14亿人口
                this.territory = 9600000;      // 960万平方公里
                this.development = {
                    technology: 0.85,          // 科技发展水平
                    economy: 0.82,             // 经济发展水平
                    culture: 0.90,             // 文化发展水平
                    military: 0.88,            // 军事发展水平
                    diplomacy: 0.75            // 外交影响力
                };
                this.society = {
                    stability: 0.85,           // 社会稳定性
                    happiness: 0.75,           // 民众幸福度
                    education: 0.82,           // 教育水平
                    healthcare: 0.80           // 医疗水平
                };
                this.resources = {
                    food: 0.85,                // 粮食资源
                    minerals: 0.80,            // 矿产资源
                    energy: 0.75,              // 能源资源
                    knowledge: 0.85,           // 知识储备
                    influence: 0.80            // 国际影响力
                };
                break;

            case "欧洲文明":
                this.population = 750000000;   // 7.5亿人口
                this.territory = 10180000;     // 1018万平方公里
                this.development = {
                    technology: 0.90,
                    economy: 0.88,
                    culture: 0.85,
                    military: 0.85,
                    diplomacy: 0.90
                };
                this.society = {
                    stability: 0.82,
                    happiness: 0.85,
                    education: 0.90,
                    healthcare: 0.88
                };
                this.resources = {
                    food: 0.82,
                    minerals: 0.75,
                    energy: 0.70,
                    knowledge: 0.90,
                    influence: 0.90
                };
                break;

            case "伊斯兰文明":
                this.population = 1800000000;  // 18亿人口
                this.territory = 13000000;     // 1300万平方公里
                this.development = {
                    technology: 0.70,
                    economy: 0.75,
                    culture: 0.80,
                    military: 0.75,
                    diplomacy: 0.70
                };
                this.society = {
                    stability: 0.65,
                    happiness: 0.70,
                    education: 0.65,
                    healthcare: 0.70
                };
                this.resources = {
                    food: 0.70,
                    minerals: 0.85,
                    energy: 0.90,
                    knowledge: 0.75,
                    influence: 0.75
                };
                break;

            case "印度文明":
                this.population = 1380000000;  // 13.8亿人口
                this.territory = 3287000;      // 328.7万平方公里
                this.development = {
                    technology: 0.80,
                    economy: 0.75,
                    culture: 0.85,
                    military: 0.75,
                    diplomacy: 0.70
                };
                this.society = {
                    stability: 0.70,
                    happiness: 0.65,
                    education: 0.75,
                    healthcare: 0.65
                };
                this.resources = {
                    food: 0.75,
                    minerals: 0.70,
                    energy: 0.65,
                    knowledge: 0.85,
                    influence: 0.70
                };
                break;

            case "非洲文明":
                this.population = 1300000000;  // 13亿人口
                this.territory = 30370000;     // 3037万平方公里
                this.development = {
                    technology: 0.50,
                    economy: 0.45,
                    culture: 0.75,
                    military: 0.50,
                    diplomacy: 0.45
                };
                this.society = {
                    stability: 0.50,
                    happiness: 0.55,
                    education: 0.45,
                    healthcare: 0.40
                };
                this.resources = {
                    food: 0.60,
                    minerals: 0.85,
                    energy: 0.80,
                    knowledge: 0.55,
                    influence: 0.45
                };
                break;

            case "美洲文明":
                this.population = 1000000000;  // 10亿人口
                this.territory = 42550000;     // 4255万平方公里
                this.development = {
                    technology: 0.95,
                    economy: 0.90,
                    culture: 0.85,
                    military: 0.95,
                    diplomacy: 0.90
                };
                this.society = {
                    stability: 0.80,
                    happiness: 0.85,
                    education: 0.90,
                    healthcare: 0.85
                };
                this.resources = {
                    food: 0.90,
                    minerals: 0.85,
                    energy: 0.85,
                    knowledge: 0.95,
                    influence: 0.95
                };
                break;

            case "大洋洲文明":
                this.population = 42000000;    // 4200万人口
                this.territory = 8500000;      // 850万平方公里
                this.development = {
                    technology: 0.85,
                    economy: 0.85,
                    culture: 0.80,
                    military: 0.75,
                    diplomacy: 0.80
                };
                this.society = {
                    stability: 0.90,
                    happiness: 0.90,
                    education: 0.90,
                    healthcare: 0.90
                };
                this.resources = {
                    food: 0.85,
                    minerals: 0.90,
                    energy: 0.80,
                    knowledge: 0.85,
                    influence: 0.75
                };
                break;

            default:
                // 默认值
                this.setDefaultStats();
                break;
        }

        // 初始化社会系统
        this.initializeSocialSystems();
    }

    initializeSocialSystems() {
        // 社会系统
        this.systems = {
            // 社会阶级结构
            socialClass: {
                upperClass: 0.1,      // 上层阶级占比
                middleClass: 0.3,     // 中产阶级占比
                workingClass: 0.6,    // 工人阶级占比
                mobility: 0.4         // 社会流动性
            },
            // 社会矛盾
            conflicts: {
                class: {              // 阶级矛盾
                    intensity: 0.3,   // 矛盾强度
                    awareness: 0.4    // 意识程度
                },
                ethnic: {             // 族群矛盾
                    intensity: 0.2,
                    discrimination: 0.3
                },
                ideological: {        // 意识形态矛盾
                    intensity: 0.4,
                    polarization: 0.5
                },
                economic: {           // 经济矛盾
                    intensity: 0.5,
                    inequality: 0.6
                }
            }
        };

        // 根据文明特征调整社会系统参数
        this.adjustSocialSystemsByTraits();
    }

    adjustSocialSystemsByTraits() {
        // 检查 traits 是否存在
        if (!this.traits) {
            console.warn(`No traits defined for civilization: ${this.name}`);
            return;
        }

        // 根据文明特征调整社会系统参数
        if (this.traits.governmentType && this.traits.governmentType.includes('民主')) {
            this.systems.socialClass.mobility += 0.1;
            this.systems.conflicts.class.intensity -= 0.1;
        }
        if (this.traits.economicSystem && this.traits.economicSystem.includes('市场')) {
            this.systems.socialClass.middleClass += 0.1;
            this.systems.conflicts.economic.inequality += 0.1;
        }

        // 根据文化价值观调整
        if (this.traits.culturalValues) {
            if (this.traits.culturalValues.includes('平等')) {
                this.systems.socialClass.mobility += 0.1;
                this.systems.conflicts.class.intensity -= 0.1;
            }
            if (this.traits.culturalValues.includes('传统')) {
                this.systems.socialClass.mobility -= 0.1;
                this.systems.conflicts.ideological.intensity += 0.1;
            }
        }

        // 根据社会结构调整
        if (this.traits.socialStructure && this.traits.socialStructure.type) {
            switch (this.traits.socialStructure.type) {
                case "科层制":
                    this.systems.socialClass.upperClass += 0.05;
                    this.systems.conflicts.class.intensity += 0.1;
                    break;
                case "多元社会":
                    this.systems.socialClass.middleClass += 0.1;
                    this.systems.conflicts.ethnic.intensity += 0.1;
                    break;
                case "部落社会":
                    this.systems.socialClass.mobility -= 0.1;
                    this.systems.conflicts.ethnic.intensity += 0.2;
                    break;
            }
        }

        // 确保所有值都在 0-1 范围内
        Object.keys(this.systems.socialClass).forEach(key => {
            this.systems.socialClass[key] = Math.max(0, Math.min(1, this.systems.socialClass[key]));
        });

        Object.keys(this.systems.conflicts).forEach(type => {
            Object.keys(this.systems.conflicts[type]).forEach(key => {
                this.systems.conflicts[type][key] = Math.max(0, Math.min(1, this.systems.conflicts[type][key]));
            });
        });
    }

    setDefaultStats() {
        this.population = 1000000;
        this.territory = 100000;
        this.development = {
            technology: 0.5,
            economy: 0.5,
            culture: 0.5,
            military: 0.5,
            diplomacy: 0.5
        };
        this.society = {
            stability: 0.5,
            happiness: 0.5,
            education: 0.5,
            healthcare: 0.5
        };
        this.resources = {
            food: 0.5,
            minerals: 0.5,
            energy: 0.5,
            knowledge: 0.5,
            influence: 0.5
        };
    }

    update() {
        // 更新人口
        this.updatePopulation();
        
        // 更新资源
        this.updateResources();
        
        // 更新发展指标
        this.updateDevelopment();
        
        // 更新社会状态
        this.updateSociety();
        
        // 更新AI决策
        if (this.ai) {
            this.ai.update();
        }
    }

    updatePopulation() {
        // 简单的人口增长模型
        const growthRate = 0.001; // 0.1% 每次更新
        this.population *= (1 + growthRate);
    }

    updateResources() {
        // 资源变化逻辑
        Object.keys(this.resources).forEach(resource => {
            const change = (Math.random() - 0.5) * 0.1; // -0.05 到 0.05 的随机变化
            this.resources[resource] = Math.max(0, Math.min(1, this.resources[resource] + change));
        });
    }

    updateDevelopment() {
        // 发展指标变化逻辑
        Object.keys(this.development).forEach(indicator => {
            const change = (Math.random() - 0.5) * 0.1;
            this.development[indicator] = Math.max(0, Math.min(1, this.development[indicator] + change));
        });
    }

    updateSociety() {
        // 社会状态变化逻辑
        Object.keys(this.society).forEach(indicator => {
            const change = (Math.random() - 0.5) * 0.1;
            this.society[indicator] = Math.max(0, Math.min(1, this.society[indicator] + change));
        });
    }

    getState() {
        return {
            name: this.name,
            traits: this.traits,
            development: this.development,
            society: this.society,
            resources: this.resources,
            systems: this.systems,
            ai: this.ai ? {
                personality: this.ai.personality,
                labels: this.ai.labels
            } : null
        };
    }
} 