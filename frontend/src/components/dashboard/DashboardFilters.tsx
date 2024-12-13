import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFilters } from "../../contexts/FilterContext";
import { CATEGORY_GROUPS } from "../../lib/categories";
import type { Filters } from "../../types/Filters";

const DashboardFilters: React.FC = () => {
  const { filters, setFilters } = useFilters();
  const { t } = useTranslation();

  // Générer les options pour les 12 derniers mois
  const generateMonthOptions = () => {
    const options: Array<{ value: string; label: string }> = [];
    const today = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthValue = `month-${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      const label = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
      });
      options.push({ value: monthValue, label });
    }
    return options;
  };

  // Définir le mois courant au chargement initial
  useEffect(() => {
    const today = new Date();
    const currentMonthValue = `month-${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!filters?.dateRange) {
      setFilters({
        ...filters,
        dateRange: currentMonthValue,
      });
    }
  }, [filters, setFilters]);

  // Auto-update au changement de mois
  useEffect(() => {
    const checkAndUpdateMonth = () => {
      const today = new Date();
      const currentMonthValue = `month-${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}`;

      if (filters?.dateRange?.startsWith("month-")) {
        const [, year, month] = filters.dateRange.split("-");
        const filterDate = new Date(parseInt(year), parseInt(month) - 1);
        const currentDate = new Date(today.getFullYear(), today.getMonth());

        if (filterDate.getTime() !== currentDate.getTime()) {
          setFilters({
            ...filters,
            dateRange: currentMonthValue,
          });
        }
      }
    };

    const interval = setInterval(checkAndUpdateMonth, 1000 * 60 * 60); // Vérifier toutes les heures
    return () => clearInterval(interval);
  }, [filters, setFilters]);

  const monthOptions = generateMonthOptions();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    const newFilters: Filters = {
      ...filters,
      [name]: value || undefined,
    };
    setFilters(newFilters);
  };

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <select
        name="dateRange"
        value={filters?.dateRange || ""}
        onChange={handleFilterChange}
        className="w-full px-2 py-2 text-sm text-white bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">{t("dashboard.filters.allPeriods")}</option>
        {monthOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
        <option value="3-months">{t("dashboard.filters.threeMonths")}</option>
        <option value="year">{t("dashboard.filters.thisYear")}</option>
      </select>

      <select
        name="status"
        value={filters?.status || ""}
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
        value={filters?.category || ""}
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
