// A fixed time zone keeps server-rendered and browser-rendered dates identical,
// which avoids hydration mismatches around midnight.
const TIME_ZONE = "Asia/Tehran";

const priceFormatter = new Intl.NumberFormat("fa-IR");

export const formatPrice = (value) => priceFormatter.format(value);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: TIME_ZONE,
  });
