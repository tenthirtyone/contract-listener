import { EventDatabase } from "../src/db";
import fs from "fs";
import expect from "expect";

describe("EventDatabase", () => {
  let db: EventDatabase;

  const event1 = {
    blockNumber: 0,
    blockHash: "0xabcabcabcaaaa",
    address: "0x123",
    transactionHash: "0defdefdefdddd",
    event: "TokenMint",
    data: {},
  };
  const event2 = {
    blockNumber: 1,
    blockHash: "0xabcabcabcabbbbbb",
    address: "0x123",
    transactionHash: "0defdefdefdeeee",
    event: "TokenMint",
    data: {},
  };
  const event3 = {
    blockNumber: 1,
    blockHash: "0xabcabcabcabccccc",
    address: "0x123",
    transactionHash: "0defdefdefdefffff",
    event: "TokenMint",
    data: {},
  };

  beforeEach(() => {
    db = new EventDatabase("_test");
  });

  afterEach(async () => {
    fs.rmSync("_test", { recursive: true, force: true });
  });

  it("put should add a record to the database", async () => {
    const result = await db.put("0x123", event1);

    expect(result).toEqual(event1);
  });

  it("get should return undefined for non-existent key", async () => {
    const result = await db.get("non-existent");
    expect(result).toBeUndefined();
  });

  it("key count for a non-existent key should be zero", async () => {
    const count = await db["_keyCount"]("non-existent");
    expect(count).toBe(0);
  });
});
