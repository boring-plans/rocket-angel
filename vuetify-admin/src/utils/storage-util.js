const accessTokenKey = "va-access-token";

export const getAccessToken = () =>
  sessionStorage.getItem(accessTokenKey) ||
  localStorage.getItem(accessTokenKey);

export const updateAccessToken = (token) => {
  if (localStorage.getItem(accessTokenKey)) {
    localStorage.setItem(accessTokenKey, token);
  } else {
    sessionStorage.setItem(accessTokenKey, token);
  }
};

export const removeAccessToken = () => {
  sessionStorage.removeItem(accessTokenKey);
  localStorage.removeItem(accessTokenKey);
};

export const getStorageItem = (key) =>
  sessionStorage.getItem(key) || localStorage.getItem(key);

export const removeStorageItem = (key) => {
  sessionStorage.removeItem(key);
  localStorage.removeItem(key);
};
