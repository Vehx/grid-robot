const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 2222;
const Grid = require('./grid');
const Robot = require('./robot');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        message: 'We made it'
    });
});

app.post('/', async (req, res) => {
    const robot = new Robot(req.body.robot.x, req.body.robot.y, req.body.robot.face);
    const grid = new Grid(req.body.grid.x, req.body.grid.y);

    if (req.body.grid.obstacle) {
        req.body.grid.obstacle.forEach(obstacle => {
            grid.addObstacle(obstacle.x, obstacle.y);
        });
    };

    const moved = await robot.move(req.body.robot.move.toString(), grid);
    
    if (moved) {
        res.json({
            status: robot.status,
            isOutOfBounds: robot.isOutOfBounds,
            ranIntoObstacle: robot.ranIntoObstacle,
            facing: robot.face(),
            position: robot.position()
        });
    };
});

app.listen(port, () => {
    const datetime = new Date();
    const message = `Server running on port: ${port} Started at: ${datetime}`;
    // console.log(message);
});

module.exports = app;