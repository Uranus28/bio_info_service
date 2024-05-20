import { MY_COURSES_STORAGE } from "../../utils/consts";

export const getMyCourses = () => JSON.parse(localStorage.getItem(MY_COURSES_STORAGE)||"{}");
export const setMyCourses = (token: any | null) =>
  token
    ? localStorage.setItem(MY_COURSES_STORAGE,  JSON.stringify(token))
    : localStorage.removeItem(MY_COURSES_STORAGE);
export const clearMyCourses = () => localStorage.removeItem(MY_COURSES_STORAGE);
