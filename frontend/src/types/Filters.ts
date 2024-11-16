export interface Filters {
  category?: string;
  dateRange?: "this-month" | "last-month" | "3-months" | "year";
  status?: "success" | "warning" | "danger";
  searchQuery?: string;
}
