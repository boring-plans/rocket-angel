import { createResponse } from "../response-util";
import Mock from "mockjs";

export default {
  "get|/api/dashboard/overviews": createResponse(
    Mock.mock({
      "data|4": [
        {
          "count|1-37": 37,
          "total|50-500": 500,
        },
      ],
    })["data"]
  ),
  "get|/api/dashboard/simple-table-data": createResponse(
    Mock.mock({
      "data|10-12": [
        {
          name: "@string(5)",
          value: "@integer(1, 100)",
        },
      ],
    })["data"]
  ),
  "get|/api/dashboard/line-chart-data": createResponse(
    Mock.mock({
      "data|5-10": [
        {
          name: "@string(5, 8)",
          value: "@integer(10, 100)",
        },
      ],
    })["data"]
  ),
  "get|/api/dashboard/pie-chart-data": createResponse(
    Mock.mock({
      "data|5": [
        {
          name: "@string(4)",
          value: "@integer(5, 100)",
        },
      ],
    })["data"]
  ),
  "get|/api/dashboard/scatter-chart-data": createResponse(
    Mock.mock({
      "data|20": [["@integer(1, 14)", "@integer(1, 14)"]],
    })["data"]
  ),
};
