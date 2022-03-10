# grid-robot
Api for moving a robot on a grid
Made using JS, jest, supertest and TDD

# Install

clone project
npm install

# Requirements

node and npm

# Test

npm test to run test suite

or start api with npm start
send post request using postman or similar to localhost:2222

use this format
{
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
}
