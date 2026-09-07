# 📊 Binance Orderbook 3D

An interactive 3D visualization of the Binance cryptocurrency order book using real-time market data delivered through Binance WebSocket.

🔗 **Live Demo:** https://orderbook-3d.vercel.app

---

## 🚀 About The Project

Binance Orderbook 3D is a real-time market data visualization project that transforms live Binance order book data into an interactive 3D scene.

The application receives live bid and ask data through a WebSocket connection and represents order volume using 3D bars, making it easier to visually understand the relationship between buying and selling pressure.

The visualization can be explored using different camera presets, themes, depth levels and animation settings.

---

## ✨ Features

- 📡 Real-time Binance WebSocket market data
- 📊 Live bid and ask visualization
- 🧊 Interactive 3D order book
- 🎥 Multiple camera presets
  - Angled
  - Top
  - Side
- 📈 Real-time order book chart
- 🎚️ Adjustable order book depth
- ⚡ Adjustable animation speed
- 🔄 Volume normalization
- 🌙 Dark/Light theme support
- 🖱️ Interactive 3D camera controls
- 📱 Responsive layout for desktop, tablet and mobile
- 🌐 Deployed with Vercel

---

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript

### 3D Visualization
- Three.js
- React Three Fiber
- React Three Drei

### Data & State
- Binance WebSocket API
- Zustand

### Charts
- Recharts

### Deployment
- Vercel

---

## 🏗️ How It Works

```text
Binance WebSocket
       │
       ▼
Live Order Book Data
       │
       ▼
binanceSocket.ts
       │
       ▼
Zustand Store
       │
       ▼
Orderbook3D Component
       │
       ├──────────────► 3D Order Book
       │
       └──────────────► Order Book Chart
