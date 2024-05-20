import { CUR_LECTURE_STORAGE } from "../../utils/consts";

export const getCurLecture = () => JSON.parse(localStorage.getItem(CUR_LECTURE_STORAGE)||"{}");
export const setCurLecture = (token: any | null) =>
  token
    ? localStorage.setItem(CUR_LECTURE_STORAGE, JSON.stringify(token))
    : localStorage.removeItem(CUR_LECTURE_STORAGE);
export const clearCurLecture = () => localStorage.removeItem(CUR_LECTURE_STORAGE);
