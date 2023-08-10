import axios from 'axios';

export class PricePoller {
  private _interval: NodeJS.Timeout | null = null;
  private _price: number | null = null;

  constructor(private pollingInterval: number = 5000) {
    this.getEthereumPrice();
    this.start();
  }

  start() {
    this._interval = setInterval(() => {
      this.getEthereumPrice();
    }, this.pollingInterval);
  }

  stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  getEthereumPrice() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';

    axios.get(url)
      .then(response => {
        this._price = response.data.ethereum.usd;
        //console.debug(`Ethereum price in USD: ${this._price}`);
      })
      .catch(error => {
        console.error(`An error occurred: ${error}`);
      });
  }

  getRecentPrice(): number | null {
    return this._price;
  }
}

export function createPoller(interval: number = 5000) {
  return new PricePoller(interval);
}
