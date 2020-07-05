import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {CryptocurrencyInterval} from './domain/coinmarketcap/cryptocurrency.interval.js';
import {Historical} from './app/api/cryptocurrencies/historical.js';
import {Mailing} from "./domain/mailing/mailing.js";
import {WebSocketManager} from "./domain/websockets/WebSocketManager.js";

const app = express();
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
const port = process.env.BIT2ME_EXPRESS_PORT;

// SWAGGER CONFIG
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

router.get('/', function (req, res) {
  res.send({msg: 'Esta es la prueba técnica de Bit2me'});
});

const historical = new Historical(router, '/api/historical/:symbol');
historical.configure('get');

const webSocketManager = new WebSocketManager(app);
webSocketManager.prepare();

app.use('/', router);
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

const cryptocurrencyInterval = new CryptocurrencyInterval(webSocketManager);
cryptocurrencyInterval.prepare();

const autoMailing = new Mailing();
autoMailing.prepare();
