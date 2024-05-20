import { CUR_ATTEMPTS_STORAGE } from "../../utils/consts";

export const getCurAttemps = () => JSON.parse(localStorage.getItem(CUR_ATTEMPTS_STORAGE)||"{}");
export const setCurAttemps = (token: any | null) =>
  token
    ? localStorage.setItem(CUR_ATTEMPTS_STORAGE,  JSON.stringify(token))
    : localStorage.removeItem(CUR_ATTEMPTS_STORAGE);
export const clearCurAttemps = () =>
  localStorage.removeItem(CUR_ATTEMPTS_STORAGE);
