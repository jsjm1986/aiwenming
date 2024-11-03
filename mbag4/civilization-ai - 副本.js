class CivilizationAI {
    constructor(civilization) {
        this.civilization = civilization;
        this.personality = this.initializePersonality();
        this.memory = {
            recentEvents: [],
            relationships: {},
            strategies: [],
            traumaticEvents: []
        };

        // 添加文明标签系统
        this.labels = this.initializeLabels();
    }

    initializePersonality() {
        // 基于文明特征初始化AI个性
        const traits = this.civilization.traits;
        
        switch(this.civilization.name) {
            case "华夏文明":
                return {
                    mainTraits: {
                        pragmatism: 0.8,        // 实用主义倾向
                        collectivism: 0.9,      // 集体主义倾向
                        harmony: 0.85,          // 和谐理念
                        tradition: 0.75         // 传统价值观
                    },
                    decisionStyle: {
                        cautious: 0.7,          // 谨慎决策
                        longTerm: 0.9,          // 长远规划
                        consensus: 0.8          // 共识决策
                    },
                    priorities: {
                        stability: 0.9,         // 社会稳定
                        economicGrowth: 0.8,    // 经济发展
                        culturalPreservation: 0.7, // 文化保护
                        technologicalAdvancement: 0.75 // 科技进步
                    },
                    reactionPatterns: {
                        toConflict: "mediation",      // 冲突处理方式
                        toChange: "gradual",          // 变革态度
                        toPressure: "resilient"       // 压力应对
                    }
                };

            case "欧洲文明":
                return {
                    mainTraits: {
                        individualism: 0.8,     // 个人主义
                        rationalism: 0.85,      // 理性主义
                        innovation: 0.8,        // 创新精神
                        competition: 0.75       // 竞争意识
                    },
                    decisionStyle: {
                        democratic: 0.9,        // 民主决策
                        analytical: 0.85,       // 分析性思维
                        debate: 0.8             // 辩论文化
                    },
                    priorities: {
                        individualRights: 0.9,  // 个人权利
                        marketEconomy: 0.85,    // 市场经济
                        scientificProgress: 0.8, // 科学进步
                        democraticValues: 0.9    // 民主价值
                    },
                    reactionPatterns: {
                        toConflict: "legal",         // 法律途径
                        toChange: "progressive",      // 进步主义
                        toPressure: "adaptive"        // 适应性强
                    }
                };

            case "伊斯兰文明":
                return {
                    mainTraits: {
                        faith: 0.9,            // 宗教信仰
                        community: 0.85,       // 社群意识
                        tradition: 0.8,        // 传统价值
                        honor: 0.8             // 荣誉观念
                    },
                    decisionStyle: {
                        religious: 0.9,        // 宗教导向
                        communal: 0.85,        // 社群共识
                        hierarchical: 0.8      // 等级制度
                    },
                    priorities: {
                        religiousValues: 0.9,  // 宗教价值
                        socialCohesion: 0.85,  // 社会凝聚
                        moralStandards: 0.8,   // 道德标准
                        tradition: 0.8         // 传统维护
                    },
                    reactionPatterns: {
                        toConflict: "principled",    // 原则立场
                        toChange: "conservative",     // 保守态度
                        toPressure: "resistant"       // 抵抗倾向
                    }
                };

            // ... 为其他文明添加类似的个性特征 ...
            default:
                return {
                    mainTraits: {
                        pragmatism: 0.5,
                        collectivism: 0.5,
                        harmony: 0.5,
                        tradition: 0.5
                    },
                    decisionStyle: {
                        cautious: 0.5,
                        longTerm: 0.5,
                        consensus: 0.5
                    },
                    priorities: {
                        stability: 0.5,
                        economicGrowth: 0.5,
                        culturalPreservation: 0.5,
                        technologicalAdvancement: 0.5
                    },
                    reactionPatterns: {
                        toConflict: "balanced",
                        toChange: "moderate",
                        toPressure: "adaptive"
                    }
                };
        }
    }

    initializeLabels() {
        // 基于文明名称初始化特定的标签系统
        switch(this.civilization.name) {
            case "华夏文明":
                return {
                    core: {
                        identity: ["儒家文明", "东方文明", "农耕文明"],
                        values: ["中庸之道", "礼仪之邦", "天人合一"],
                        philosophy: ["儒家思想", "道家思想", "法家思想"]
                    },
                    political: {
                        system: ["中央集权", "科举制度", "官僚体系"],
                        ideology: ["大一统", "天下观", "修齐治平"],
                        governance: ["德治", "礼治", "法治"]
                    },
                    social: {
                        structure: ["宗族社会", "士农工商", "家国同构"],
                        values: ["孝道", "仁义", "忠信"],
                        norms: ["关系本位", "面子文化", "等级秩序"]
                    },
                    economic: {
                        model: ["计划经济", "市场经济", "混合经济"],
                        focus: ["实体经济", "科技创新", "内循环"],
                        principles: ["共同富裕", "改革开放", "产业升级"]
                    },
                    cultural: {
                        traditions: ["礼仪传统", "节庆文化", "饮食文化"],
                        arts: ["书法绘画", "诗词文学", "戏曲艺术"],
                        beliefs: ["天人合一", "阴阳五行", "风水文化"]
                    },
                    development: {
                        challenges: ["人口压力", "环境污染", "区域发展"],
                        priorities: ["科技创新", "产业升级", "民生改善"],
                        opportunities: ["市场规模", "人才资源", "文化影响"]
                    },
                    modernization: {
                        path: ["中国特色", "改革开放", "创新驱动"],
                        goals: ["全面小康", "现代化强国", "民族复兴"],
                        methods: ["制度创新", "科技引领", "文化自信"]
                    },
                    powerStructure: {
                        ruling: {
                            characteristics: ["科层官僚", "精英治理", "中央集权"],
                            methods: ["科举选拔", "任人唯贤", "官僚考核"],
                            interests: ["维护统一", "社会稳定", "经济发展"]
                        },
                        ruled: {
                            classes: ["农民阶层", "工商阶层", "知识分子"],
                            demands: ["民生改善", "社会公平", "政治参与"],
                            resistance: ["税负反抗", "知识批判", "民间结社"]
                        },
                        conflicts: {
                            structural: ["官民矛盾", "城乡差距", "阶层固化"],
                            economic: ["税收负担", "土地问题", "贫富分化"],
                            political: ["参政诉求", "权力制约", "言论自由"]
                        },
                        control: {
                            mechanisms: ["行政管理", "思想教化", "法制约束"],
                            institutions: ["党政体系", "教育系统", "社会组织"],
                            challenges: ["腐败问题", "效率低下", "民怨积累"]
                        }
                    },
                    socialTensions: {
                        economic: {
                            inequality: ["收入差距", "机会不均", "资源垄断"],
                            exploitation: ["劳资矛盾", "土地征用", "金融压榨"],
                            distribution: ["福利分配", "教育资源", "医疗资源"]
                        },
                        political: {
                            representation: ["政治参与", "利益表达", "决策影响"],
                            rights: ["公民权利", "维权行动", "社会运动"],
                            governance: ["基层民主", "政务公开", "权力监督"]
                        },
                        social: {
                            mobility: ["阶层固化", "教育公平", "就业歧视"],
                            identity: ["城乡身份", "户籍制度", "社会认同"],
                            culture: ["价值冲突", "代际差异", "文化认同"]
                        }
                    }
                };

            case "欧洲文明":
                return {
                    core: {
                        identity: ["基督教文明", "西方文明", "工业文明"],
                        values: ["个人主义", "理性主义", "人权自由"],
                        philosophy: ["启蒙思想", "人文主义", "科学精神"]
                    },
                    political: {
                        system: ["民主制度", "三权分立", "多党制"],
                        ideology: ["自由主义", "社会民主", "保守主义"],
                        governance: ["法治", "公民社会", "福利国家"]
                    },
                    social: {
                        structure: ["公民社会", "中产阶级", "社会流动"],
                        values: ["个人权利", "平等自由", "多元包容"],
                        norms: ["契约精神", "理性思维", "公共讨论"]
                    },
                    economic: {
                        model: ["市场经济", "资本主义", "福利经济"],
                        focus: ["技术创新", "金融服务", "知识经济"],
                        principles: ["自由竞争", "产权保护", "市场调节"]
                    },
                    powerStructure: {
                        ruling: {
                            characteristics: ["民主制度", "多党政治", "法治传统"],
                            methods: ["选举制度", "议会监督", "司法独立"],
                            interests: ["维护秩序", "经济增长", "社会福利"]
                        },
                        ruled: {
                            classes: ["中产阶级", "工人阶级", "少数族裔"],
                            demands: ["权利保障", "福利待遇", "环境保护"],
                            resistance: ["社会运动", "工会组织", "公民抗议"]
                        },
                        conflicts: {
                            structural: ["阶级对立", "种族歧视", "移民问题"],
                            economic: ["财富集中", "就业危机", "福利削减"],
                            political: ["政治极化", "民粹主义", "认同危机"]
                        }
                    }
                };

            case "伊斯兰文明":
                return {
                    core: {
                        identity: ["伊斯兰文明", "宗教文明", "沙漠文明"],
                        values: ["信仰至上", "宗教法治", "道德伦理"],
                        philosophy: ["伊斯兰教义", "苏菲主义", "宗教哲学"]
                    },
                    political: {
                        system: ["神权政治", "宗教法制", "部落联盟"],
                        ideology: ["泛伊斯兰主���", "宗教民族主义", "伊斯兰复兴"],
                        governance: ["教法统治", "宗教法庭", "社群自治"]
                    },
                    social: {
                        structure: ["宗教社群", "部落制度", "家族网络"],
                        values: ["宗教信仰", "家族荣誉", "群体认同"],
                        norms: ["性别分工", "宗教礼仪", "社会道德"]
                    },
                    economic: {
                        model: ["伊斯兰金融", "资源经济", "混合经济"],
                        focus: ["石油工业", "清真产业", "传统手工业"],
                        principles: ["无利息金融", "财富再分配", "道德经济"]
                    }
                };

            case "印度文明":
                return {
                    core: {
                        identity: ["印度文明", "河流文明", "精神文明"],
                        values: ["精神解脱", "轮回转世", "业力因果"],
                        philosophy: ["婆罗门教", "佛教思想", "瑜伽哲学"]
                    },
                    political: {
                        system: ["联邦民主", "种姓制度", "村落自治"],
                        ideology: ["世俗主义", "多元民主", "非暴力"],
                        governance: ["议会制度", "地方自治", "多党联盟"]
                    },
                    social: {
                        structure: ["种姓制度", "家族制度", "村落共同体"],
                        values: ["灵性追求", "家庭观念", "多元共存"],
                        norms: ["宗教仪式", "社会等级", "文化传统"]
                    },
                    economic: {
                        model: ["混合经济", "服务经济", "知识经济"],
                        focus: ["IT产业", "服务外包", "农业生产"],
                        principles: ["包容性增长", "可持续发展", "技术创新"]
                    }
                };

            case "非洲文明":
                return {
                    core: {
                        identity: ["非洲文明", "部落文明", "自然文明"],
                        values: ["社群精神", "自然和谐", "口述传统"],
                        philosophy: ["泛非主义", "部落智慧", "生态哲学"]
                    },
                    political: {
                        system: ["部落联邦", "酋长制度", "现代民主"],
                        ideology: ["泛非主义", "民族解放", "发展主义"],
                        governance: ["部落议会", "传统权威", "现代政府"]
                    },
                    social: {
                        structure: ["部落社会", "年龄等级", "扩展家庭"],
                        values: ["集体主义", "尊老传统", "互助精神"],
                        norms: ["部落习俗", "祖先崇拜", "社群认同"]
                    },
                    economic: {
                        model: ["混合经济", "资源经济", "发展经济"],
                        focus: ["资源开发", "农业发展", "可持续发展"],
                        principles: ["共同发展", "资源主权", "区域合作"]
                    },
                    cultural: {
                        traditions: ["口述历史", "部落艺术", "传统仪式"],
                        arts: ["音乐舞蹈", "雕塑艺术", "面具文化"],
                        beliefs: ["自然崇拜", "祖先信仰", "现代宗教"]
                    },
                    development: {
                        challenges: ["贫困问题", "教育发展", "卫生医疗"],
                        priorities: ["基础设施", "教育普及", "经济发展"],
                        opportunities: ["资源优势", "人口红利", "文化遗产"]
                    }
                };

            case "美洲文明":
                return {
                    core: {
                        identity: ["新大陆文明", "移民文明", "技术文明"],
                        values: ["自由民主", "个人主义", "创新精神"],
                        philosophy: ["实用主义", "多元主义", "科技至上"]
                    },
                    political: {
                        system: ["联邦制度", "总统制", "两党制"],
                        ideology: ["自由主义", "新保守主义", "全球主义"],
                        governance: ["权力分立", "州权自治", "民主监督"]
                    },
                    social: {
                        structure: ["移民社会", "阶级流动", "多���文化"],
                        values: ["机会平等", "成功导向", "个人奋斗"],
                        norms: ["政治正确", "种族平等", "性别平等"]
                    },
                    economic: {
                        model: ["自由市场", "创新经济", "金融资本"],
                        focus: ["高科技", "服务业", "创新创业"],
                        principles: ["市场竞争", "创新驱动", "全球化"]
                    },
                    cultural: {
                        traditions: ["移民文化", "创新传统", "消费主义"],
                        arts: ["大众文化", "好莱坞", "流行音乐"],
                        beliefs: ["世俗主义", "多元信仰", "科技信仰"]
                    },
                    development: {
                        challenges: ["贫富差距", "种族问题", "环境保护"],
                        priorities: ["技术创新", "军事优势", "经济增长"],
                        opportunities: ["创新能力", "人才吸引", "全球影响"]
                    }
                };

            case "大洋洲文明":
                return {
                    core: {
                        identity: ["海洋文明", "环保文明", "多元文明"],
                        values: ["环境保护", "多元包容", "社会公平"],
                        philosophy: ["生态主义", "原住民智慧", "和谐发展"]
                    },
                    political: {
                        system: ["议会民主", "联邦制度", "多党制"],
                        ideology: ["环保主义", "多元文化", "社会民主"],
                        governance: ["共识政治", "原住民权利", "环境治理"]
                    },
                    social: {
                        structure: ["多元社会", "城市化", "原住民社区"],
                        values: ["平等包容", "环境意识", "生活品质"],
                        norms: ["多元文化", "户外生活", "环保行为"]
                    },
                    economic: {
                        model: ["混合经济", "资源经济", "服务经济"],
                        focus: ["矿产资源", "旅游业", "清洁能源"],
                        principles: ["可持续发展", "环境保护", "公平贸易"]
                    },
                    cultural: {
                        traditions: ["原住民文化", "户外运动", "海洋文化"],
                        arts: ["原住民艺术", "现代艺术", "环境艺术"],
                        beliefs: ["自然崇拜", "现代信仰", "世俗主义"]
                    },
                    development: {
                        challenges: ["气候变化", "人口老龄化", "资源依赖"],
                        priorities: ["环境保护", "社会福利", "教育发展"],
                        opportunities: ["清洁能源", "生态旅游", "科技创新"]
                    }
                };

            // ... 其他文明的标签系统 ...
        }
    }

    // 在makeDecision方法中使用标签系统
    makeDecision(event, worldState) {
        const analysis = this.analyzeEvent(event);
        const conflictAnalysis = this.analyzeRulingConflicts(event);
        
        // 整合分析结果
        const integratedAnalysis = {
            ...analysis,
            rulingConflicts: conflictAnalysis
        };
        
        const strategy = this.determineStrategy(integratedAnalysis, worldState);
        const response = this.formulateResponse(strategy);
        
        // 基于统治矛盾调整响应
        const adjustedResponse = this.adjustResponseForConflicts(response, conflictAnalysis);
        
        this.updateMemory(event, adjustedResponse);
        return adjustedResponse;
    }

    adjustResponseForConflicts(response, conflictAnalysis) {
        return {
            ...response,
            governance: {
                policies: this.formulateConflictPolicies(conflictAnalysis),
                reforms: this.planReforms(conflictAnalysis),
                concessions: this.determineConcessions(conflictAnalysis)
            },
            socialMeasures: {
                economicAdjustments: this.planEconomicAdjustments(conflictAnalysis),
                socialPrograms: this.designSocialPrograms(conflictAnalysis),
                politicalReforms: this.planPoliticalReforms(conflictAnalysis)
            },
            conflictManagement: {
                immediateActions: this.planImmediateActions(conflictAnalysis),
                longTermStrategies: this.developLongTermStrategies(conflictAnalysis),
                preventiveMeasures: this.designPreventiveMeasures(conflictAnalysis)
            }
        };
    }

    formulateConflictPolicies(analysis) {
        return {
            immediate: this.prioritizeImmediatePolicies(analysis),
            structural: this.developStructuralPolicies(analysis),
            preventive: this.createPreventivePolicies(analysis)
        };
    }

    planReforms(analysis) {
        const { powerDynamics, socialConflicts } = analysis;
        
        return {
            political: this.determinePoliticalReforms(powerDynamics),
            economic: this.determineEconomicReforms(socialConflicts.economic),
            social: this.determineSocialReforms(socialConflicts.social)
        };
    }

    determineConcessions(analysis) {
        const { rulingConflicts } = analysis;
        
        return {
            immediate: this.identifyImmediateConcessions(rulingConflicts),
            negotiable: this.identifyNegotiableItems(rulingConflicts),
            limits: this.determineRedLines(rulingConflicts)
        };
    }

    analyzeRulingConflicts(event) {
        const powerStructure = this.labels.powerStructure;
        const socialTensions = this.labels.socialTensions;
        
        return {
            powerDynamics: this.analyzePowerDynamics(event, powerStructure),
            socialConflicts: this.analyzeSocialConflicts(event, socialTensions),
            potentialRisks: this.assessRisks(event, powerStructure, socialTensions)
        };
    }

    analyzePowerDynamics(event, powerStructure) {
        return {
            rulingMethods: {
                effectiveness: this.evaluateMethodEffectiveness(event, powerStructure.ruling.methods),
                legitimacy: this.evaluateLegitimacy(event, powerStructure.ruling.characteristics),
                opposition: this.evaluateOpposition(event, powerStructure.ruled.resistance)
            },
            ruledResponse: {
                compliance: this.evaluateCompliance(event, powerStructure.ruled.classes),
                resistance: this.evaluateResistance(event, powerStructure.ruled.demands),
                organization: this.evaluateOrganization(event, powerStructure.ruled.resistance)
            }
        };
    }

    analyzeSocialConflicts(event, socialTensions) {
        return {
            economic: this.analyzeEconomicTensions(event, socialTensions.economic),
            political: this.analyzePoliticalTensions(event, socialTensions.political),
            social: this.analyzeSocialTensions(event, socialTensions.social)
        };
    }

    // 添加辅助方法来评估个性影响
    evaluatePersonalityImpact(event) {
        const personality = this.personality;
        return {
            mainTraitsImpact: this.calculateMainTraitsImpact(event, personality.mainTraits),
            decisionStyleInfluence: this.calculateDecisionStyleInfluence(personality.decisionStyle),
            priorityAlignment: this.calculatePriorityAlignment(event, personality.priorities),
            reactionTendency: this.calculateReactionTendency(event, personality.reactionPatterns)
        };
    }

    calculateMainTraitsImpact(event, traits) {
        // 计算主要特征对事件响应的影响
        return Object.entries(traits).reduce((impact, [trait, value]) => {
            impact[trait] = this.calculateTraitImpact(event, trait, value);
            return impact;
        }, {});
    }

    calculateDecisionStyleInfluence(decisionStyle) {
        // 计算决策风格的影响
        return {
            approachType: this.determineApproachType(decisionStyle),
            timeFrame: this.determineTimeFrame(decisionStyle),
            consultationLevel: this.determineConsultationLevel(decisionStyle)
        };
    }

    calculatePriorityAlignment(event, priorities) {
        // 计算事件与优先级的匹配度
        return Object.entries(priorities).reduce((alignment, [priority, value]) => {
            alignment[priority] = this.calculateAlignmentScore(event, priority, value);
            return alignment;
        }, {});
    }

    calculateReactionTendency(event, patterns) {
        // 计算反应倾向
        return {
            conflictHandling: this.determineConflictHandling(event, patterns.toConflict),
            changeManagement: this.determineChangeManagement(patterns.toChange),
            pressureResponse: this.determinePressureResponse(patterns.toPressure)
        };
    }
} 