import React from "react";

const ChartSkeleton: React.FC = () => {
  return (
    <div className="h-[300px] bg-gray-800/50 rounded-lg animate-pulse flex items-center justify-center">
      <div className="w-full h-full" />
    </div>
  );
};

export default ChartSkeleton;
