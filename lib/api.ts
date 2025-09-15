export const fetchOrderbookData = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL || '');
  return res.json();
};