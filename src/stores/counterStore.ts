import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Define interface for the counter store
export interface CounterStore {
  count: number;
  isHydrated: boolean;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: (count: number) => void;
  setHydrated: (state: boolean) => void;
}

// Simple state for server-side rendering
const serverState = {
  count: 0,
  isHydrated: false,
  increment: () => {},
  decrement: () => {},
  reset: () => {},
  setCount: () => {},
  setHydrated: () => {},
};

// Create the store
export const useCounterStore = create<CounterStore>()(
  persist(
    (set, get) => ({
      count: 0,
      isHydrated: false,
      increment: () => {
        if (!get().isHydrated) return;
        set(state => ({ ...state, count: state.count + 1 }));
      },
      decrement: () => {
        if (!get().isHydrated) return;
        set(state => ({ ...state, count: state.count - 1 }));
      },
      reset: () => {
        if (!get().isHydrated) return;
        set(state => ({ ...state, count: 0 }));
      },
      setCount: (count: number) => {
        if (!get().isHydrated) return;
        set(state => ({ ...state, count }));
      },
      setHydrated: (isHydrated: boolean) => {
        set(state => ({ ...state, isHydrated }));
      },
    }),
    {
      name: 'counter-storage',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (state) => ({ count: state.count }),
      getServerSnapshot: () => serverState,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);

// Helper function to manually hydrate the store (to be called in useEffect)
export const hydrateStore = () => {
  if (typeof window === 'undefined') return;
  
  try {
    const persistedState = localStorage.getItem('counter-storage');
    if (persistedState) {
      const { state } = JSON.parse(persistedState);
      if (state && typeof state.count === 'number') {
        useCounterStore.setState({ count: state.count, isHydrated: true });
      } else {
        useCounterStore.setState({ isHydrated: true });
      }
    } else {
      useCounterStore.setState({ isHydrated: true });
    }
  } catch (e) {
    console.error('Failed to hydrate counter store:', e);
    useCounterStore.setState({ isHydrated: true });
  }
};

// Export a function to get the current store state (useful for testing)
export const getCounterState = () => useCounterStore.getState();

// Set up storage event listener to sync state between tabs
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'counter-storage') {
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