import axios from "../utils/axios";

/**
 * Get user list
 * @returns
 */
export const getUsers = () => axios.get("/user-management/users");

/**
 * Create one user
 * @param {*} formData
 * @returns
 */
export const createUser = (formData) =>
  axios.post("/user-management/user", formData);

/**
 * Update one certain user
 * @param id
 * @param {*} formData
 * @returns
 */
export const updateUser = (id, formData) =>
  axios.put(`/user-management/user/${id}`, formData);

/**
 * Delete in batch
 * @param {*} ids
 * @returns
 */
export const deleteUsers = (ids) =>
  axios.delete("/user-management/users", { data: { ids } });
