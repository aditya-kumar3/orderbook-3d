# Orderbook 3D Visualizer

A Next.js + React Three Fiber app that visualizes the Binance BTCUSDT orderbook in 3D with live WebSocket updates.

## Features

- Live Binance orderbook stream (`btcusdt@depth20@100ms`)
- 3D bid/ask bars rendered with Three.js
- Adjustable depth and volume normalization controls
- Camera presets (angled, top, side)
- Light/dark theme toggle
- Mid-price line chart overlay
- Zustand-based state management

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- @react-three/fiber + @react-three/drei
- Recharts
- Zustand

## Getting Started

### Prerequisites

- Node.js 22.x
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` – Start local development server
- `npm run build` – Build production bundle
- `npm run start` – Start production server
- `npm run export` – Build and export static output

## Project Structure

- `/pages` – Next.js pages
- `/components` – UI and 3D visualization components
- `/lib` – API/WebSocket integration
- `/store` – Zustand stores
- `/styles` – Global styles

## Notes

- Current live data source is Binance WebSocket in `lib/binanceSocket.ts`.
- Venue selector state exists but only Binance stream is wired currently.
