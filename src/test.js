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
// const api = require('./index');
const express = require('express');
const res = require('express/lib/response');
const app = express();

describe('Sample Test', () => {
    it('should test that true === true', () => {
      expect(true).toBe(true)
    });
});

describe('Get /', () => {
    it('responds with message', () => {
        // res = api.get('/');
        // const res = app.get('/');
        // const res = request(api)
        request(app)
            .get('/')
            .expect(() => ('message' in res.body))
            .expect(() => ('We did it' in res.body.message))
            .expect(200);
            // .end((err, res) => {
            //     if (err) throw err;
            // });
            // .expect(res).toHaveProperty('message');
            // .expect(message).toEqual('We did it');
        // expect(res).toEqual({message:'We did it'});
        // done();
    });
});


// case 1 
// The robot is on a 100×100 grid at location (0, 0) and facing SOUTH. The robot is given the commands “fflff” and should end up at (2, 2)

// grid(100,100)
// robot.face("south")
// robot.move("fflff")
// robot.postition returns (2,2)

// case 2
// The robot is on a 50×50 grid at location (1, 1) and facing NORTH. The robot is given the commands “fflff” and should end up at (1, 0)

// grid(50,50)
// robot.face("north")
// robot.move("fflff")
// robot.postition returns (1,0)

// case 3
// The robot is on a 100×100 grid at location (50, 50) and facing NORTH. The robot is given the commands “fflffrbb” but there is an obstacle at (48, 50) and should end up at (48, 49)

// grid(100,100)
// grid.obstacle(48,50)
// robot.face("north")
// robot.move("fflffrbb")
// robot.postition returns (48,49)