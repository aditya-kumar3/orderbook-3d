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

The application establishes a WebSocket connection with Binance and continuously receives order book updates.

The incoming bids and asks are stored in the Zustand state store and consumed by the visualization components.

The 3D scene then converts the market data into visual bars representing the available bid and ask volume.

🎮 Controls
Control	Description
Depth	Controls the number of order book levels displayed
Normalize Volumes	Normalizes volume heights for easier visual comparison
Theme	Switches between available visual themes
Animation Speed	Controls the visualization animation speed
Camera Preset	Changes the 3D camera perspective
📂 Project Structure
orderbook-3d/
│
├── components/
│   └── orderbook3d.tsx
│
├── lib/
│   └── binanceSocket.ts
│
├── pages/
│   └── index.tsx
│
├── public/
│
├── store/
│   └── useOrderbookStore.ts
│
├── styles/
│   └── globals.css
│
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
⚙️ Getting Started
Prerequisites
Node.js 20+ recommended
npm
Installation

Clone the repository:

git clone https://github.com/aditya-kumar3/orderbook-3d.git

Navigate into the project:

cd orderbook-3d

Install dependencies:

npm install

Start the development server:

npm run dev

Open:

http://localhost:3000
📡 Data Source

This project uses the public Binance WebSocket market data stream.

No Binance account, API key or trading permissions are required because the application only consumes public market data.

The project is intended for data visualization and educational purposes and does not execute trades.

🔒 Security

No private API keys or trading credentials are required by this application.

If environment variables are introduced in future versions, they should not be committed to the repository.

🌐 Live Demo

Try the application here:

https://orderbook-3d.vercel.app

📌 Future Improvements
Automatic WebSocket reconnection
Symbol selection
More advanced order book analytics
Improved mobile 3D optimization
Additional visualization modes
Historical order book playback
Performance optimizations for larger datasets
👨‍💻 Author

Aditya Kumar

GitHub: https://github.com/aditya-kumar3
