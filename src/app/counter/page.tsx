import Counter from "@/components/ui/counter/Counter";

export const metadata = {
  title: "Counter Example | Zustand",
  description: "An example of using Zustand for state management in a Next.js application",
};

export default function CounterPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Zustand State Management
      </h1>
      
      <div className="max-w-lg mx-auto bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          This example demonstrates global state management with Zustand.
          Try the controls below or open multiple browser tabs - the state is shared!
        </p>
        
        <Counter title="Counter Example" label="Current Value" />
      </div>
    </div>
  );
} 