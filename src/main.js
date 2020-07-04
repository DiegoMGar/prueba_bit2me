import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {CryptocurrencyInterval} from './domain/coinmarketcap/cryptocurrency.interval.js';
import {Historical} from './app/api/cryptocurrencies/historical.js';
import {Mailing} from "./domain/mailing/mailing.js";

const app = express();
const router = express.Router();
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

// SWAGGER CONFIG
router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(swaggerDocument));

router.get('/', function (req, res) {
  res.send({msg: 'Esta es la prueba técnica de Bit2me'});
});

const historical = new Historical(router, '/api/historical/:symbol');
historical.configure('get');

app.use('/', router);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

console.log('Timestamp fetching prices');

const cryptocurrencyInterval = new CryptocurrencyInterval();
cryptocurrencyInterval.prepare();

const autoMailing = new Mailing();
autoMailing.prepare();