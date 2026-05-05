// Chat time formatter
// Examples:
// now
// 5m
// 2h
// Yesterday
// Mon
// May 5

export function formatTime(date) {
  if (!date) return "";

  const d = new Date(date);

  // invalid date protection
  if (isNaN(d.getTime())) return "";

  const now = new Date();
  const diff = now - d;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  // just now
  if (diff < minute) {
    return "now";
  }

  // minutes ago
  if (diff < hour) {
    return `${Math.floor(diff / minute)}m`;
  }

  // hours ago
  if (diff < day) {
    const hours = Math.floor(diff / hour);

    // if same day, show clock
    if (hours < 12) {
      return `${hours}h`;
    }

    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  // yesterday
  if (diff < day * 2) {
    return "Yesterday";
  }

  // this week
  if (diff < week) {
    return d.toLocaleDateString([], {
      weekday: "short",
    });
  }

  // older
  return d.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}
// formatTime = converts raw date into chat-friendly time
// Examples:
// few seconds ago -> "now"
// 5 minutes ago -> "5m"
// today -> "10:45 PM"
// this week -> "Mon"
// older -> "May 5"
