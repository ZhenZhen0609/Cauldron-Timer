// 应用状态
const state = {
    timeLeft: 25 * 60,
    isRunning: false,
    currentPotion: null,
    timerInterval: null,
    materials: [...MATERIALS]
};

// 魔法粒子生成
function createParticles() {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        document.body.appendChild(particle);
    }
}

// 气泡生成
function createBubbles() {
    setInterval(() => {
        if (!state.isRunning) return;
        
        const liquid = document.getElementById('potionLiquid');
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 15 + 5;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = Math.random() * 80 + 10 + '%';
        bubble.style.animationDuration = (Math.random() * 2 + 2) + 's';
        liquid.appendChild(bubble);
        
        setTimeout(() => bubble.remove(), 3000);
    }, 500);
}

// 初始化
function init() {
    createParticles();
    createBubbles();
    loadCurrentPotion();
    updateDisplay();
    updatePotionColor();
    renderAvailableMaterials();
    updateProgressDisplay();
}

// 加载当前魔药
function loadCurrentPotion() {
    const saved = localStorage.getItem('currentPotion');
    if (saved) {
        state.currentPotion = JSON.parse(saved);
    } else {
        state.currentPotion = {
            id: 'potion_' + Date.now(),
            totalTime: 0,
            materials: [],
            status: 'brewing',
            startDate: new Date().toISOString()
        };
    }
}

// 保存当前魔药
function saveCurrentPotion() {
    localStorage.setItem('currentPotion', JSON.stringify(state.currentPotion));
}

// 渲染可用原料
function renderAvailableMaterials() {
    const container = document.getElementById('materialGrid');
    container.innerHTML = '';
    
    const availableMaterials = state.materials.filter(m => 
        !state.currentPotion.materials.some(sm => sm.name === m.name)
    );
    
    if (availableMaterials.length === 0) {
        container.innerHTML = '<p style="color: #9d7cd8; text-align: center; grid-column: 1/-1;">所有原料都已用完！</p>';
        return;
    }
    
    availableMaterials.forEach(material => {
        const el = document.createElement('div');
        el.className = 'material-item';
        el.innerHTML = `
            <span class="icon">${material.icon}</span>
            <span class="name">${material.name}</span>
            <span class="rarity ${material.rarity}">${getRarityText(material.rarity)}</span>
        `;
        el.onclick = () => selectMaterial(material);
        container.appendChild(el);
    });
}

// 获取稀有度文本
function getRarityText(rarity) {
    const map = { common: '普通', rare: '稀有', epic: '史诗', legendary: '传说' };
    return map[rarity] || rarity;
}

// 选择素材
function selectMaterial(material) {
    if (state.currentPotion.materials.length >= 5) {
        alert('魔药已经满了！请先完成当前魔药。');
        return;
    }
    
    state.currentPotion.materials.push(material);
    
    // 触发可爱彩蛋
    if (Math.random() < 0.15) {
        showEasterEgg();
    }
    
    updatePotionColor();
    updateProgressDisplay();
    renderAvailableMaterials();
    
    if (state.currentPotion.materials.length >= 5) {
        completePotion();
    } else {
        saveCurrentPotion();
    }
    
    playSound(523, 0.15, 150);
}

// 显示彩蛋
function showEasterEgg() {
    const egg = EASTER_EGGS[Math.floor(Math.random() * EASTER_EGGS.length)];
    
    const eggEl = document.createElement('div');
    eggEl.className = 'cute-easter-egg';
    eggEl.innerHTML = `
        <div class="easter-egg-icon">${egg.icon}</div>
        <div class="easter-egg-text">${egg.text}</div>
    `;
    
    document.body.appendChild(eggEl);
    
    playSound(659, 0.1, 0);
    
    setTimeout(() => eggEl.remove(), 3000);
}

// 更新魔药颜色
function updatePotionColor() {
    const materials = state.currentPotion.materials;
    if (materials.length === 0) return;
    
    let finalColor;
    
    if (materials.length === 1) {
        finalColor = materials[0].color;
    } else {
        const weights = [0.4, 0.15, 0.15, 0.15, 0.15];
        const colors = materials.slice(0, 5).map((m, i) => ({
            color: m.color,
            weight: weights[i] || 0
        }));
        
        finalColor = blendColors(colors);
    }
    
    const liquid = document.getElementById('potionLiquid');
    const glow = document.getElementById('potionGlow');
    
    if (finalColor.includes('gradient')) {
        liquid.style.background = finalColor;
        glow.style.background = finalColor;
    } else {
        liquid.style.background = `linear-gradient(180deg, ${finalColor} 0%, ${darkenColor(finalColor, 30)} 100%)`;
        glow.style.background = finalColor;
        liquid.style.boxShadow = `0 -10px 30px ${finalColor}`;
    }
}

// 混合颜色
function blendColors(colors) {
    let r = 0, g = 0, b = 0, totalWeight = 0;
    
    colors.forEach(c => {
        const rgb = hexToRgb(c.color);
        r += rgb.r * c.weight;
        g += rgb.g * c.weight;
        b += rgb.b * c.weight;
        totalWeight += c.weight;
    });
    
    r = Math.round(r / totalWeight);
    g = Math.round(g / totalWeight);
    b = Math.round(b / totalWeight);
    
    return rgbToHex(r, g, b);
}

// 颜色转换函数
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 157, g: 124, b: 216 };
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function darkenColor(hex, percent) {
    const rgb = hexToRgb(hex);
    const factor = 1 - percent / 100;
    return rgbToHex(
        Math.round(rgb.r * factor),
        Math.round(rgb.g * factor),
        Math.round(rgb.b * factor)
    );
}

// 开始计时
function startTimer() {
    if (state.isRunning) return;
    
    if (state.currentPotion.materials.length === 0) {
        alert('请先添加至少一种原料再开始炼制！');
        return;
    }
    
    state.isRunning = true;
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('flame').classList.add('active');
    document.getElementById('potionLiquid').classList.add('brewing');
    
    playSound(440, 0.1, 100);
    
    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        updateDisplay();
        updateLiquidLevel();
        
        if (state.timeLeft <= 0) {
            completeStage();
        }
    }, 1000);
}

// 暂停计时
function pauseTimer() {
    state.isRunning = false;
    clearInterval(state.timerInterval);
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('flame').classList.remove('active');
    document.getElementById('potionLiquid').classList.remove('brewing');
    
    playSound(330, 0.1, 100);
}

// 重置计时
function resetTimer() {
    pauseTimer();
    state.timeLeft = 25 * 60;
    updateDisplay();
    updateLiquidLevel();
    playSound(294, 0.1, 100);
}

// 完成一个阶段
function completeStage() {
    pauseTimer();
    state.currentPotion.totalTime += 25;
    
    playSound(523, 0.2, 200);
    setTimeout(() => playSound(659, 0.2, 200), 150);
    setTimeout(() => playSound(784, 0.2, 300), 300);
    
    if (state.currentPotion.materials.length >= 5) {
        completePotion();
    } else {
        alert('25分钟到了！请选择一种原料加入魔药。');
        renderAvailableMaterials();
    }
}

// 完成魔药
function completePotion() {
    const materials = state.currentPotion.materials;
    
    let potionResult = null;
    for (const recipe of POTION_RECIPES) {
        if (recipe.rule(materials)) {
            potionResult = recipe;
            break;
        }
    }
    
    if (!potionResult) {
        potionResult = {
            name: '神秘混合药剂',
            color: blendColors(materials.map((m, i) => ({ color: m.color, weight: 1/materials.length }))),
            quality: 'common',
            desc: '独一无二的创造'
        };
    }
    
    // 🎆 检查是否在新年期间
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const isNewYear = (month === 12 && day >= 25) || (month === 1 && day <= 7);
    
    if (isNewYear) {
        potionResult.name = potionResult.name + ' · 2026新年版';
        potionResult.originalDesc = potionResult.desc;
        potionResult.isNewYearEdition = true;
        
        const isFirstHour = month === 1 && day === 1 && now.getHours() === 0;
        if (isFirstHour) {
            potionResult.name = '✨ ' + potionResult.name + ' ✨';
            potionResult.doubleBlessing = true;
        }
        
        window.tempPotionResult = potionResult;
        window.tempPotionMaterials = materials;
        
        document.getElementById('wishModal').classList.add('active');
        document.getElementById('wishInput').value = '';
        document.getElementById('wishInput').focus();
        
        playSound(523, 0.3, 0);
        setTimeout(() => playSound(659, 0.3, 0), 150);
        setTimeout(() => playSound(784, 0.3, 0), 300);
        setTimeout(() => playSound(880, 0.3, 0), 450);
        
        createFireworks();
        
        return;
    }
    
    finalizePotionCompletion(potionResult, materials);
}

// 提交愿望
function submitWish() {
    const wish = document.getElementById('wishInput').value.trim();
    
    if (!wish) {
        alert('请输入你的新年愿望哦！✨');
        return;
    }
    
    document.getElementById('wishModal').classList.remove('active');
    
    const potionResult = window.tempPotionResult;
    const materials = window.tempPotionMaterials;
    
    const wishColor = getWishColor(wish);
    potionResult.wishColor = wishColor;
    
    let newYearDesc = `🎆 2026新年特别版 🎆\n\n💫 你的愿望："${wish}"\n\n`;
    
    if (potionResult.doubleBlessing) {
        newYearDesc += `✨ 新年第一小时许愿，双倍灵验！✨\n\n`;
    }
    
    newYearDesc += `原魔药效果：${potionResult.originalDesc}`;
    
    potionResult.desc = newYearDesc;
    potionResult.wish = wish;
    
    finalizePotionCompletion(potionResult, materials);
    
    delete window.tempPotionResult;
    delete window.tempPotionMaterials;
    
    setTimeout(() => {
        showNewYearEasterEgg(wish, potionResult.doubleBlessing);
    }, 1000);
}

// 获取愿望颜色
function getWishColor(wish) {
    if (wish.includes('学习') || wish.includes('知识') || wish.includes('读书')) {
        return '#4A90E2';
    }
    if (wish.includes('健康') || wish.includes('运动') || wish.includes('身体')) {
        return '#6B8E23';
    }
    if (wish.includes('事业') || wish.includes('工作') || wish.includes('成功')) {
        return '#DAA520';
    }
    if (wish.includes('爱情') || wish.includes('幸福') || wish.includes('家人')) {
        return '#FF69B4';
    }
    if (wish.includes('魔药') || wish.includes('番茄钟') || wish.includes('专注')) {
        return '#9B59B6';
    }
    return '#FFD700';
}

// 新年彩蛋
function showNewYearEasterEgg(wish, isDoubleBlessing) {
    let message = '🎊 2026年，愿你所愿皆成真！';
    
    if (isDoubleBlessing) {
        message = '🎆 新年快乐！在2026年第一个小时许愿，双倍灵验！';
    } else if (wish.includes('魔药') || wish.includes('番茄钟')) {
        message = '🧙‍♂️ 主人真是热爱学习呢！2026年一起加油！';
    }
    
    const eggEl = document.createElement('div');
    eggEl.className = 'cute-easter-egg';
    eggEl.style.width = '280px';
    eggEl.innerHTML = `
        <div class="easter-egg-icon">🎉</div>
        <div class="easter-egg-text">${message}</div>
    `;
    
    document.body.appendChild(eggEl);
    
    playSound(880, 0.2, 0);
    setTimeout(() => playSound(1047, 0.3, 0), 200);
    
    setTimeout(() => eggEl.remove(), 4000);
}

// 烟花特效
function createFireworks() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.style.position = 'fixed';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 60 + '%';
            firework.style.width = '5px';
            firework.style.height = '5px';
            firework.style.borderRadius = '50%';
            firework.style.background = ['#FFD700', '#FF6B35', '#7EC8E3', '#9B59B6', '#90EE90', '#FF69B4'][Math.floor(Math.random() * 6)];
            firework.style.boxShadow = `0 0 15px ${firework.style.background}`;
            firework.style.zIndex = '9999';
            firework.style.animation = 'fireworkExplode 1.2s ease-out forwards';
            
            document.body.appendChild(firework);
            setTimeout(() => firework.remove(), 1200);
        }, i * 80);
    }
}

// 完成魔药最终处理
function finalizePotionCompletion(potionResult, materials) {
    state.currentPotion.name = potionResult.name;
    state.currentPotion.finalColor = potionResult.color;
    state.currentPotion.quality = potionResult.quality;
    state.currentPotion.description = potionResult.desc;
    state.currentPotion.wish = potionResult.wish || null;
    state.currentPotion.wishColor = potionResult.wishColor || null;
    state.currentPotion.isNewYearEdition = potionResult.isNewYearEdition || false;
    state.currentPotion.status = 'completed';
    state.currentPotion.completedDate = new Date().toISOString();
    
    const completed = getCompletedPotions();
    completed.push(state.currentPotion);
    localStorage.setItem('completedPotions', JSON.stringify(completed));
    
    localStorage.removeItem('currentPotion');
    
    state.currentPotion = {
        id: 'potion_' + Date.now(),
        totalTime: 0,
        materials: [],
        status: 'brewing',
        startDate: new Date().toISOString()
    };
    
    updateProgressDisplay();
    updatePotionColor();
    renderAvailableMaterials();
    
    const descLines = potionResult.desc.split('\n\n');
    const mainDesc = descLines[descLines.length - 1];
    alert(`🎉 恭喜！你炼制出了：${potionResult.name}！\n${mainDesc}\n\n可以在陈列室查看所有魔药。`);
    
    playSound(659, 0.3, 300);
    setTimeout(() => playSound(784, 0.3, 300), 200);
    setTimeout(() => playSound(880, 0.3, 500), 400);
}

function updateDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    document.getElementById('timerDisplay').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateLiquidLevel() {
    const progress = 1 - (state.timeLeft / (25 * 60));
    const height = Math.min(progress * 100, 100);
    document.getElementById('potionLiquid').style.height = height + '%';
}

function updateProgressDisplay() {
    document.getElementById('totalTime').textContent = state.currentPotion.totalTime;
    document.getElementById('materialCount').textContent = state.currentPotion.materials.length;
    
    const slotContent = document.getElementById('slotContent');
    const addedMaterials = document.getElementById('addedMaterials');
    
    if (state.currentPotion.materials.length === 0) {
        slotContent.innerHTML = '<p style="color: #9d7cd8;">尚未添加任何原料</p>';
        addedMaterials.innerHTML = '<p style="color: #9d7cd8;">空空如也</p>';
    } else {
        slotContent.innerHTML = state.currentPotion.materials.map((m, i) => 
            `<div class="slot-item">${m.icon} ${m.name}</div>`
        ).join('');
        
        addedMaterials.innerHTML = state.currentPotion.materials.map((m, i) => 
            `<div class="added-item">
                <span class="icon">${m.icon}</span>
                <span class="name">${m.name}</span>
            </div>`
        ).join('');
    }
}

function getCompletedPotions() {
    const saved = localStorage.getItem('completedPotions');
    return saved ? JSON.parse(saved) : [];
}

function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    if (tab === 'brewing') {
        document.getElementById('brewing-view').style.display = 'flex';
        document.getElementById('gallery-view').classList.remove('active');
    } else {
        document.getElementById('brewing-view').style.display = 'none';
        document.getElementById('gallery-view').classList.add('active');
        loadGallery();
    }
}

function loadGallery() {
    const potions = getCompletedPotions();
    const list = document.getElementById('potionList');
    
    if (potions.length === 0) {
        list.innerHTML = '<p style="text-align: center; color: #9d7cd8; grid-column: 1/-1;">暂无完成的魔药，开始你的炼制之旅吧！</p>';
        return;
    }
    
    list.innerHTML = potions.reverse().map(p => `
        <div class="potion-card">
            <span class="potion-quality quality-${p.quality}">${getRarityText(p.quality)}</span>
            <div class="potion-preview" style="background: ${p.finalColor}; box-shadow: inset 0 -5px 15px rgba(0,0,0,0.3), 0 0 20px ${typeof p.finalColor === 'string' && p.finalColor.startsWith('#') ? p.finalColor : 'rgba(157, 124, 216, 0.5)'}"></div>
            <h3>${p.name}</h3>
            <div class="potion-details">
                ${p.isNewYearEdition ? '<div style="text-align: center; margin-bottom: 12px; font-size: 1.1em;">🎆 2026新年特别版 🎆</div>' : ''}
                ${p.wish ? `<p style="background: rgba(255, 215, 0, 0.15); padding: 10px; border-radius: 8px; border-left: 3px solid ${p.wishColor || '#FFD700'}; margin-bottom: 12px;"><strong style="color: ${p.wishColor || '#FFD700'};">💫 愿望：</strong>${p.wish}</p>` : ''}
                <p style="font-style: italic; color: #9d7cd8; margin-bottom: 10px;">${p.description.includes('原魔药效果：') ? p.description.split('原魔药效果：')[1] : p.description.split('\n\n')[p.description.split('\n\n').length - 1]}</p>
                <p>🕐 总时长: ${p.totalTime} 分钟</p>
                <p>📅 完成: ${new Date(p.completedDate).toLocaleDateString()}</p>
                <p style="margin-top: 10px;">🧪 配方:</p>
                ${p.materials.map(m => `<p style="margin-left: 15px;">• ${m.icon} ${m.name}</p>`).join('')}
            </div>
        </div>
    `).join('');
}

function playSound(frequency, duration, delay = 0) {
    setTimeout(() => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }, delay);
}

init();