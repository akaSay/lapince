import React from "react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "../../lib/utils";

interface ReportCardProps {
  title: string;
  data: {
    labels: string[];
    values: number[];
  };
}

const ReportCard: React.FC<ReportCardProps> = ({ title, data }) => {
  const { t } = useTranslation();

  if (!data.labels.length || data.values.every((v) => v === 0)) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h3 className="mb-6 text-lg font-medium text-white">{title}</h3>
        <div className="py-4 text-center text-gray-400">
          {t("reports.noData")}
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.values);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
      <h3 className="mb-6 text-lg font-medium text-white">{title}</h3>
      <div className="space-y-4">
        {data.labels.map((label, index) => (
          <div key={label}>
            <div className="flex justify-between mb-1 text-sm text-gray-400">
              <span className="truncate max-w-[60%]">{label}</span>
              <span>{formatCurrency(data.values[index])}</span>
            </div>
            <div className="h-2 overflow-hidden bg-gray-700 rounded-full">
              <div
                className="h-full transition-all duration-300 bg-blue-600 rounded-full"
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
