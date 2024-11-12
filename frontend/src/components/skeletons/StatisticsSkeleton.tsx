import React from "react";

const StatisticsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="p-4 rounded-lg bg-gray-800/50 animate-pulse"
        >
          <div className="space-y-3">
            <div className="w-24 h-4 bg-gray-700 rounded" />
            <div className="w-32 h-6 bg-gray-700 rounded" />
            <div className="flex items-center space-x-2">
              <div className="w-16 h-4 bg-gray-700 rounded" />
              <div className="w-4 h-4 bg-gray-700 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsSkeleton;
