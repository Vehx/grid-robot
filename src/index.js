const express = require('express');
const app = express();
const port = process.env.port || 2222;

app.listen(port, () => {
    const datetime = new Date();
    const message = `Server running on port: ${port} Started at: ${datetime}`;
    console.log(message);
});

app.get('/', (req, res) => {
    res.send({
        message: 'We made it poggies'
    });
});