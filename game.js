// Game State
export let game = {
    muffins: 0,
    totalMuffins: 0,
    mps: 0,
    startTime: Date.now(),
    upgrades: {
        cursor: {
            id: 'cursor',
            name: 'Supermarket Muffins',
            cost: 15,
            baseCost: 15,
            mps: 0.1,
            count: 0,
            icon: 'assets/muffin.png'
        },
        grandma: {
            id: 'grandma',
            name: 'Home Kitchen',
            cost: 100,
            baseCost: 100,
            mps: 1,
            count: 0,
            icon: 'assets/grandma.png'
        },
        farm: {
            id: 'farm',
            name: 'Muffin Stand',
            cost: 1100,
            baseCost: 1100,
            mps: 8,
            count: 0,
            icon: 'assets/stand.png'
        },
        bakery: {
            id: 'bakery',
            name: 'Corner Bakery',
            cost: 12000,
            baseCost: 12000,
            mps: 47,
            count: 0,
            icon: 'assets/bakery.png'
        },
        factory: {
            id: 'factory',
            name: 'Fancy Patisserie',
            cost: 130000,
            baseCost: 130000,
            mps: 260,
            count: 0,
            icon: 'assets/patisserie.png'
        }
    }
};
