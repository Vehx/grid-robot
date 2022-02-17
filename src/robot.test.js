const Robot = require('./robot');
const Grid = require('./grid');

// robot tests
describe('Create default robot', () => {
    it('should return position 0, 0', () => {
        const robot = new Robot();

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

describe('Move robot forward', () => {
    it('should return position 1, 0 and face south', () => {
        const robot = new Robot(0, 0, 'South');
        const grid = new Grid(50, 50);
        robot.move('f', grid);

        expect(robot.position()).toEqual('1, 0');
        expect(robot.face()).toEqual('SOUTH');
    });
});

describe('Change robot facing', () => {
    it('should return position 0, 0 and face east', () => {
        const robot = new Robot(50, 50, 'South');
        const grid = new Grid(50, 50);
        robot.move('l', grid);

        expect(robot.position()).toEqual('0, 0');
        expect(robot.face()).toEqual('EAST');
    });
});