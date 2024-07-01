export const formatMessageTime = (date: Date) => {
  return date
    .toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replaceAll(",", "");
};

export const formatJournalDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1; // Months are zero-based
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

  return `${month}-${day}-${year}`;
};

