import dynamic from 'next/dynamic';

const Orderbook3D = dynamic(() => import('../components/orderbook3d'), { ssr: false });

export default function Home() {
  return (
    <div className="page-root">
      <h1 className="page-title">📊 Binance Orderbook 3D</h1>
      <Orderbook3D />
    </div>
  );
}