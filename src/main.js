import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {GetCryptos} from "./app/api/coinmarketcap/request.crypto.js";
import {CryptocurrencyInterval} from "./domain/cryptocurrencies/cryptocurrency.interval.js";
import {WriteFileRepository} from "./domain/repositories/files/write.js";

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

const getCryptos = new GetCryptos(router, '/cryptos');
getCryptos.configure('get');

app.use('/', router);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

console.log("Timestamp fetching prices");

const cryptocurrencyInterval = new CryptocurrencyInterval();
setTimeout(() => {
  cryptocurrencyInterval.fetchCurrency(1)
    .then(data => {
      console.log("Retrieved crypto");
      console.log(data);
      const writeFileRepository = new WriteFileRepository();
      writeFileRepository.put('example.json', data);
    });
}, 5000);
