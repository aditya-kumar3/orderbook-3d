// lib/binancesocket.ts
import { useOrderbookStore } from "../store/useOrderbookStore";
export function connectToBinance() {
  const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth20@100ms");
  // ...baaki code


  ws.onopen = () => {
    console.log("✅ Connected to Binance WebSocket");
  };

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // Binance se bids/asks aa rahe hote hain
    const bids = data.bids ? data.bids.map(([price, qty]: [string, string]) => [parseFloat(price), parseFloat(qty)]) : [];
    const asks = data.asks ? data.asks.map(([price, qty]: [string, string]) => [parseFloat(price), parseFloat(qty)]) : [];

    console.log("📥 Received bids/asks:", bids.length, asks.length);

    // ✅ Store update
    useOrderbookStore.getState().setBids(bids);
    useOrderbookStore.getState().setAsks(asks);
  };

  ws.onerror = (err) => {
    console.error("❌ WebSocket Error:", err);
  };

  ws.onclose = () => {
    console.log("🔴 Binance WebSocket disconnected");
  };
}

