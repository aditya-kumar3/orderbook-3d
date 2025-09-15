// store/venuestore.ts
import { create } from 'zustand';

interface VenueState {
  selectedVenue: string;
  setSelectedVenue: (venue: string) => void;
}

export const useVenueStore = create<VenueState>((set) => ({
  selectedVenue: 'binance',
  setSelectedVenue: (venue) => set({ selectedVenue: venue }),
}));