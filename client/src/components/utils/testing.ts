import history from "../../services/history"
import { TESTING_ALL_COURSES_ROUTE, TESTING_COURSES_ROUTE, TESTING_ROUTE } from "../../utils/consts"

export const isMenuCourses = () => {
    return  history.location.pathname === TESTING_ROUTE || history.location.pathname === TESTING_COURSES_ROUTE ||
        history.location.pathname === TESTING_ALL_COURSES_ROUTE
} 

export const isAdmin = (user:any) => {
    return user.role === "admin"; 
}

export function deepEqual(obj1:any, obj2:any){
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const getWordAnswer = (index:number) => {
    const listWords = ["a)", "b)", "c)", "d)", "e)", "f)", "g)", "h)", "i)", "j)", "k)", "l)"]
    return listWords[index]
}

export const setLocalStorage = (key:string, item:any) => {
    localStorage.setItem(key, JSON.stringify(item))
} 

export const getLocalStorage = (key:string) => {
    return JSON.parse(localStorage.getItem(key) || "{}")
} 