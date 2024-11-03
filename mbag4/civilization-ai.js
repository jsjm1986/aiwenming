class CivilizationAI {
    constructor(civilization) {
        this.civilization = civilization;
        this.labels = this.initializeLabels();
        this.personality = this.generatePersonality();
        this.memory = {
            events: [],
            decisions: [],
            relationships: new Map(),
            learningHistory: []
        };

        // 首先初始化决策系统
        this.decisionSystem = {
            priorities: this.initializePriorities(),
            preferences: this.initializePreferences()
        };

        // 然后初始化策略
        this.strategies = this.initializeStrategies();
    }

    initializeLabels() {
        // 根据文明特征初始化标签
        const traits = this.civilization.traits;
        return {
            core: {
                ideology: this.generateIdeologyLabels(traits),
                culture: this.generateCultureLabels(traits),
                governance: this.generateGovernanceLabels(traits),
                economy: this.generateEconomyLabels(traits)
            },
            dynamic: {
                current_focus: [],
                emerging_trends: [],
                challenges: []
            }
        };
    }

    generateIdeologyLabels(traits) {
        const labels = [];
        
        // 政治意识形态
        if (traits.governmentType.includes('中央集权')) {
            labels.push('集权主义');
            labels.push('等级制度');
            labels.push('官僚体系');
        } else if (traits.governmentType.includes('民主')) {
            labels.push('民主主义');
            labels.push('自由主义');
            labels.push('多元化');
        } else if (traits.governmentType.includes('联邦')) {
            labels.push('联邦制');
            labels.push('分权制度');
            labels.push('地方自治');
        }

        // 经济意识形态
        if (traits.economicSystem.includes('混合')) {
            labels.push('混合经济');
            labels.push('国家调控');
            labels.push('市场导向');
        } else if (traits.economicSystem.includes('市场')) {
            labels.push('市场经济');
            labels.push('自由贸易');
            labels.push('私有制');
        } else if (traits.economicSystem.includes('计划')) {
            labels.push('计划经济');
            labels.push('国家主导');
            labels.push('公有制');
        }

        return labels;
    }

    generateCultureLabels(traits) {
        const labels = [];
        
        traits.culturalValues.forEach(value => {
            if (value.includes('儒家')) {
                labels.push('儒家思想');
                labels.push('和谐理念');
                labels.push('等级观念');
            } else if (value.includes('个人')) {
                labels.push('个人主义');
                labels.push('自由价值');
                labels.push('权利意识');
            } else if (value.includes('伊斯兰')) {
                labels.push('伊斯兰文化');
                labels.push('宗教传统');
                labels.push('道德准则');
            }
        });

        return labels;
    }

    generateGovernanceLabels(traits) {
        const labels = [];
        
        // 基于政府类型添加标签
        if (traits.governmentType.includes('中央集权')) {
            labels.push('centralized');
            labels.push('bureaucratic');
        } else if (traits.governmentType.includes('民主')) {
            labels.push('democratic');
            labels.push('participatory');
        }

        return labels;
    }

    generateEconomyLabels(traits) {
        const labels = [];
        
        // 基于经济体系添加标签
        if (traits.economicSystem.includes('混合')) {
            labels.push('mixed_economy');
            labels.push('state_guidance');
        } else if (traits.economicSystem.includes('市场')) {
            labels.push('market_economy');
            labels.push('private_enterprise');
        }

        return labels;
    }

    generatePersonality() {
        // 基于文明特征生成AI个性
        const traits = this.civilization.traits;
        return {
            aggression: this.calculateAggression(traits),
            cooperation: this.calculateCooperation(traits),
            innovation: this.calculateInnovation(traits),
            tradition: this.calculateTradition(traits),
            expansion: this.calculateExpansion(traits)
        };
    }

    calculateAggression(traits) {
        let score = 0.5; // 基础值
        
        // 基于政治体系调整
        if (traits.governmentType.includes('军事')) score += 0.2;
        if (traits.governmentType.includes('和平')) score -= 0.2;
        if (traits.governmentType.includes('民主')) score -= 0.1;
        if (traits.governmentType.includes('集权')) score += 0.1;
        
        // 基于文化价值观调整
        traits.culturalValues.forEach(value => {
            if (value.includes('和谐')) score -= 0.15;
            if (value.includes('竞争')) score += 0.15;
            if (value.includes('和平')) score -= 0.15;
            if (value.includes('军事')) score += 0.15;
        });

        // 基于历史经验调整
        if (traits.technologicalFocus.includes('军事科技')) score += 0.1;
        if (traits.technologicalFocus.includes('防御技术')) score += 0.05;

        return Math.max(0, Math.min(1, score));
    }

    calculateCooperation(traits) {
        let score = 0.5;
        
        // 基于文化价值观调整
        traits.culturalValues.forEach(value => {
            if (value.includes('和谐')) score += 0.15;
            if (value.includes('集体')) score += 0.15;
            if (value.includes('个人')) score -= 0.1;
            if (value.includes('多元')) score += 0.1;
        });

        // 基于政治体系调整
        if (traits.governmentType.includes('民主')) score += 0.1;
        if (traits.governmentType.includes('联邦')) score += 0.1;
        if (traits.governmentType.includes('集权')) score -= 0.05;

        // 基于经济体系调整
        if (traits.economicSystem.includes('市场')) score += 0.05;
        if (traits.economicSystem.includes('混合')) score += 0.1;

        return Math.max(0, Math.min(1, score));
    }

    calculateInnovation(traits) {
        let score = 0.5;
        
        // 基于技术重点调整
        traits.technologicalFocus.forEach(focus => {
            if (focus.includes('创新')) score += 0.15;
            if (focus.includes('研究')) score += 0.1;
            if (focus.includes('科技')) score += 0.1;
            if (focus.includes('传统')) score -= 0.05;
        });

        // 基于经济体系调整
        if (traits.economicSystem.includes('市场')) score += 0.1;
        if (traits.economicSystem.includes('自由')) score += 0.1;

        // 基于文化价值观调整
        traits.culturalValues.forEach(value => {
            if (value.includes('创新')) score += 0.1;
            if (value.includes('科学')) score += 0.1;
            if (value.includes('传统')) score -= 0.1;
        });

        return Math.max(0, Math.min(1, score));
    }

    calculateTradition(traits) {
        let score = 0.5;
        
        // 基于文化价值观调整
        traits.culturalValues.forEach(value => {
            if (value.includes('传统')) score += 0.15;
            if (value.includes('保守')) score += 0.15;
            if (value.includes('现代')) score -= 0.1;
            if (value.includes('创新')) score -= 0.1;
        });
        
        // 基于宗教信仰调整
        traits.religiousBeliefs.forEach(belief => {
            if (belief.includes('传统')) score += 0.1;
            if (belief.includes('世俗')) score -= 0.1;
        });

        // 基于政治体系调整
        if (traits.governmentType.includes('传统')) score += 0.1;
        if (traits.governmentType.includes('现代')) score -= 0.1;

        return Math.max(0, Math.min(1, score));
    }

    calculateExpansion(traits) {
        let score = 0.5;
        
        // 基于政治体系调整
        if (traits.governmentType.includes('扩张')) score += 0.2;
        if (traits.governmentType.includes('联邦')) score += 0.1;
        if (traits.governmentType.includes('保守')) score -= 0.1;

        // 基于经济体系调整
        if (traits.economicSystem.includes('市场')) score += 0.15;
        if (traits.economicSystem.includes('自由')) score += 0.15;
        if (traits.economicSystem.includes('保守')) score -= 0.1;

        // 基于文化价值观调整
        traits.culturalValues.forEach(value => {
            if (value.includes('扩张')) score += 0.1;
            if (value.includes('竞争')) score += 0.1;
            if (value.includes('保守')) score -= 0.1;
            if (value.includes('和平')) score -= 0.1;
        });

        // 基于技术重点调整
        traits.technologicalFocus.forEach(focus => {
            if (focus.includes('军事')) score += 0.05;
            if (focus.includes('扩张')) score += 0.05;
        });

        return Math.max(0, Math.min(1, score));
    }

    update() {
        // 更新AI状态和决策
        this.updateLabels();
        this.updateMemory();
        this.updateRelationships();
    }

    updateLabels() {
        // 根据最近事件和决策更新动态标签
        const recentEvents = this.memory.events.slice(-5);
        const recentDecisions = this.memory.decisions.slice(-5);
        
        this.labels.dynamic.current_focus = this.analyzeFocus(recentEvents, recentDecisions);
        this.labels.dynamic.emerging_trends = this.analyzeTrends(recentEvents);
        this.labels.dynamic.challenges = this.analyzeChallenges(recentEvents);
    }

    updateMemory() {
        // 更新记忆系统
        // 移除过旧的记忆
        const maxMemorySize = 100;
        if (this.memory.events.length > maxMemorySize) {
            this.memory.events = this.memory.events.slice(-maxMemorySize);
        }
        if (this.memory.decisions.length > maxMemorySize) {
            this.memory.decisions = this.memory.decisions.slice(-maxMemorySize);
        }
    }

    updateRelationships() {
        // 更新与其他文明的关系
        this.memory.relationships.forEach((relation, civName) => {
            // 基于最近互动更新关系状态
            const recentInteractions = this.getRecentInteractions(civName);
            relation.status = this.calculateRelationshipStatus(recentInteractions);
        });
    }

    // 辅助方法
    analyzeFocus(events, decisions) {
        // 分析当前关注点
        const focus = new Set();
        
        events.forEach(event => {
            if (event.category) focus.add(event.category);
        });
        
        decisions.forEach(decision => {
            if (decision.area) focus.add(decision.area);
        });

        return Array.from(focus).slice(0, 3); // 返回最多3个关注点
    }

    analyzeTrends(events) {
        // 分析新兴趋势
        const trends = new Map();
        
        events.forEach(event => {
            if (event.category) {
                trends.set(event.category, (trends.get(event.category) || 0) + 1);
            }
        });

        return Array.from(trends.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(entry => entry[0]);
    }

    analyzeChallenges(events) {
        // 分析当前挑战
        const challenges = new Set();
        
        events.forEach(event => {
            if (event.severity === 'severe' || event.severity === 'high') {
                challenges.add(event.category);
            }
        });

        return Array.from(challenges).slice(0, 3);
    }

    getRecentInteractions(civName) {
        // 获取与特定文明的最近互动
        return this.memory.events.filter(event => 
            event.involvedCivilizations && 
            event.involvedCivilizations.includes(civName)
        ).slice(-10);
    }

    calculateRelationshipStatus(interactions) {
        // 计算关系状态
        let score = 0;
        
        interactions.forEach(interaction => {
            if (interaction.type === 'positive') score += 1;
            if (interaction.type === 'negative') score -= 1;
        });

        if (score > 5) return 'friendly';
        if (score < -5) return 'hostile';
        return 'neutral';
    }

    initializePriorities() {
        const traits = this.civilization.traits;
        return {
            stability: this.calculatePriorityScore('stability', traits),
            development: this.calculatePriorityScore('development', traits),
            expansion: this.calculatePriorityScore('expansion', traits),
            culture: this.calculatePriorityScore('culture', traits),
            military: this.calculatePriorityScore('military', traits),
            diplomacy: this.calculatePriorityScore('diplomacy', traits)
        };
    }

    calculatePriorityScore(priority, traits) {
        let score = 0.5; // 基础分数

        switch (priority) {
            case 'stability':
                if (traits.governmentType.includes('集权')) score += 0.2;
                if (traits.culturalValues.includes('和谐')) score += 0.2;
                if (traits.culturalValues.includes('传统')) score += 0.1;
                break;
            case 'development':
                if (traits.economicSystem.includes('市场')) score += 0.2;
                if (traits.technologicalFocus.includes('创新')) score += 0.2;
                if (traits.culturalValues.includes('进步')) score += 0.1;
                break;
            case 'expansion':
                if (traits.governmentType.includes('军事')) score += 0.2;
                if (traits.culturalValues.includes('扩张')) score += 0.2;
                if (traits.technologicalFocus.includes('军事')) score += 0.1;
                break;
            case 'culture':
                if (traits.culturalValues.includes('传统')) score += 0.2;
                if (traits.religiousBeliefs.length > 0) score += 0.2;
                if (traits.culturalValues.includes('艺术')) score += 0.1;
                break;
            case 'military':
                if (traits.governmentType.includes('军事')) score += 0.3;
                if (traits.technologicalFocus.includes('军事')) score += 0.2;
                if (traits.culturalValues.includes('武力')) score += 0.1;
                break;
            case 'diplomacy':
                if (traits.governmentType.includes('民主')) score += 0.2;
                if (traits.culturalValues.includes('和平')) score += 0.2;
                if (traits.culturalValues.includes('合作')) score += 0.1;
                break;
        }

        return Math.max(0, Math.min(1, score));
    }

    initializeStrategies() {
        return {
            economic: {
                marketOriented: this.civilization.traits.economicSystem.includes('市场'),
                stateControl: this.civilization.traits.economicSystem.includes('计划'),
                mixedApproach: this.civilization.traits.economicSystem.includes('混合'),
                resourceFocus: this.calculateResourceStrategy(),
                tradePolicy: this.calculateTradePolicy()
            },
            diplomatic: {
                cooperative: this.personality.cooperation > 0.7,
                aggressive: this.personality.aggression > 0.7,
                neutral: this.personality.cooperation < 0.7 && this.personality.aggression < 0.7,
                alliancePreference: this.calculateAlliancePreference(),
                conflictThreshold: this.calculateConflictThreshold()
            },
            military: {
                offensive: this.personality.aggression > 0.8,
                defensive: this.personality.aggression < 0.3,
                balanced: this.personality.aggression >= 0.3 && this.personality.aggression <= 0.8,
                modernization: this.calculateMilitaryModernization(),
                deploymentStyle: this.calculateDeploymentStyle()
            },
            cultural: {
                traditional: this.personality.tradition > 0.7,
                innovative: this.personality.innovation > 0.7,
                balanced: this.personality.tradition < 0.7 && this.personality.innovation < 0.7,
                culturalExport: this.calculateCulturalExport(),
                valuePreservation: this.calculateValuePreservation()
            }
        };
    }

    calculateResourceStrategy() {
        const traits = this.civilization.traits;
        return {
            focusAreas: traits.technologicalFocus,
            sustainabilityIndex: traits.culturalValues.includes('环保') ? 0.8 : 0.5,
            exploitationRate: this.personality.aggression * 0.7 + 0.3,
            innovationDrive: this.personality.innovation
        };
    }

    calculateTradePolicy() {
        return {
            openness: this.civilization.traits.economicSystem.includes('市场') ? 0.8 : 0.5,
            protectionism: this.personality.tradition * 0.6 + 0.2,
            strategicResources: this.decisionSystem.priorities.military * 0.8,
            culturalGoods: this.decisionSystem.priorities.culture * 0.7
        };
    }

    calculateAlliancePreference() {
        return {
            ideologicalAlignment: this.personality.tradition * 0.6,
            economicBenefit: this.decisionSystem.priorities.development * 0.7,
            militaryCooperation: this.decisionSystem.priorities.military * 0.8,
            culturalAffinity: this.decisionSystem.priorities.culture * 0.5
        };
    }

    calculateConflictThreshold() {
        return {
            militaryThreat: 0.7 - (this.personality.cooperation * 0.3),
            economicPressure: 0.6 - (this.personality.cooperation * 0.2),
            culturalTension: 0.5 - (this.personality.cooperation * 0.2),
            territorialDispute: 0.8 - (this.personality.cooperation * 0.3)
        };
    }

    initializePreferences() {
        return {
            governance: {
                centralization: this.calculateCentralizationPreference(),
                bureaucracy: this.calculateBureaucracyPreference(),
                reform: this.calculateReformPreference()
            },
            society: {
                equality: this.calculateEqualityPreference(),
                diversity: this.calculateDiversityPreference(),
                tradition: this.personality.tradition
            },
            development: {
                industrialization: this.calculateIndustrializationPreference(),
                sustainability: this.calculateSustainabilityPreference(),
                innovation: this.personality.innovation
            }
        };
    }

    calculateCentralizationPreference() {
        let score = 0.5;
        if (this.civilization.traits.governmentType.includes('集权')) score += 0.3;
        if (this.civilization.traits.governmentType.includes('民主')) score -= 0.3;
        if (this.personality.tradition > 0.7) score += 0.1;
        return Math.max(0, Math.min(1, score));
    }

    calculateBureaucracyPreference() {
        let score = 0.5;
        if (this.civilization.traits.governmentType.includes('科层')) score += 0.3;
        if (this.civilization.traits.culturalValues.includes('效率')) score -= 0.2;
        if (this.personality.tradition > 0.7) score += 0.1;
        return Math.max(0, Math.min(1, score));
    }

    calculateReformPreference() {
        let score = 0.5;
        if (this.personality.innovation > 0.7) score += 0.2;
        if (this.personality.tradition > 0.7) score -= 0.2;
        if (this.civilization.traits.culturalValues.includes('进步')) score += 0.2;
        return Math.max(0, Math.min(1, score));
    }

    calculateEqualityPreference() {
        let score = 0.5;
        if (this.civilization.traits.culturalValues.includes('平等')) score += 0.3;
        if (this.civilization.traits.governmentType.includes('民主')) score += 0.2;
        if (this.personality.cooperation > 0.7) score += 0.1;
        return Math.max(0, Math.min(1, score));
    }

    calculateDiversityPreference() {
        let score = 0.5;
        if (this.civilization.traits.culturalValues.includes('多元')) score += 0.3;
        if (this.personality.tradition > 0.7) score -= 0.2;
        if (this.civilization.traits.governmentType.includes('联邦')) score += 0.2;
        return Math.max(0, Math.min(1, score));
    }

    calculateIndustrializationPreference() {
        let score = 0.5;
        if (this.civilization.traits.technologicalFocus.includes('工业')) score += 0.3;
        if (this.civilization.traits.culturalValues.includes('环保')) score -= 0.2;
        if (this.personality.innovation > 0.7) score += 0.2;
        return Math.max(0, Math.min(1, score));
    }

    calculateSustainabilityPreference() {
        let score = 0.5;
        if (this.civilization.traits.culturalValues.includes('环保')) score += 0.3;
        if (this.civilization.traits.technologicalFocus.includes('可持续')) score += 0.2;
        if (this.personality.cooperation > 0.7) score += 0.1;
        return Math.max(0, Math.min(1, score));
    }

    calculateMilitaryModernization() {
        let score = 0.5;
        const traits = this.civilization.traits;

        // 基于技术重点调整
        if (traits.technologicalFocus) {
            if (traits.technologicalFocus.includes('军事科技')) score += 0.2;
            if (traits.technologicalFocus.includes('航天技术')) score += 0.1;
            if (traits.technologicalFocus.includes('信息技术')) score += 0.1;
        }

        // 基于经济体系调整
        if (traits.economicSystem) {
            if (traits.economicSystem.includes('市场')) score += 0.1;
            if (traits.economicSystem.includes('计划')) score += 0.05;
        }

        // 基于政治体系调整
        if (traits.governmentType) {
            if (traits.governmentType.includes('军事')) score += 0.15;
            if (traits.governmentType.includes('民主')) score += 0.05;
        }

        return Math.max(0, Math.min(1, score));
    }

    calculateDeploymentStyle() {
        let style = {
            offensive: 0.5,
            defensive: 0.5,
            flexible: 0.5
        };

        const traits = this.civilization.traits;

        // 基于政治体系调整
        if (traits.governmentType) {
            if (traits.governmentType.includes('军事')) {
                style.offensive += 0.2;
                style.flexible += 0.1;
            }
            if (traits.governmentType.includes('民主')) {
                style.defensive += 0.1;
                style.flexible += 0.2;
            }
        }

        // 基于文化价值观调整
        if (traits.culturalValues) {
            if (traits.culturalValues.includes('和平')) {
                style.defensive += 0.2;
                style.offensive -= 0.1;
            }
            if (traits.culturalValues.includes('进取')) {
                style.offensive += 0.1;
                style.flexible += 0.1;
            }
        }

        // 确保所有值在0-1范围内
        Object.keys(style).forEach(key => {
            style[key] = Math.max(0, Math.min(1, style[key]));
        });

        return style;
    }

    calculateCulturalExport() {
        let score = 0.5;
        const traits = this.civilization.traits;

        // 基于文化价值观调整
        if (traits.culturalValues) {
            traits.culturalValues.forEach(value => {
                if (value.includes('传统')) score += 0.1;
                if (value.includes('创新')) score += 0.1;
                if (value.includes('开放')) score += 0.1;
            });
        }

        // 基于经济体系调整
        if (traits.economicSystem) {
            if (traits.economicSystem.includes('市场')) score += 0.1;
            if (traits.economicSystem.includes('自由')) score += 0.1;
        }

        return Math.max(0, Math.min(1, score));
    }

    calculateValuePreservation() {
        let score = 0.5;
        const traits = this.civilization.traits;

        // 基于文化价值观调整
        if (traits.culturalValues) {
            traits.culturalValues.forEach(value => {
                if (value.includes('传统')) score += 0.2;
                if (value.includes('保守')) score += 0.1;
                if (value.includes('现代')) score -= 0.1;
            });
        }

        // 基于宗教信仰调整
        if (traits.religiousBeliefs) {
            traits.religiousBeliefs.forEach(belief => {
                if (belief.includes('传统')) score += 0.1;
                if (belief.includes('保守')) score += 0.1;
            });
        }

        return Math.max(0, Math.min(1, score));
    }
} 