import api from "../lib/api";

export const exportService = {
  async exportTransactions(format: string) {
    const response = await api.get(`/export/transactions?format=${format}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `transactions.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  async exportBudgets(format: string) {
    const response = await api.get(`/export/budgets?format=${format}`, {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `budgets.${format}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};
