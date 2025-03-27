"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
// Import the version display from our version module
import { versionDisplay } from "@/lib/version";

export default function EnvironmentIndicator() {
  const [env, setEnv] = useState<string>("");
  const [useMocks, setUseMocks] = useState<boolean>(false);
  
  useEffect(() => {
    // Check for environment override in localStorage (for testing)
    const envOverride = localStorage.getItem('env_override');
    
    if (envOverride) {
      setEnv(envOverride);
      // Only show mock data indicator for test environment
      setUseMocks(envOverride === 'test');
    } else {
      // Get environment variables on client side
      const currentEnv = process.env.NEXT_PUBLIC_ENV || "development";
      setEnv(currentEnv);
      // For test environment or if mocks are explicitly enabled
      setUseMocks(currentEnv === 'test' || process.env.NEXT_PUBLIC_USE_MOCKS === 'true');
    }
    
    // Clean up the override after using it
    const cleanupOverride = () => {
      if (localStorage.getItem('env_override')) {
        localStorage.removeItem('env_override');
      }
    };
    
    // Clean up after component unmounts or after a delay
    const timeout = setTimeout(cleanupOverride, 5000);
    return () => clearTimeout(timeout);
  }, []);

  if (!env) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50" data-testid="env-indicator">
      <Link href="/version">
        <div
          className={`rounded-full px-3 py-1 text-xs font-medium shadow-md cursor-pointer hover:shadow-lg transition-shadow ${
            env === "production"
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : env === "test"
              ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          }`}
          title="Click to view version details"
        >
          {env} {useMocks ? "(mock data)" : ""} <span className="opacity-70">{versionDisplay}</span>
        </div>
      </Link>
    </div>
  );
} 