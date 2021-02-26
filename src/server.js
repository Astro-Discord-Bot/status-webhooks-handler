const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const configs = require('../config.json');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes(router));

app.listen(configs.server_port, () => console.log(`📡 Listening to status webhooks from 🛰 https://astro-bot.space/status on port ${configs.server_port}`));
