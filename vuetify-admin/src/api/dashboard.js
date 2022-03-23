import axios from "../utils/axios";

export const getOverviews = () => axios.get("/dashboard/overviews");
export const getSimpleTableData = () =>
  axios.get("/dashboard/simple-table-data");
export const getLineChartData = () => axios.get("/dashboard/line-chart-data");
export const getPieChartData = () => axios.get("/dashboard/pie-chart-data");
export const getScatterChartData = () =>
  axios.get("/dashboard/scatter-chart-data");
