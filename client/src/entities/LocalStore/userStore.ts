import { USER_STORAGE } from "../../utils/consts";

export const getUserStore = () => JSON.parse(localStorage.getItem(USER_STORAGE)|| "{}");
export const setUserStore = (token: any | null) =>
  token
    ? localStorage.setItem(USER_STORAGE, JSON.stringify(token))
    : localStorage.removeItem(USER_STORAGE);
export const clearUserStore = () => localStorage.removeItem(USER_STORAGE);

