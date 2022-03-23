import { createResponse } from "../response-util";
import Mock from "mockjs";

export default {
  "get|/api/role-management/roles": createResponse(
    Mock.mock({
      "data|5-15": [
        {
          "id|+1": 1,
          name: "@string(8, 10)",
          description: "@string(5, 20)",
          permissions: "user:retrieve,user:create,/dashboard:visit",
        },
      ],
    })["data"]
  ),
  "post|/api/role-management/role": createResponse(),
  "put|/api/role-management/role/\\d+": createResponse(),
  "delete|/api/role-management/roles": createResponse(),
};
