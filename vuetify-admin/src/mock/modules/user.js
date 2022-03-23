import { createResponse } from "../response-util";
import Mock from "mockjs";

export default {
  "get|/api/user-management/users": createResponse(
    Mock.mock({
      "data|15-20": [
        {
          "id|+1": 1,
          username: "@string(8)",
          "state|1": [0, 1],
          "roles|2-6": [
            {
              name: "@string(5)",
              "id|+1": 1,
            },
          ],
        },
      ],
    })["data"]
  ),
  "post|/api/user-management/user": createResponse(),
  "put|/api/user-management/user/\\d+": createResponse(),
  "post|/api/user-management/avatar": createResponse(),
  "patch|/api/user-management/user/\\d+": createResponse(),
  "delete|/api/user-management/users": createResponse(),
};
