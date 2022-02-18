const Grid = require('./grid');

// Grid tests
describe('Create grid 50 50', () => {
    it('should return a 50 50 grid', () => {
        const grid = new Grid(50,50);

        expect(grid.x).toEqual(50);
        expect(grid.y).toEqual(50);
    });
});

describe('Create grid 100 100', () => {
    it('should return a 100 100 grid', () => {
        const grid = new Grid(100,100);

        expect(grid.x).toEqual(100);
        expect(grid.y).toEqual(100);
    });
});

describe('Create grid 10 10', () => {
    it('should not return a 100 100 grid', () => {
        const grid = new Grid(10,10);

        expect(grid.x).not.toEqual(100);
        expect(grid.y).not.toEqual(100);
    });
});

describe('Add obstacle to grid', () => {
    it('should add obstacle at x48 y50', () => {
        const grid = new Grid(100,100);
        grid.addObstacle(48,50);
        const obstacles = grid.obstacles;

        expect(obstacles[0].x).toEqual(48);
        expect(obstacles[0].y).toEqual(50);
    });
});