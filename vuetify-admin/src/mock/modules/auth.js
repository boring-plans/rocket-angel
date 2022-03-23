import { createResponse } from "../response-util";

export const mockPermissions = [
  "/dashboard:visit",
  "/three/levels/demo:visit",
  "/system/user-management:visit",
  "/system/role-management:visit",
  "user:retrieve",
  "user:create",
  "user:update",
  "user:delete",
  "role:retrieve",
  "role:create",
  "role:update",
  "role:delete",
];

export const mockUserInfo = "Dev";

export default {
  "get|/api/auth/token": createResponse("access-token"),
  "get|/api/auth/user-info": createResponse(mockUserInfo),
  "get|/api/auth/permissions": createResponse(mockPermissions),
  "post|/api/auth/user": createResponse("access-token"),
};
