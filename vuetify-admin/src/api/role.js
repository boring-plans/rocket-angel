import axios from "../utils/axios";

/**
 * Get role list
 * @returns {*}
 */
export const getRoles = () => axios.get("/role-management/roles");

/**
 * Create one new role
 * @param {*} formData
 * @returns
 */
export const createRole = (formData) =>
  axios.post("/role-management/role", formData);

/**
 * Update certain role
 * @param id
 * @param {*} formData
 * @returns
 */
export const updateRole = (id, formData) =>
  axios.put(`/role-management/role/${id}`, formData);

/**
 * Delete roles in batch
 * @param {*} ids
 * @returns
 */
export const deleteRoles = (ids) =>
  axios.delete("/role-management/roles", { data: { ids } });
