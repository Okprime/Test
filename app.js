require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./route/router')
const {msisdn} = require('./models/msisdn')

const port = process.env.PORT;
app.use(router);


app.get('/', (req, res) => {
    res.send('Welcome to MSISDN API')
});

app.listen(port, () => {
    console.log(`Server is active on port ${port}`)
});