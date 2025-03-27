"use client";

import { useCounterStore } from "@/stores/counterStore";

interface CounterDisplayProps {
  label?: string;
}

export default function CounterDisplay({ label = "Count" }: CounterDisplayProps) {
  // Get the count from the store
  const count = useCounterStore((state) => state.count);

  return (
    <div className="text-center py-4" data-testid="counter-display">
      <p className="text-sm text-gray-500" data-testid="counter-label">{label}</p>
      <p className="text-4xl font-bold" data-testid="counter-value">{count}</p>
    </div>
  );
} 