import levelup from "levelup";
import leveldown from "leveldown";

import { EthereumAddress, DatabaseKey, ParsedEvent } from "@/types";

const PADDING = 12;

export class EventDatabase {
  private _db;

  constructor(name?: string) {
    this._db = levelup(leveldown(`./.${name || "events"}`));
  }

  async get(key: EthereumAddress) {
    const count = await this._keyCount(key);
    console.log(count);
    const internalKey = this._createDatabaseKey(key, count);

    return await this._db.get(internalKey);
  }

  async put(key: EthereumAddress, value: ParsedEvent) {
    return value;
  }

  private async _keyCount(key: EthereumAddress): Promise<number> {
    let count;
    try {
      count = parseInt(await this.get(key), 10);
    } catch (e) {
      count = 0;
    }
    return count;
  }
  // Padding should never change, 12 digits gives each contract
  // space for 31,000 years worth of blocks
  private _padNumber(n: number) {
    return n.toString().padStart(PADDING, "0");
  }

  private _createDatabaseKey(key: string, count: number): DatabaseKey {
    const paddedCount = this._padNumber(count);
    return `${key}:${paddedCount}`;
  }
}
