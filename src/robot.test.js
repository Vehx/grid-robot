const Robot = require('./robot');
const Grid = require('./grid');

// robot tests
describe('Create default robot', () => {
    it('should return position 0, 0', () => {
        const robot = new Robot(0, 0, 'North');

        expect(robot.position()).toEqual('0, 0');
        expect(robot.face()).toEqual('NORTH');
    });
});

describe('Create custom robot', () => {
    it('should return position 50, 50 and face south', () => {
        const robot = new Robot(50, 50, 'South');

        expect(robot.position()).toEqual('50, 50');
        expect(robot.face()).toEqual('SOUTH');
    });
});

describe('Calculate move forward', () => {
    it('should return object with x 1 and y 0', () => {
        const robot = new Robot(0, 0, 'South');
        const nextPosition = robot.calculateNextMove('f');
        expect(nextPosition.x).toEqual(1);
        expect(nextPosition.y).toEqual(0);
    });
});

describe('Calculate move backward', () => {
    it('should return object with x 0 and y 1', () => {
        const robot = new Robot(0, 0, 'west');
        const nextPosition = robot.calculateNextMove('b');
        expect(nextPosition.x).toEqual(0);
        expect(nextPosition.y).toEqual(1);
    });
});

describe('Change direction robot is facing left', () => {
    it('should return face south', () => {
        const robot = new Robot(0, 0, 'west');
        robot.changeFacing('l');

        expect(robot.face()).toEqual('SOUTH');
    });
});

describe('Change direction robot is facing right', () => {
    it('should return face south', () => {
        const robot = new Robot(0, 0, 'east');
        robot.changeFacing('r');

        expect(robot.face()).toEqual('SOUTH');
    });
});

describe('Check if next move is out of bounds', () => {
    it('should return false', () => {
        const robot = new Robot(49, 50, 'South');
        const grid = new Grid(50, 50);
        robot.checkOutOfBounds(50, 50, grid);

        expect(robot.isOutOfBounds).toEqual(false);
    });
    it('should return false', () => {
        const robot = new Robot(1, 0, 'North');
        const grid = new Grid(50, 50);
        robot.checkOutOfBounds(0, 0, grid);

        expect(robot.isOutOfBounds).toEqual(false);
    });
    it('should return false', () => {
        const robot = new Robot(20, 20, 'North');
        const grid = new Grid(50, 50);
        robot.checkOutOfBounds(19, 20, grid);

        expect(robot.isOutOfBounds).toEqual(false);
    });
});

describe('Check if next move is out of bounds', () => {
    it('should return true', () => {
        const robot = new Robot(50, 50, 'South');
        const grid = new Grid(50, 50);
        robot.checkOutOfBounds(51, 50, grid);

        expect(robot.isOutOfBounds).toEqual(true);
    });
    it('should return true', () => {
        const robot = new Robot(0, 0, 'north');
        const grid = new Grid(50, 50);
        robot.checkOutOfBounds(-1, 0, grid);

        expect(robot.isOutOfBounds).toEqual(true);
    });
    it('should return true', () => {
        const robot = new Robot(0, 0, 'west');
        const grid = new Grid(50, 50);
        robot.checkOutOfBounds(0, -1, grid);

        expect(robot.isOutOfBounds).toEqual(true);
    });
});

describe('Check if next move is running into obstacle', () => {
    it('should return false', () => {
        const robot = new Robot(49, 50, 'South');
        const grid = new Grid(50, 50);
        grid.addObstacle(1,1);
        robot.checkForObstacle(50, 50, grid);

        expect(robot.ranIntoObstacle).toEqual(false);
    });
    it('should return false', () => {
        const robot = new Robot(1, 0, 'North');
        const grid = new Grid(50, 50);
        grid.addObstacle(1,1);
        grid.addObstacle(0,1);
        robot.checkForObstacle(0, 0, grid);

        expect(robot.ranIntoObstacle).toEqual(false);
    });
    it('should return false', () => {
        const robot = new Robot(20, 20, 'North');
        const grid = new Grid(50, 50);
        grid.addObstacle(1,1);
        grid.addObstacle(1,20);
        grid.addObstacle(19,10);
        robot.checkForObstacle(19, 20, grid);

        expect(robot.ranIntoObstacle).toEqual(false);
    });
});

describe('Check if next move is running into obstacle', () => {
    it('should return true', () => {
        const robot = new Robot(50, 50, 'South');
        const grid = new Grid(50, 50);
        grid.addObstacle(49,50);
        robot.checkForObstacle(49, 50, grid);

        expect(robot.ranIntoObstacle).toEqual(true);
    });
    it('should return true', () => {
        const robot = new Robot(0, 0, 'north');
        const grid = new Grid(50, 50);
        grid.addObstacle(1,1);
        grid.addObstacle(1,0);
        robot.checkForObstacle(1, 0, grid);

        expect(robot.ranIntoObstacle).toEqual(true);
    });
    it('should return true', () => {
        const robot = new Robot(0, 0, 'west');
        const grid = new Grid(50, 50);
        grid.addObstacle(1,1);
        grid.addObstacle(1,2);
        grid.addObstacle(4,2);
        robot.checkForObstacle(1, 2, grid);

        expect(robot.ranIntoObstacle).toEqual(true);
    });
});

describe('Move robot forward', () => {
    it('should return position 0, 1 and face south', () => {
        const robot = new Robot(0, 0, 'South');
        const grid = new Grid(50, 50);
        robot.move('f', grid);

        expect(robot.position()).toEqual('0, 1');
        expect(robot.face()).toEqual('SOUTH');
    });
});

describe('Change robot facing', () => {
    it('should return position 0, 0 and face east', () => {
        const robot = new Robot(0, 0, 'South');
        const grid = new Grid(50, 50);
        robot.move('l', grid);

        expect(robot.position()).toEqual('0, 0');
        expect(robot.face()).toEqual('EAST');
    });
});

describe('Move robot forward and change direction', () => {
    it('should return position 1, 1 and face east', () => {
        const robot = new Robot(0, 0, 'South');
        const grid = new Grid(50, 50);
        robot.move('flf', grid);

        expect(robot.position()).toEqual('1, 1');
        expect(robot.face()).toEqual('EAST');
    });
});

describe('Move robot forward and change direction', () => {
    it('should return position 2, 2 and face east', () => {
        const robot = new Robot(0, 0, 'SOUTH');
        const grid = new Grid(100, 100);
        robot.move('fflff', grid);

        expect(robot.isOutOfBounds).toEqual(false);
        expect(robot.ranIntoObstacle).toEqual(false);
        expect(robot.position()).toEqual('2, 2');
        expect(robot.face()).toEqual('EAST');
    });
});

describe('Move robot forward and change direction', () => {
    it('should return position 1, 0 and face west', () => {
        const robot = new Robot(1, 1, 'North');
        const grid = new Grid(50, 50);
        robot.move('fflff', grid);

        expect(robot.isOutOfBounds).toEqual(true);
        expect(robot.ranIntoObstacle).toEqual(false);
        expect(robot.position()).toEqual('1, 0');
        expect(robot.face()).toEqual('NORTH');
    });
});

describe('Move robot forward and change direction', () => {
    it('should return position 48, 49 and face east', () => {
        const robot = new Robot(50, 50, 'North');
        const grid = new Grid(100, 100);
        grid.addObstacle(50,48);
        robot.move('fflffrbb', grid);

        expect(robot.isOutOfBounds).toEqual(false);
        expect(robot.ranIntoObstacle).toEqual(true);
        expect(robot.position()).toEqual('48, 49');
        expect(robot.face()).toEqual('NORTH');
    });
});