"use client";

import { useCounterStore } from "@/stores/counterStore";

interface CounterDisplayProps {
  label?: string;
}

export default function CounterDisplay({ label = "Count" }: CounterDisplayProps) {
  // Use individual selectors for each value to maintain referential equality
  const count = useCounterStore(state => state.count);
  const isHydrated = useCounterStore(state => state.isHydrated);

  // Show a placeholder until hydrated to prevent content jump
  const displayValue = isHydrated ? count : "—";

  return (
    <div className="text-center py-4" data-testid="counter-display">
      <p className="text-sm text-gray-500" data-testid="counter-label">{label}</p>
      <p className="text-4xl font-bold h-[56px] flex items-center justify-center" data-testid="counter-value">
        {displayValue}
      </p>
    </div>
  );
} 