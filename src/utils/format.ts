import { format } from "date-fns";

export const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), "MMM dd, yyyy");
  } catch {
    return "Invalid date";
  }
};
