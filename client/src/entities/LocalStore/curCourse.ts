import { CUR_COURSE_STORAGE } from "../../utils/consts";

export const getCurCourse = () => JSON.parse(localStorage.getItem(CUR_COURSE_STORAGE)||"{}");
export const setCurCourse = (token: any | null) =>
  token
    ? localStorage.setItem(CUR_COURSE_STORAGE,  JSON.stringify(token))
    : localStorage.removeItem(CUR_COURSE_STORAGE);
export const clearCurCourse = () => localStorage.removeItem(CUR_COURSE_STORAGE);
