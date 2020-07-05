import expressWs from 'express-ws';

export class WebSocketManager {
  constructor(app) {
    this.wsInstance = expressWs(app);
    this.app = app;
  }

  prepare() {
    console.log("Usage of ws configured, it does not expect client-side communication");
    this.app.ws('/ws', (ws, req) => {
    });
  }

  broadcast(message) {
    const cleanMessage = typeof message === 'string' ? message : JSON.stringify(message);
    for (let ws of this.wsInstance.getWss().clients) {
      ws.send(cleanMessage);
    }
  }
}