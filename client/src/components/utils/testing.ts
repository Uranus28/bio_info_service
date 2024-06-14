import { clearCurAttemps } from "../../entities/LocalStore/curAttemps"
import { clearCurCourse } from "../../entities/LocalStore/curCourse"
import { clearCurHasAttempt } from "../../entities/LocalStore/curHasAttempt"
import { clearCurLecture } from "../../entities/LocalStore/curLecture"
import { clearCurModule } from "../../entities/LocalStore/curModule"
import { clearCurTest } from "../../entities/LocalStore/curTest"
import { clearCurUser } from "../../entities/LocalStore/curUser"
import history from "../../services/history"
import { ADD_ROUTE, ALLERGENS_ROUTE, ARCHIVE_ROUTE, COURSE_INFO_ROUTE, COURSE_LECTIONS_ROUTE, COURSE_ONTOLOGY_ROUTE, COURSE_TERMS_ROUTE, COURSE_TESTS_ROUTE, COURSE_TESTS_TEST_EDIT_ROUTE, COURSE_TESTS_TEST_VARIANTS_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, SEARCH_ROUTE, TESTING_ALL_COURSES_ROUTE, TESTING_COURSES_ROUTE, TESTING_ROUTE, TESTS_TEST_CHECK_WORKS_ROUTE, VIEW_ROUTE } from "../../utils/consts"

export const isMenuCourses = () => {
    return  history.location.pathname === TESTING_ROUTE || history.location.pathname === TESTING_COURSES_ROUTE ||
        history.location.pathname === TESTING_ALL_COURSES_ROUTE
} 

export const isAdmin = (user:any) => {
    return user.role === "admin"; 
}

export const isTeacher = (user:any) => {
    return user.role === "admin" || user.role === "teacher"; 
}

export function deepEqual(obj1:any, obj2:any){
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export const getWordAnswer = (index:number,isTEXT:boolean) => {
    const listWords = ["a)", "b)", "c)", "d)", "e)", "f)", "g)", "h)", "i)", "j)", "k)", "l)"]
    return isTEXT ? null: listWords[index]
}
export const cleanLocalStore=(type:string)=>{
    console.log(type)
    switch (type) {
        // case "Назад":
        case COURSE_TESTS_TEST_VARIANTS_ROUTE:
        case TESTS_TEST_CHECK_WORKS_ROUTE:
            clearCurHasAttempt();
            clearCurAttemps();
            return;
        case MAIN_ROUTE:
        case TESTING_COURSES_ROUTE:
        case ALLERGENS_ROUTE:
        case ADD_ROUTE:
        case VIEW_ROUTE:
        case ARCHIVE_ROUTE:
        case SEARCH_ROUTE:
        case PROFILE_ROUTE:
        case LOGIN_ROUTE:
            clearCurCourse();
            clearCurAttemps();
            clearCurLecture();
            clearCurModule();
            clearCurTest();
            clearCurUser()
            clearCurHasAttempt();
            return;
        case COURSE_INFO_ROUTE:
        case COURSE_LECTIONS_ROUTE:
        case COURSE_ONTOLOGY_ROUTE:
        case COURSE_TERMS_ROUTE:
        case COURSE_TESTS_ROUTE:
            clearCurAttemps();
                clearCurLecture();
                clearCurModule();
                clearCurTest();
                clearCurUser()
                clearCurHasAttempt();

            return;
        default:
            return null;
    }
}

// export const setLocalStorage = (key:string, item:any) => {
//     localStorage.setItem(key, JSON.stringify(item))
// } 

// export const getLocalStorage = (key:string) => {
//     return JSON.parse(localStorage.getItem(key) || "{}")
// } 