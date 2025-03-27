"use client";

import { useCounterStore } from "@/stores/counterStore";
import { Button } from "@/components/ui/button";

export default function CounterControls() {
  // Use individual selectors for each value to maintain referential equality
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);
  const reset = useCounterStore(state => state.reset);
  const isHydrated = useCounterStore(state => state.isHydrated);

  // Don't allow interactions until hydration is complete
  const handleIncrement = () => {
    if (isHydrated) increment();
  };

  const handleDecrement = () => {
    if (isHydrated) decrement();
  };

  const handleReset = () => {
    if (isHydrated) reset();
  };

  return (
    <div className="flex flex-row gap-2 justify-center" data-testid="counter-controls">
      <Button 
        onClick={handleDecrement}
        variant="outline"
        data-testid="decrement-button"
        disabled={!isHydrated}
        className="dark:text-white dark:hover:bg-gray-700"
      >
        -
      </Button>
      
      <Button 
        onClick={handleReset}
        variant="outline"
        data-testid="reset-button"
        disabled={!isHydrated}
        className="dark:text-white dark:hover:bg-gray-700"
      >
        Reset
      </Button>
      
      <Button 
        onClick={handleIncrement}
        variant="outline"
        data-testid="increment-button"
        disabled={!isHydrated}
        className="dark:text-white dark:hover:bg-gray-700"
      >
        +
      </Button>
    </div>
  );
} 