import { ethers } from "ethers";
import { mockContracts } from "@/data";
import { ListenerOptions } from "@/types";
import { abi } from "@/data/MultiTokenContract.json";

export class Listener {
  private _options;
  private _provider;
  private _contracts;

  constructor(options?: Partial<ListenerOptions>) {
    this._options = { ...Listener.DEFAULTS, ...options };
    this._provider = new ethers.providers.JsonRpcProvider(
      this._options.providerUrl
    );
    this._contracts = this._options.contracts.map((contract) => {
      return new ethers.Contract(contract.address, abi, this._provider);
    });
    this.listenForEvents().catch(console.error);
    this.listenForBlocks().catch(console.error);
  }

  async listenForEvents() {
    this._contracts.forEach((contract) => {
      contract.on("*", (event) => {
        console.log(event);
      });
    });
  }

  async listenForBlocks() {
    this._provider.on("block", (blockNumber) => {
      // Emitted on every block change
      console.log("block");
    });
  }

  static get DEFAULTS(): ListenerOptions {
    return {
      providerUrl: process.env.PROVIDER_URL || "",
      contracts: mockContracts,
    };
  }
}

export default Listener;
