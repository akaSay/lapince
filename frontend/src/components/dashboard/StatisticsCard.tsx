import React from "react";

interface StatisticsCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  icon,
  trend,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-700 rounded-lg">
          <i className="material-icons-outlined text-blue-400">{icon}</i>
        </div>
        {trend && (
          <div
            className={`flex items-center space-x-1 ${
              trend.isPositive ? "text-green-400" : "text-red-400"
            }`}
          >
            <i className="material-icons-outlined text-sm">
              {trend.isPositive ? "trending_up" : "trending_down"}
            </i>
            <span className="text-sm">{trend.value}%</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  );
};

export default StatisticsCard;
