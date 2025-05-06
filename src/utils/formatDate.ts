export function formatUtcToLocal(utcDate: string | Date, options = {}) {
  const date = typeof utcDate === "string" ? new Date(utcDate) : utcDate;

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...options,
  });
}
