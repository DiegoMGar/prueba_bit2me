import * as fs from "fs";
import config from "./config.js"
import path from "path";

export class WriteFileRepository {
  put(table, data) {
    const tablePath = path.join(config.dbPath, table);
    fs.writeFileSync(tablePath, JSON.stringify(data, null, 2));
  }
}