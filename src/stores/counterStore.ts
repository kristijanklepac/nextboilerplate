import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'counter-state';

// Define interface for the counter store
export interface CounterStore {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
}

// Create the counter store with persistence
export const useCounterStore = create<CounterStore>()(
  persist(
    (set) => ({
      count: 0, // Default to 0
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
      setCount: (count: number) => set({ count }),
    }),
    {
      name: STORAGE_KEY,
      skipHydration: true, // Add this to prevent hydration mismatch
    }
  )
);

// Export a function to get the current store state (useful for testing)
export const getCounterState = () => useCounterStore.getState();

// Set up storage event listener to sync state between tabs
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      try {
        const newState = e.newValue ? JSON.parse(e.newValue) : { state: { count: 0 } };
        useCounterStore.setState({ count: newState.state.count });
      } catch (error) {
        console.error('Error syncing counter state between tabs:', error);
      }
    }
  });
}

// Expose the store to the window object for testing purposes
// This will only run in the browser, not during SSR
if (typeof window !== 'undefined') {
  // @ts-expect-error - Adding useCounterStore to window
  window.useCounterStore = useCounterStore;
} 