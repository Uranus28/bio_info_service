import { CUR_TEST_STORAGE } from "../../utils/consts";

export const getCurTest = () => JSON.parse(localStorage.getItem(CUR_TEST_STORAGE) ||"{}");
export const setCurTest = (token: any | null) =>
  token
    ? localStorage.setItem(CUR_TEST_STORAGE, JSON.stringify(token))
    : localStorage.removeItem(CUR_TEST_STORAGE);
export const clearCurTest = () => localStorage.removeItem(CUR_TEST_STORAGE);
