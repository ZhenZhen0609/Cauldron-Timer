// 魔药原料数据库
const MATERIALS = [
    { name: '月光石粉末', icon: '🌙', type: 'light', rarity: 'common', color: '#B8C5D6', effect: 'glow' },
    { name: '独角兽尾毛', icon: '🦄', type: 'light', rarity: 'rare', color: '#E8F4F8', effect: 'sparkle' },
    { name: '凤凰羽毛', icon: '🔥', type: 'fire', rarity: 'legendary', color: '#FF6B35', effect: 'flame' },
    { name: '龙血草', icon: '🐉', type: 'fire', rarity: 'rare', color: '#8B4513', effect: 'boil' },
    { name: '深海珍珠', icon: '🫧', type: 'water', rarity: 'rare', color: '#4A90A4', effect: 'ripple' },
    { name: '人鱼之泪', icon: '💧', type: 'water', rarity: 'epic', color: '#7EC8E3', effect: 'float' },
    { name: '曼德拉草根', icon: '🌱', type: 'nature', rarity: 'common', color: '#6B8E23', effect: 'shake' },
    { name: '魔苹果种子', icon: '🍎', type: 'nature', rarity: 'common', color: '#8FBC8F', effect: 'grow' },
    { name: '暗影蘑菇', icon: '🍄', type: 'dark', rarity: 'rare', color: '#4B0082', effect: 'swirl' },
    { name: '午夜水仙', icon: '🌺', type: 'dark', rarity: 'epic', color: '#2C1654', effect: 'twinkle' },
    { name: '星辉尘', icon: '✨', type: 'star', rarity: 'epic', color: '#FFD700', effect: 'burst' },
    { name: '极光苔藓', icon: '🌈', type: 'star', rarity: 'rare', color: '#9D84B7', effect: 'rainbow' },
    { name: '霜冻薄荷', icon: '❄️', type: 'frost', rarity: 'common', color: '#98D8C8', effect: 'cold' },
    { name: '冰晶兰花', icon: '🧊', type: 'frost', rarity: 'rare', color: '#B0E0E6', effect: 'freeze' },
    { name: '狮鹫羽毛', icon: '🦅', type: 'divine', rarity: 'epic', color: '#DAA520', effect: 'golden' },
    { name: '时光沙砾', icon: '⏳', type: 'mystic', rarity: 'legendary', color: '#C19A6B', effect: 'time' }
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
    }
];