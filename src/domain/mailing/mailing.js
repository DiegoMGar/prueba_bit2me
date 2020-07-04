import nodemailer from 'nodemailer';
import {CryptocurrenciesService} from "../services/cryptocurrencies/Cryptocurrencies.service.js";

export class Mailing {
  constructor() {
    this.user = process.env.BIT2ME_SESUSER;
    this.pass = process.env.BIT2ME_SESPASSWORD;
    this.mailIntervalSeconds = 60 * 60 * 2; // 2 horas
  }

  getBothDatasets() {
    const cryptoService = new CryptocurrenciesService();
    const datasets = [];
    return cryptoService.readBySymbol("BTC")
      .then(data => {
        datasets.push(data);
        return cryptoService.readBySymbol("ETH")
      })
      .then(data => {
        datasets.push(data);
        return Promise.resolve(datasets);
      });
  }

  prepare() {
    setInterval(() => {
      this.sendmailWithPrices();
    }, this.mailIntervalSeconds * 1000);
  }

  sendMail(from, to, cc, bcc, subject, body, attachments) {
    const transport = nodemailer.createTransport({
      host: 'email-smtp.eu-west-1.amazonaws.com', // Amazon email SMTP hostname
      secureConnection: true, // use SSL
      port: 465, // port for secure SMTP
      auth: {
        user: this.user, // Use from Amazon Credentials
        pass: this.pass // Use from Amazon Credentials
      }
    });
    const mailOptions = {
      from,
      to,
      cc,
      bcc,
      subject,
      html: body,
      attachments
    };
    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, function (err, response) {
        if (err) {
          console.log(err);
          reject(err)
        } else {
          console.log('Message sent: ' + response.accepted);
          resolve(response.accepted);
        }
        transport.close();
      });
    });
  }

  sendmailWithPrices() {
    return this.getBothDatasets()
      .then((data) => {
        const bodyTitle = "<p><em>Este correo es parte de la prueba técnica de Diego Maroto</em></p>" +
          "<p><em>El código está en: <a href='https://github.com/DiegoMGar/prueba_bittome'>Repo Prueba Bit2me</a></em></p>";
        const bodyES = "<h2>Seguimiento de precios</h2>" +
          "<p><b>Aquí tienes los precios del BTC y ETH en los últimos 100 minutos!</b></p>" +
          "<p>Si no quieres seguir recibiendo estos emails, lo sentimos, no te puedes desuscribir</p>" +
          "<p><small>Este email se ha generado de forma automática, no respondas.</small></p>";
        const bodyEN = "<h2>Price tracking</h2>" +
          "<p><b>Here are the prices of BTC and ETH in the last 100 minutes!</b></p>" +
          "<p>If you do not want to continue receiving these emails, we are sorry, you cannot unsubscribe</p>" +
          "<p><small>This email has been generated automatically, do not reply.</small></p>";
        const body = `${bodyTitle}<hr>${bodyES}<hr>${bodyEN}`;
        const from = 'Diego Maroto <info@reactivecloud.es>';
        const to = 'Bit2me dev test <dev-test@team.bit2me.com>';
        const cc = 'Diego Maroto <diego.diemg@gmail.com>';
        const cco = null;
        const subject = 'Prueba tecnica precios automáticos';
        const attachments = [
          {
            filename: 'prices.json',
            content: JSON.stringify(data.map(dataset => this.cleanDataset(dataset.data)), null, 2),
            contentType: 'text/plain',
          }
        ];
        return this.sendMail(from, to, cc, cco, subject, body, attachments)
      });
  }

  cleanDataset(dataset) {
    return dataset.map(set => {
      return {
        symbol: set.symbol,
        price: set.price,
        marketCap: set.market_cap,
        timestamp: set.last_updated,
      }
    });
  }
}