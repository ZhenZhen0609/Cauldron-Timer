// 魔药原料数据库
const MATERIALS = [
    // 光系原料
    { name: '月光石粉末', icon: '🌙', type: 'light', rarity: 'common', color: '#B8C5D6', effect: 'glow' },
    { name: '独角兽尾毛', icon: '🦄', type: 'light', rarity: 'rare', color: '#E8F4F8', effect: 'sparkle' },
    { name: '狮鹫羽毛', icon: '🦅', type: 'divine', rarity: 'epic', color: '#DAA520', effect: 'golden' },
    { name: '星辉尘', icon: '✨', type: 'star', rarity: 'epic', color: '#FFD700', effect: 'burst' },
    
    // 火系原料
    { name: '凤凰羽毛', icon: '🔥', type: 'fire', rarity: 'legendary', color: '#FF6B35', effect: 'flame' },
    { name: '龙血草', icon: '🐉', type: 'fire', rarity: 'rare', color: '#8B4513', effect: 'boil' },
    { name: '熔岩碎片', icon: '🌋', type: 'fire', rarity: 'epic', color: '#FF4500', effect: 'eruption' },
    { name: '太阳石', icon: '☀️', type: 'fire', rarity: 'legendary', color: '#FFD700', effect: 'radiance' },
    
    // 水系原料
    { name: '深海珍珠', icon: '🫧', type: 'water', rarity: 'rare', color: '#4A90A4', effect: 'ripple' },
    { name: '人鱼之泪', icon: '💧', type: 'water', rarity: 'epic', color: '#7EC8E3', effect: 'float' },
    { name: '海神之泪', icon: '🌊', type: 'water', rarity: 'legendary', color: '#00BFFF', effect: 'wave' },
    { name: '水晶泪滴', icon: '💎', type: 'water', rarity: 'epic', color: '#E0FFFF', effect: 'crystal' },
    
    // 自然原料
    { name: '曼德拉草根', icon: '🌱', type: 'nature', rarity: 'common', color: '#6B8E23', effect: 'shake' },
    { name: '魔苹果种子', icon: '🍎', type: 'nature', rarity: 'common', color: '#8FBC8F', effect: 'grow' },
    { name: '生命之叶', icon: '🍃', type: 'nature', rarity: 'rare', color: '#228B22', effect: 'regen' },
    { name: '森林之心', icon: '🌳', type: 'nature', rarity: 'epic', color: '#006400', effect: 'life' },
    
    // 暗影原料
    { name: '暗影蘑菇', icon: '🍄', type: 'dark', rarity: 'rare', color: '#4B0082', effect: 'swirl' },
    { name: '午夜水仙', icon: '🌺', type: 'dark', rarity: 'epic', color: '#2C1654', effect: 'twinkle' },
    { name: '幽灵之雾', icon: '🌫️', type: 'dark', rarity: 'epic', color: '#2F4F4F', effect: 'ghost' },
    { name: '暗夜之花', icon: '�', type: 'dark', rarity: 'legendary', color: '#1a0b2e', effect: 'night' },
    
    // 冰霜原料
    { name: '霜冻薄荷', icon: '❄️', type: 'frost', rarity: 'common', color: '#98D8C8', effect: 'cold' },
    { name: '冰晶兰花', icon: '🧊', type: 'frost', rarity: 'rare', color: '#B0E0E6', effect: 'freeze' },
    { name: '极光苔藓', icon: '🌈', type: 'star', rarity: 'rare', color: '#9D84B7', effect: 'rainbow' },
    { name: '寒冰之心', icon: '🧊', type: 'frost', rarity: 'epic', color: '#00BFFF', effect: 'ice' },
    
    // 神秘原料
    { name: '时光沙砾', icon: '⏳', type: 'mystic', rarity: 'legendary', color: '#C19A6B', effect: 'time' },
    { name: '命运之线', icon: '🕸️', type: 'mystic', rarity: 'legendary', color: '#800080', effect: 'fate' },
    { name: '虚空之核', icon: '🌌', type: 'mystic', rarity: 'legendary', color: '#000000', effect: 'void' },
    { name: '灵魂碎片', icon: '👻', type: 'mystic', rarity: 'epic', color: '#9370DB', effect: 'soul' }
];

// 可爱彩蛋库
const EASTER_EGGS = [
    { icon: '🧚', text: '小精灵在耳语："主人加油哦~"' },
    { icon: '🐸', text: '小青蛙跳出来："呱~配方不错！"' },
    { icon: '🦉', text: '猫头鹰飞过："Hoot~ 斯内普教授会满意的！"' },
    { icon: '⭐', text: '星星眨眼："这个组合很有潜力呢！"' },
    { icon: '🪄', text: '魔杖自己挥舞："Excellent choice!"' },
    { icon: '📚', text: '魔法书翻页："这是个经典配方！"' },
    { icon: '🌙', text: '月亮微笑："夜深了，继续加油！"' },
    { icon: '✨', text: '魔法粒子欢呼："做得漂亮！"' }
];

// 魔药配方规则
const POTION_RECIPES = [
    // 单一元素配方
    { 
        name: '月光灵药', 
        rule: (m) => m.filter(i => i.type === 'light').length >= 3,
        color: '#D4E4F7',
        quality: 'rare',
        desc: '专注如月华，思绪如流水'
    },
    {
        name: '凤凰之泪',
        rule: (m) => m.filter(i => i.type === 'fire').length >= 3,
        color: '#FF7F50',
        quality: 'epic',
        desc: '激情似火，重生如凤凰'
    },
    {
        name: '深海秘药',
        rule: (m) => m.filter(i => i.type === 'water').length >= 3,
        color: '#4682B4',
        quality: 'rare',
        desc: '沉静如深海，智慧如潮汐'
    },
    {
        name: '生命精华',
        rule: (m) => m.filter(i => i.type === 'nature').length >= 3,
        color: '#90EE90',
        quality: 'common',
        desc: '生机勃勃，活力充沛'
    },
    {
        name: '暗夜挽歌',
        rule: (m) => m.filter(i => i.type === 'dark').length >= 3,
        color: '#483D8B',
        quality: 'epic',
        desc: '拥抱黑暗，洞察真理'
    },
    {
        name: '星穹秘酿',
        rule: (m) => m.filter(i => i.type === 'star').length >= 3,
        color: '#B695C0',
        quality: 'epic',
        desc: '仰望星空，心怀宇宙'
    },
    {
        name: '极寒冰心',
        rule: (m) => m.filter(i => i.type === 'frost').length >= 3,
        color: '#AFEEEE',
        quality: 'rare',
        desc: '冷静思考，冰雪聪明'
    },
    
    // 双元素组合
    {
        name: '光暗调和',
        rule: (m) => m.filter(i => i.type === 'light').length >= 2 && m.filter(i => i.type === 'dark').length >= 2,
        color: '#9370DB',
        quality: 'epic',
        desc: '阴阳平衡，大道至简'
    },
    {
        name: '火水既济',
        rule: (m) => m.filter(i => i.type === 'fire').length >= 2 && m.filter(i => i.type === 'water').length >= 2,
        color: '#CD853F',
        quality: 'rare',
        desc: '水火相融，刚柔并济'
    },
    {
        name: '冰火奇迹',
        rule: (m) => m.filter(i => i.type === 'frost').length >= 2 && m.filter(i => i.type === 'fire').length >= 2,
        color: '#FF69B4',
        quality: 'epic',
        desc: '极端碰撞，奇迹诞生'
    },
    {
        name: '自然之息',
        rule: (m) => m.filter(i => i.type === 'nature').length >= 2 && m.filter(i => i.type === 'water').length >= 2,
        color: '#228B22',
        quality: 'rare',
        desc: '万物生长，生生不息'
    },
    {
        name: '星月交辉',
        rule: (m) => m.filter(i => i.type === 'star').length >= 2 && m.filter(i => i.type === 'light').length >= 2,
        color: '#E6E6FA',
        quality: 'epic',
        desc: '星光璀璨，月华流转'
    },
    {
        name: '暗影之舞',
        rule: (m) => m.filter(i => i.type === 'dark').length >= 2 && m.filter(i => i.type === 'frost').length >= 2,
        color: '#191970',
        quality: 'epic',
        desc: '暗影潜行，寒霜随行'
    },
    
    // 三元素组合
    {
        name: '三原之泉',
        rule: (m) => m.filter(i => i.type === 'light').length >= 1 && m.filter(i => i.type === 'water').length >= 1 && m.filter(i => i.type === 'nature').length >= 1,
        color: '#00CED1',
        quality: 'rare',
        desc: '纯净之源，生命之泉'
    },
    {
        name: '混沌熔炉',
        rule: (m) => m.filter(i => i.type === 'fire').length >= 1 && m.filter(i => i.type === 'dark').length >= 1 && m.filter(i => i.type === 'frost').length >= 1,
        color: '#800080',
        quality: 'epic',
        desc: '混沌初开，万物生成'
    },
    {
        name: '元素交响',
        rule: (m) => {
            const types = new Set(m.map(i => i.type));
            return types.size >= 3;
        },
        color: '#BA55D3',
        quality: 'epic',
        desc: '元素共鸣，和谐共振'
    },
    
    // 特殊配方
    {
        name: '霍格沃茨荣光',
        rule: (m) => {
            const names = m.map(i => i.name);
            return names.includes('凤凰羽毛') && names.includes('独角兽尾毛') && 
                   names.includes('时光沙砾') && names.includes('星辉尘') && names.includes('人鱼之泪');
        },
        color: 'linear-gradient(90deg, #FF6B35, #FFD700, #7EC8E3, #9D84B7, #E8F4F8)',
        quality: 'legendary',
        desc: '五巨头配方！霍格沃茨的荣耀！'
    },
    {
        name: '邓布利多的智慧',
        rule: (m) => m.filter(i => i.rarity === 'legendary' || i.rarity === 'epic').length >= 5,
        color: '#9400D3',
        quality: 'legendary',
        desc: '传说配方！智慧与力量的结晶'
    },
    {
        name: '时光倒流药',
        rule: (m) => m.some(i => i.name === '时光沙砾'),
        color: '#DEB887',
        quality: 'legendary',
        desc: '时间都为你驻足'
    },
    {
        name: '圣光庇护',
        rule: (m) => m.some(i => i.name === '狮鹫羽毛') && m.filter(i => i.type === 'light').length >= 2,
        color: '#FFE4B5',
        quality: 'legendary',
        desc: '神圣守护，无惧黑暗'
    },
    {
        name: '永恒星辰',
        rule: (m) => m.some(i => i.name === '星辉尘') && m.filter(i => i.type === 'star').length >= 3,
        color: '#FFD700',
        quality: 'legendary',
        desc: '如星辰般永恒闪耀'
    },
    {
        name: '万象归一',
        rule: (m) => {
            const types = new Set(m.map(i => i.type));
            return types.size >= 5;
        },
        color: '#8B7D6B',
        quality: 'legendary',
        desc: '包容万象，超凡入圣'
    },
    
    // 新增配方
    {
        name: '月光守护',
        rule: (m) => m.some(i => i.name === '月光石粉末') && m.filter(i => i.type === 'light').length >= 2,
        color: '#F0F8FF',
        quality: 'rare',
        desc: '月光庇护，夜行无忧'
    },
    {
        name: '龙血狂暴',
        rule: (m) => m.some(i => i.name === '龙血草') && m.filter(i => i.type === 'fire').length >= 2,
        color: '#DC143C',
        quality: 'epic',
        desc: '龙血沸腾，战意高昂'
    },
    {
        name: '人鱼之歌',
        rule: (m) => m.some(i => i.name === '人鱼之泪') && m.filter(i => i.type === 'water').length >= 2,
        color: '#40E0D0',
        quality: 'epic',
        desc: '海之低语，心灵澄澈'
    },
    {
        name: '森林之心',
        rule: (m) => m.some(i => i.name === '曼德拉草根') && m.filter(i => i.type === 'nature').length >= 2,
        color: '#32CD32',
        quality: 'rare',
        desc: '自然馈赠，生机盎然'
    },
    {
        name: '午夜幽灵',
        rule: (m) => m.some(i => i.name === '午夜水仙') && m.filter(i => i.type === 'dark').length >= 2,
        color: '#4B0082',
        quality: 'epic',
        desc: '暗夜行者，幽灵随行'
    },
    {
        name: '极光幻梦',
        rule: (m) => m.some(i => i.name === '极光苔藓') && m.filter(i => i.type === 'star').length >= 2,
        color: '#7FFFD4',
        quality: 'rare',
        desc: '极光流转，梦境迷离'
    },
    {
        name: '霜冻领域',
        rule: (m) => m.some(i => i.name === '霜冻薄荷') && m.filter(i => i.type === 'frost').length >= 2,
        color: '#E0FFFF',
        quality: 'rare',
        desc: '寒霜领域，万物冰封'
    },
    {
        name: '狮鹫之威',
        rule: (m) => m.some(i => i.name === '狮鹫羽毛') && m.filter(i => i.type === 'divine').length >= 1,
        color: '#FFD700',
        quality: 'epic',
        desc: '神圣威严，所向披靡'
    },
    {
        name: '星尘之舞',
        rule: (m) => m.some(i => i.name === '星辉尘') && m.filter(i => i.type === 'star').length >= 2,
        color: '#FFA500',
        quality: 'epic',
        desc: '星尘飞舞，奇迹降临'
    },
    {
        name: '时光旅人',
        rule: (m) => m.some(i => i.name === '时光沙砾') && m.filter(i => i.type === 'mystic').length >= 1,
        color: '#DAA520',
        quality: 'legendary',
        desc: '穿越时空，见证永恒'
    },
    {
        name: '混沌之眼',
        rule: (m) => {
            const types = new Set(m.map(i => i.type));
            return types.size >= 4 && m.some(i => i.rarity === 'legendary');
        },
        color: '#000000',
        quality: 'legendary',
        desc: '混沌之眼，洞悉万物'
    },
    {
        name: '元素大师',
        rule: (m) => {
            const types = new Set(m.map(i => i.type));
            return types.size >= 6;
        },
        color: '#FF4500',
        quality: 'legendary',
        desc: '掌控元素，登峰造极'
    },
    {
        name: '神秘学者',
        rule: (m) => {
            const types = new Set(m.map(i => i.type));
            return types.size >= 7;
        },
        color: '#8A2BE2',
        quality: 'legendary',
        desc: '学识渊博，智慧无边'
    },
    {
        name: '完美融合',
        rule: (m) => {
            const types = new Set(m.map(i => i.type));
            return types.size >= 8;
        },
        color: '#FFFFFF',
        quality: 'legendary',
        desc: '万物归一，完美融合'
    }
];