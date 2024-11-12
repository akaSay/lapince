import React from "react";

const TransactionSkeleton: React.FC = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="p-4 rounded-lg bg-gray-800/50 animate-pulse"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="w-3/4 h-4 bg-gray-700 rounded" />
              <div className="w-1/2 h-4 bg-gray-700 rounded" />
            </div>
            <div className="w-24 h-8 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionSkeleton;
