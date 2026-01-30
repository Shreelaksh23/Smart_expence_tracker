import API from "./axios";

export const getMonthlyInsights = () => API.get("/insights/monthly");
