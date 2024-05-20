import { clearCurAttemps } from "../../entities/LocalStore/curAttemps"
import { clearCurModule } from "../../entities/LocalStore/curModule"
import { clearCurTest } from "../../entities/LocalStore/curTest"
import history from "../../services/history"
import { COURSE_TESTS_ROUTE, TESTING_ALL_COURSES_ROUTE, TESTING_COURSES_ROUTE, TESTING_ROUTE } from "../../utils/consts"

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

export const getWordAnswer = (index:number) => {
    const listWords = ["a)", "b)", "c)", "d)", "e)", "f)", "g)", "h)", "i)", "j)", "k)", "l)"]
    return listWords[index]
}

export const cleanLocalStore=(type:string)=>{
    console.log(type)
    switch (type) {
        // case COURSE_INFO_ROUTE:
        //   return <EllipsisOutlined />;
        // case COURSE_LECTIONS_ROUTE:
        //   return <BookOutlined />;
        case COURSE_TESTS_ROUTE:
            
            clearCurModule();
            clearCurAttemps();
            clearCurTest();
          break;
        // case COURSE_TERMS_ROUTE:
        //   return <FontSizeOutlined />;
        // case COURSE_ONTOLOGY_ROUTE:
        //   return <BranchesOutlined />;
        // case TESTING_ALL_COURSES_ROUTE:
        //   return <AppstoreOutlined />;
        default:
          break;
    
}
}

// export const setLocalStorage = (key:string, item:any) => {
//     localStorage.setItem(key, JSON.stringify(item))
// } 

// export const getLocalStorage = (key:string) => {
//     return JSON.parse(localStorage.getItem(key) || "{}")
// } 