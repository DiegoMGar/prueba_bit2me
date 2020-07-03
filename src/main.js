import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {GetCryptos} from "./app/api/coinmarketcap/request.crypto.js";
import {CryptocurrencyInterval} from "./domain/cryptocurrencies/cryptocurrency.interval.js";
import CryptocurrencyRedis from "./domain/repositories/redis/cryptocurrency.redis.js";

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
cryptoRequest();

function cryptoRequest() {
  setTimeout(() => {
    cryptoRequest();
  }, 60000);
  cryptocurrencyInterval.fetchCurrency(1)
    .then(data => {
      console.log("Retrieved crypto", data.status.timestamp);
      const CRedis = new CryptocurrencyRedis();
      CRedis.connect()
        .then(() => {
          const btc = {...data.data.BTC.quote};
          btc.symbol = "BTC";
          const eth = {...data.data.ETH.quote};
          eth.symbol = "ETH";
          return Promise.all([
            CRedis.writeOne(btc),
            CRedis.writeOne(eth)
          ])
        })
        .then((results) => {
          console.log("Prices written")
        })
        .catch((err)=>{
          console.log("Error writing new prices");
          console.log(err);
        })
    });
}