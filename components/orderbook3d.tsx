import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useOrderbookStore } from '../store/useOrderbookStore';
import { useEffect, useState, useRef } from 'react';
import { connectToBinance } from '../lib/binanceSocket';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Order = [number, number]; // [price, qty]
type PricePoint = { time: number; price: number };

const cameraPresets: Record<string, [number, number, number]> = {
  angled: [0, 40, 60],
  top: [0, 100, 0.1],
  side: [100, 30, 0],
};

const Bars = ({
  bids,
  asks,
  depth,
  normalize,
}: {
  bids: Order[];
  asks: Order[];
  depth: number;
  normalize: boolean;
}) => {
  const allQty = [...bids.slice(0, depth), ...asks.slice(0, depth)].map(([_, q]) => q);
  const maxQty = Math.max(...allQty, 1);

  return (
    <>
      {bids.slice(0, depth).map(([price, qty], i) => {
        const height = normalize ? (qty / maxQty) * 20 : qty / 50;
        return (
          <mesh key={`bid-${i}`} position={[-i - 1, height / 2, 0]}>
            <boxGeometry args={[0.8, Math.max(height, 0.2), 0.8]} />
            <meshStandardMaterial color="limegreen" />
            <Text position={[0, height + 0.5, 0]} fontSize={0.5} color="yellow" anchorX="center">
              {qty.toFixed(2)}
            </Text>
          </mesh>
        );
      })}

      {asks.slice(0, depth).map(([price, qty], i) => {
        const height = normalize ? (qty / maxQty) * 20 : qty / 50;
        return (
          <mesh key={`ask-${i}`} position={[i + 1, height / 2, 0]}>
            <boxGeometry args={[0.8, Math.max(height, 0.2), 0.8]} />
            <meshStandardMaterial color="crimson" />
            <Text position={[0, height + 0.5, 0]} fontSize={0.5} color="yellow" anchorX="center">
              {qty.toFixed(2)}
            </Text>
          </mesh>
        );
      })}
    </>
  );
};

const Orderbook3D = () => {
  const { bids, asks } = useOrderbookStore();

  const [depth, setDepth] = useState(20);
  const [normalize, setNormalize] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [animSpeed, setAnimSpeed] = useState(1);
  const [cameraView, setCameraView] = useState<'angled' | 'top' | 'side'>('angled');
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);

  const cameraRef = useRef<any>(null);

  // Connect to Binance
  useEffect(() => {
    connectToBinance();
  }, []);

  // Best Bid / Best Ask
  const bestBid = bids.length > 0 ? Math.max(...bids.map(([p]) => p)) : null;
  const bestAsk = asks.length > 0 ? Math.min(...asks.map(([p]) => p)) : null;
  const midPrice = bestBid && bestAsk ? (bestBid + bestAsk) / 2 : null;

  // Store price history for chart
  useEffect(() => {
    if (midPrice) {
      setPriceHistory((prev) => {
        const newHistory = [...prev];
        newHistory.push({ time: Date.now(), price: midPrice });
        return newHistory.slice(-50);
      });
    }
  }, [midPrice]);

  // Camera update on preset change
  useEffect(() => {
    if (cameraRef.current) {
      const [x, y, z] = cameraPresets[cameraView];
      cameraRef.current.position.set(x, y, z);
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, [cameraView]);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: theme === 'dark' ? '#111' : '#fafafa',
        color: theme === 'dark' ? 'white' : 'black',
      }}
    >
      {/* ================= Left Controls Panel ================= */}
      <div style={{ width: '250px', padding: '1rem', borderRight: '1px solid gray' }}>
        <h2>⚙️ Controls</h2>

        <label>Depth: {depth}</label>
        <input type="range" min={5} max={50} value={depth} onChange={(e) => setDepth(+e.target.value)} />

        <label>
          <input type="checkbox" checked={normalize} onChange={() => setNormalize(!normalize)} /> Normalize Volumes
        </label>


<label>
          Theme:
          <select value={theme} onChange={(e) => setTheme(e.target.value as 'dark' | 'light')}>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </label>

        <label>Animation Speed: {animSpeed}</label>
        <input
          type="range"
          min={0.1}
          max={3}
          step={0.1}
          value={animSpeed}
          onChange={(e) => setAnimSpeed(+e.target.value)}
        />

        <div>
          Camera Preset:
          <button onClick={() => setCameraView('angled')}>Angled</button>
          <button onClick={() => setCameraView('top')}>Top</button>
          <button onClick={() => setCameraView('side')}>Side</button>
        </div>
      </div>

      {/* ================= 3D Canvas ================= */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas camera={{ position: cameraPresets[cameraView], fov: 60 }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          <gridHelper args={[100, 100]} />

          {/* Bars */}
          <Bars bids={bids} asks={asks} depth={depth} normalize={normalize} />

          {/* Spread Cylinder */}
          {bestBid && bestAsk && (
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.05, 0.05, Math.abs(bestAsk - bestBid) / 5, 16]} />
              <meshStandardMaterial color="gold" emissive="yellow" emissiveIntensity={0.6} />
            </mesh>
          )}
        </Canvas>

        {/* ================= Line Chart Overlay ================= */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: '300px',
            height: '200px',
            background: 'rgba(0,0,0,0.5)',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <XAxis dataKey="time" hide />
              <YAxis dataKey="price" />
              <Tooltip
                formatter={(value: number) => [`${(value as number).toFixed(2)}`, 'Price']}
                labelFormatter={(value) => new Date(value as number).toLocaleTimeString()}
              />
              <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} name="Mid Price" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Orderbook3D;