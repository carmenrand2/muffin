// Game State
let game = {
    muffins: 0,
    totalMuffins: 0,
    mps: 0,
    startTime: Date.now(),
    upgrades: {
        cursor: {
            id: 'cursor',
            name: 'Pink Cursor',
            cost: 15,
            baseCost: 15,
            mps: 0.1,
            count: 0,
            icon: '👆' // Keeping emoji for cursor for now or use image if generated
        },
        grandma: {
            id: 'grandma',
            name: 'Grandma',
            cost: 100,
            baseCost: 100,
            mps: 1,
            count: 0,
            icon: 'assets/grandma.png'
        },
        farm: {
            id: 'farm',
            name: 'Muffin Farm',
            cost: 1100,
            baseCost: 1100,
            mps: 8,
            count: 0,
            icon: 'assets/farm.png'
        },
        bakery: {
            id: 'bakery',
            name: 'Pink Bakery',
            cost: 12000,
            baseCost: 12000,
            mps: 47,
            count: 0,
            icon: 'assets/bakery.png'
        },
        factory: {
            id: 'factory',
            name: 'Candy Factory',
            cost: 130000,
            baseCost: 130000,
            mps: 260,
            count: 0,
            icon: 'assets/factory.png'
        }
    }
};

// DOM Elements
const muffinBtn = document.getElementById('muffin-btn');
const muffinCountDisplay = document.getElementById('muffin-count');
const mpsDisplay = document.getElementById('mps-display');
const upgradesList = document.getElementById('upgrades-list');

// Core Functions
function clickMuffin(e) {
    game.muffins++;
    game.totalMuffins++;
    updateDisplay();
    createParticle(e.clientX, e.clientY, '+1');
}

function buyUpgrade(upgradeId) {
    const upgrade = game.upgrades[upgradeId];
    if (game.muffins >= upgrade.cost) {
        game.muffins -= upgrade.cost;
        upgrade.count++;
        upgrade.cost = Math.ceil(upgrade.baseCost * Math.pow(1.15, upgrade.count));
        recalculateMPS();
        updateDisplay();
        renderUpgrades();
    }
}

function recalculateMPS() {
    let mps = 0;
    for (let key in game.upgrades) {
        mps += game.upgrades[key].count * game.upgrades[key].mps;
    }
    game.mps = mps;
}

function updateGame() {
    if (game.mps > 0) {
        const now = Date.now();
        const dt = (now - game.lastTick) / 1000;
        // Add muffins based on MPS
        // We use a small tick to make it smooth, but for logic we add per second
        // Actually, let's just add 1/10th of MPS every 100ms
    }
}

// Game Loop
setInterval(() => {
    if (game.mps > 0) {
        game.muffins += game.mps / 10;
        game.totalMuffins += game.mps / 10;
        updateDisplay();
    }
}, 100);

// UI Functions
function updateDisplay() {
    muffinCountDisplay.textContent = `${Math.floor(game.muffins)} Muffins`;
    mpsDisplay.textContent = `per second: ${game.mps.toFixed(1)}`;

    // Update upgrade buttons availability
    document.querySelectorAll('.upgrade-item').forEach(item => {
        const id = item.dataset.id;
        const upgrade = game.upgrades[id];
        if (game.muffins >= upgrade.cost) {
            item.classList.remove('disabled');
        } else {
            item.classList.add('disabled');
        }
    });
}

function renderUpgrades() {
    upgradesList.innerHTML = '';
    for (let key in game.upgrades) {
        const u = game.upgrades[key];
        const item = document.createElement('div');
        item.className = `upgrade-item ${game.muffins >= u.cost ? '' : 'disabled'}`;
        item.dataset.id = u.id;
        item.onclick = () => buyUpgrade(u.id);

        const iconContent = u.icon.includes('/')
            ? `<img src="${u.icon}" alt="${u.name}">`
            : u.icon;

        item.innerHTML = `
            <div class="upgrade-icon">${iconContent}</div>
            <div class="upgrade-info">
                <span class="upgrade-name">${u.name}</span>
                <span class="upgrade-cost">${u.cost} Muffins</span>
                <span class="upgrade-mps">+${u.mps} MPS</span>
            </div>
            <div class="upgrade-count">${u.count}</div>
        `;
        upgradesList.appendChild(item);
    }
}

function createParticle(x, y, text) {
    const particle = document.createElement('div');
    particle.className = 'click-particle';
    particle.textContent = text;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 1000);
}

// Save/Load System
function saveGame() {
    const saveString = JSON.stringify(game);
    localStorage.setItem('muffinClickerSave', saveString);
}

function loadGame() {
    const saveString = localStorage.getItem('muffinClickerSave');
    if (saveString) {
        const savedGame = JSON.parse(saveString);
        // Merge saved data with current game structure to handle updates
        game = { ...game, ...savedGame };

        // Re-initialize upgrades object to ensure methods/structure are correct if needed
        // (In this simple object case, direct merge is mostly fine, but let's be safe about missing new keys)
        // For now, direct merge is okay as we haven't changed structure.

        recalculateMPS();
        updateDisplay();
        renderUpgrades();
    }
}

// Auto-save every 30 seconds
setInterval(saveGame, 30000);

// Initialization
muffinBtn.addEventListener('click', clickMuffin);
loadGame(); // Load save on startup
renderUpgrades();
updateDisplay();

// Save before closing
window.addEventListener('beforeunload', saveGame);
