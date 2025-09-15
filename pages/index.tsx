import dynamic from 'next/dynamic';

const Orderbook3D = dynamic(() => import('../components/orderbook3d'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>📊 Binance Orderbook 3D</h1>
      <Orderbook3D />
    </div>
  );
}