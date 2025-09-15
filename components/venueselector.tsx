// components/venueselector.tsx
import { useVenueStore } from '../store/venuestore';

export const VenueSelector = () => {
  const venues = ['binance', 'coinbase', 'kraken'];
  const selectedVenue = useVenueStore((state) => state.selectedVenue);
  const setSelectedVenue = useVenueStore((state) => state.setSelectedVenue);

  return (
    <select
      value={selectedVenue}
      onChange={(e) => setSelectedVenue(e.target.value)}
    >
      {venues.map((venue) => (
        <option key={venue} value={venue}>
          {venue}
        </option>
      ))}
    </select>
  );
};