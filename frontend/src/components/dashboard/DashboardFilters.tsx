import React from "react";
import { useTranslation } from "react-i18next";
import { useFilters } from "../../contexts/FilterContext";
import { CATEGORY_GROUPS } from "../../lib/categories";

const DashboardFilters: React.FC = () => {
  const { filters, setFilters } = useFilters();
  const { t } = useTranslation();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value || undefined,
    });
  };

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <select
        name="dateRange"
        value={filters.dateRange || ""}
        onChange={handleFilterChange}
        className="w-full px-2 py-2 text-sm text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{t("dashboard.filters.allPeriods")}</option>
        <option value="this-month">{t("dashboard.filters.thisMonth")}</option>
        <option value="last-month">{t("dashboard.filters.lastMonth")}</option>
        <option value="3-months">{t("dashboard.filters.threeMonths")}</option>
        <option value="year">{t("dashboard.filters.thisYear")}</option>
      </select>

      <select
        name="status"
        value={filters.status || ""}
        onChange={handleFilterChange}
        className="w-full px-2 py-2 text-sm text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{t("dashboard.filters.allStatus")}</option>
        <option value="success">{t("dashboard.filters.upToDate")}</option>
        <option value="warning">{t("dashboard.filters.warning")}</option>
        <option value="danger">{t("dashboard.filters.exceeded")}</option>
      </select>

      <select
        name="category"
        value={filters.category || ""}
        onChange={handleFilterChange}
        className="w-full px-2 py-2 text-sm text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{t("dashboard.filters.allCategories")}</option>
        {Object.entries(CATEGORY_GROUPS).map(([groupKey, group]) => (
          <optgroup key={groupKey} label={group.name}>
            {group.categories.map((category) => (
              <option key={category} value={category}>
                {t(
                  `categories.${
                    groupKey === "income" ? "income" : "expense"
                  }.${category}`
                )}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};

export default DashboardFilters;
