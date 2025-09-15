// store/useOrderbookStore.ts
import { create } from 'zustand';

type OrderbookEntry = [number, number];

interface OrderbookState {
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
  // functions expected by lib/binanceSocket
  setBids: (bids: OrderbookEntry[]) => void;
  setAsks: (asks: OrderbookEntry[]) => void;
  // optional: connect() if you want store to manage websocket
  connect?: () => void;
}

export const useOrderbookStore = create<OrderbookState>((set) => ({
  bids: [],
  asks: [],
  setBids: (bids) => set(() => ({ bids })),
  setAsks: (asks) => set(() => ({ asks })),
  // keep connect undefined here if you prefer lib/binanceSocket to manage connection
}));