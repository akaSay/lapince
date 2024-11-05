import React from "react";

interface ReportCardProps {
  title: string;
  data: {
    labels: string[];
    values: number[];
  };
}

const ReportCard: React.FC<ReportCardProps> = ({ title, data }) => {
  const maxValue = Math.max(...data.values);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-medium text-white mb-6">{title}</h3>
      <div className="space-y-4">
        {data.labels.map((label, index) => (
          <div key={label}>
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>{label}</span>
              <span>{data.values[index]}€</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{
                  width: `${(data.values[index] / maxValue) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportCard;
