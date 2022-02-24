/* 

Robot Challenge
• Develop an api that moves a robot around on a grid (flat surface with defined size)
• Grid position (0, 0) should be the upper left corner
• You are given the initial starting point (x,y) of a robot and the direction (N,S,E,W) it is facing.
• The robot receives an array of commands.
• Implement commands that move the robot forward/backward (f,b).
• Implement commands that turn the robot left/right (l,r).
• “If a given sequence of commands encounters an obstacle or is out of bounds, the robot should stop and report the obstacle. For example if it hits an obstacle or wall it should stop immediately without executing any more commands.
• Implement detection if the new position is inside the bounds before moving to the new position.
• Implement obstacle detection before each move to a new square.
Test Cases
• The robot is on a 100×100 grid at location (0, 0) and facing SOUTH. The robot is given the commands “fflff” and should end up at (2, 2)
• The robot is on a 50×50 grid at location (1, 1) and facing NORTH. The robot is given the commands “fflff” and should end up at (1, 0)
• The robot is on a 100×100 grid at location (50, 50) and facing NORTH. The robot is given the commands “fflffrbb” but there is an obstacle at (48, 50) and should end up at (48, 49)
Bonus
• Ability to implement different rule sets for flat surface or a globe where you warp when you get out of bounds
Hints: use multiple classes, TDD and a healthy approach to VCS

*/

const request = require('supertest');
const app = require('./index');

describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    });
});

describe('Get /', () => {
    it('responds with message', async () => {
        const response = await request(app)
            .get('/')
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.message).toEqual('We made it');
    });
});

// case 1 
// The robot is on a 100×100 grid at location (0, 0) and facing SOUTH. The robot is given the commands “fflff” and should end up at (2, 2)

// grid(100,100)
// robot.face("south")
// robot.move("fflff")
// robot.postition returns (2,2)

describe('Case 1: Move robot on 100,100 grid', () => {
    it('should return position 2,2', async () => {
        const response = await request(app)
            .post('/')
            .send({
                grid:{
                    x: 100,
                    y: 100
                },
                robot:{
                    x: 0,
                    y: 0,
                    face: 'south',
                    move: 'fflff'
                }
            })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.position).toEqual('2, 2');
        expect(response.body.isOutOfBounds).toEqual(false);
        expect(response.body.ranIntoObstacle).toEqual(false);
        expect(response.body.facing).toEqual('EAST');
    });
});

// case 2
// The robot is on a 50×50 grid at location (1, 1) and facing NORTH. The robot is given the commands “fflff” and should end up at (1, 0)

// grid(50,50)
// robot.face("north")
// robot.move("fflff")
// robot.postition returns (1,0)

describe('Case 2: Move robot on 50,50 grid', () => {
    it('should return position 1,0', async () => {
        const response = await request(app)
            .post('/')
            .send({
                grid:{
                    x: 50,
                    y: 50
                },
                robot:{
                    x: 1,
                    y: 1,
                    face: 'north',
                    move: 'fflff'
                }
            })
            .set('Accept', 'application/json');
        expect(response.status).toEqual(200);
        expect(response.body.position).toEqual('1, 0');
        expect(response.body.isOutOfBounds).toEqual(true);
        expect(response.body.ranIntoObstacle).toEqual(false);
        expect(response.body.facing).toEqual('NORTH');
    });
});

// case 3
// The robot is on a 100×100 grid at location (50, 50) and facing NORTH. The robot is given the commands “fflffrbb” but there is an obstacle at (48, 50) and should end up at (48, 49)

// grid(100,100)
// grid.obstacle(48,50)
// robot.face("north")
// robot.move("fflffrbb")
// robot.postition returns (48,49)

describe('Case 3: Move robot on 100,100 grid with obstacle', () => {
    it('should return position 48,49', async () => {
        const response = await request(app)
            .post('/')
            .send({
                grid:{
                    x: 100,
                    y: 100,
                    obstacle: [{x: 50 ,y: 48}]
                },
                robot:{
                    x: 50,
                    y: 50,
                    face: 'north',
                    move: 'fflffrbb'
                }
            })
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
        expect(response.body.position).toEqual('48, 49');
        expect(response.body.isOutOfBounds).toEqual(false);
        expect(response.body.ranIntoObstacle).toEqual(true);
        expect(response.body.facing).toEqual('NORTH');
    });
});