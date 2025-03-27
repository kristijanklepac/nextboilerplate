"use client";

import { useState } from "react";
import { useCounterStore } from "@/stores/counterStore";
import { Button } from "@/components/ui/button";

export default function CounterInput() {
  // Use individual selectors for each value to maintain referential equality
  const setCount = useCounterStore(state => state.setCount);
  const isHydrated = useCounterStore(state => state.isHydrated);
  
  // Local state for the input field
  const [inputValue, setInputValue] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHydrated) return;
    
    const value = Number.parseInt(inputValue, 10);
    if (!Number.isNaN(value)) {
      setCount(value);
      setInputValue("");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 items-center mt-4"
      data-testid="counter-input-form"
    >
      <div className="flex flex-row gap-2">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-2 py-1 border rounded w-20 text-center"
          placeholder="Value"
          aria-label="Set counter value"
          data-testid="counter-input"
          disabled={!isHydrated}
        />
        <Button 
          type="submit"
          variant="outline"
          data-testid="set-counter-button"
          disabled={!isHydrated}
        >
          Set
        </Button>
      </div>
    </form>
  );
} 