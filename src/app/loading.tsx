'use client';
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="relative">
        <Loader2 
          className="w-16 h-16 text-primary animate-spin"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-t-secondary border-r-transparent border-b-transparent border-l-transparent animate-[spin_1.5s_linear_infinite]" />
      </div>
      <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default LoadingPage;