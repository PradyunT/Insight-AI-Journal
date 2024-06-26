const formatTime = (date: Date) => {
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

export default formatTime;
