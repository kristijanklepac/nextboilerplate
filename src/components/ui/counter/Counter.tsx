"use client";

import { useEffect } from "react";
import CounterDisplay from "./CounterDisplay";
import CounterControls from "./CounterControls";
import CounterInput from "./CounterInput";
import { hydrateStore } from "@/stores/counterStore";

interface CounterProps {
  readonly title?: string;
  readonly label?: string;
}

export default function Counter({ 
  title = "Counter Example", 
  label = "Count"
}: Readonly<CounterProps>) {
  // Properly hydrate the store when the component mounts
  useEffect(() => {
    // Call the hydration helper
    hydrateStore();
  }, []);

  return (
    <div 
      className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md"
      data-testid="counter-widget"
    >
      <h2 
        className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white"
        data-testid="counter-title"
      >
        {title}
      </h2>
      
      <CounterDisplay label={label} />
      <CounterControls />
      <CounterInput />
    </div>
  );
} 