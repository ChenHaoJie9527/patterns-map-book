import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { OrderManager, OrderManagerV2, placeOrderCommand } from "./patterns";

// const orderManager = new OrderManager();

// console.log(orderManager.placeOrder("pad thai", 123));
// console.log(orderManager.trackOrder(123));
// console.log(orderManager.cancelOrder(123));

const orderManager = new OrderManagerV2();

console.log(orderManager.execute(placeOrderCommand("美式咖啡", 1001)));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
