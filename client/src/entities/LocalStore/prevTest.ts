import { PREV_TEST_STORAGE } from "../../utils/consts";

export const getPrevTest = () => JSON.parse(localStorage.getItem(PREV_TEST_STORAGE) ||"{}");
export const setPrevTest = (token: any | null) =>
  token
    ? localStorage.setItem(PREV_TEST_STORAGE, JSON.stringify(token))
    : localStorage.removeItem(PREV_TEST_STORAGE);
export const clearPrevTest = () => localStorage.removeItem(PREV_TEST_STORAGE);
