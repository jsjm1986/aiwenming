// 创建一个全局配置对象
const CONFIG = {
    defaultModel: 'deepseek',
    initialized: false,
    models: {
        deepseek: {
            name: 'DeepSeek',
            endpoint: 'https://api.deepseek.com/v1/chat/completions',
            apiKey: process.env.DEEPSEEK_API_KEY || '你的API密钥',
            maxTokens: 4000,
            temperature: 0.7,
            model: "deepseek-chat",
            description: "DeepSeek AI - 强大的思维推理能力"
        },
        glm: {
            name: 'GLM',
            endpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
            apiKey: process.env.GLM_API_KEY || '你的API密钥',
            maxTokens: 4000,
            temperature: 0.7,
            model: "glm-4",
            description: "智谱GLM - 强大的中文理解能力",
            headers: {
                'Authorization': '', 
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            }
        }
    }
};

// 初始化函数
function initializeConfig() {
    try {
        // 从本地存储加载API密钥
        Object.keys(CONFIG.models).forEach(modelName => {
            const savedApiKey = localStorage.getItem(`${modelName}ApiKey`);
            if (savedApiKey) {
                const model = CONFIG.models[modelName];
                if (model.name === 'GLM') {
                    model.headers.Authorization = `Bearer ${savedApiKey}`;
                }
                model.apiKey = savedApiKey;
            }
        });

        // 加载选择的模型
        const savedModel = localStorage.getItem('selectedModel');
        if (savedModel && CONFIG.models[savedModel]) {
            CONFIG.defaultModel = savedModel;
        }

        CONFIG.initialized = true;
        console.log('CONFIG initialized successfully');
        
        // 通知配置初始化完成
        if (window.resolveConfigInit) {
            window.resolveConfigInit();
        }
        
        return true;
    } catch (error) {
        console.error('Error initializing CONFIG:', error);
        return false;
    }
}

// 立即初始化配置
initializeConfig();

// 将配置对象添加到全局作用域
window.CONFIG = CONFIG;

// 通知配置加载完成
if (window.resolveConfig) {
    window.resolveConfig();
}