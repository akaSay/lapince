import React from "react";

const BudgetSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="p-4 rounded-lg bg-gray-800/50 animate-pulse"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full" />
              <div className="w-24 h-4 bg-gray-700 rounded" />
            </div>
            <div className="w-16 h-6 bg-gray-700 rounded" />
          </div>
          <div className="space-y-3">
            <div className="w-full h-2 bg-gray-700 rounded" />
            <div className="flex justify-between">
              <div className="w-20 h-4 bg-gray-700 rounded" />
              <div className="w-20 h-4 bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BudgetSkeleton;
