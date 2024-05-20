import { CUR_MODULE_STORAGE } from "../../utils/consts";

export const getCurModule = () => JSON.parse(localStorage.getItem(CUR_MODULE_STORAGE)||"{}");
export const setCurModule = (token: any | null) =>
  token
    ? localStorage.setItem(CUR_MODULE_STORAGE, JSON.stringify(token))
    : localStorage.removeItem(CUR_MODULE_STORAGE);
export const clearCurModule = () => localStorage.removeItem(CUR_MODULE_STORAGE);
