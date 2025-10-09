import { FeeCharged } from "./FeeCharged";
import { NewAdmin } from "./NewAdmin";
import { NewOperator } from "./NewOperator";
import { OrderCancelled } from "./OrderCancelled";
import { OrderFilled } from "./OrderFilled";
import { OrdersMatched } from "./OrdersMatched";
import { ProxyFactoryUpdated } from "./ProxyFactoryUpdated";
import { RemovedAdmin } from "./RemovedAdmin";
import { RemovedOperator } from "./RemovedOperator";
import { SafeFactoryUpdated } from "./SafeFactoryUpdated";
import { TokenRegistered } from "./TokenRegistered";
import { TradingPaused } from "./TradingPaused";
import { TradingUnpaused } from "./TradingUnpaused";

export default {
  name: "CTFExchange",
  parsers: [
    FeeCharged,
    NewAdmin,
    NewOperator,
    OrderCancelled,
    OrderFilled,
    OrdersMatched,
    ProxyFactoryUpdated,
    RemovedAdmin,
    RemovedOperator,
    SafeFactoryUpdated,
    TokenRegistered,
    TradingPaused,
    TradingUnpaused,
  ],
};
