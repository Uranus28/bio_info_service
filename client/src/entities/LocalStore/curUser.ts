import { CUR_USER_STORAGE } from "../../utils/consts";

export const getCurUser = () => JSON.parse(localStorage.getItem(CUR_USER_STORAGE)||"{}");
export const setCurUser = (token: any | null) =>
  token
    ? localStorage.setItem(CUR_USER_STORAGE, JSON.stringify(token))
    : localStorage.removeItem(CUR_USER_STORAGE);
export const clearCurUser = () => localStorage.removeItem(CUR_USER_STORAGE);
