"use client";

import { useCounterStore } from "@/stores/counterStore";
import { Button } from "@/components/ui/button";

export default function CounterControls() {
  // Get actions from the store
  const { increment, decrement, reset } = useCounterStore();

  return (
    <div className="flex flex-row gap-2 justify-center" data-testid="counter-controls">
      <Button 
        onClick={decrement}
        variant="outline"
        data-testid="decrement-button"
      >
        -
      </Button>
      
      <Button 
        onClick={reset}
        variant="outline"
        data-testid="reset-button"
      >
        Reset
      </Button>
      
      <Button 
        onClick={increment}
        variant="outline"
        data-testid="increment-button"
      >
        +
      </Button>
    </div>
  );
} 