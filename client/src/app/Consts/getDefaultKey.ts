import { MAIN_ROUTE, ALLERGENS_ROUTE, ADD_ROUTE, VIEW_ROUTE, ARCHIVE_ROUTE, SEARCH_ROUTE, TESTING_ROUTE, PROFILE_ROUTE, LOGIN_ROUTE, TESTING_ALL_COURSES_ROUTE, TESTING_COURSES_ROUTE, BACK_TO_TESTING_COURSES_ROUTE, COURSE_INFO_ROUTE, COURSE_LECTIONS_ROUTE, COURSE_ONTOLOGY_ROUTE, COURSE_TERMS_ROUTE, COURSE_TESTS_ROUTE } from "../../utils/consts";
import history from "../../services/history";
export const getDefaultKey = () => {
  console.log(history.location.pathname)
    switch (history.location.pathname) {
      case MAIN_ROUTE:
        return "1";
      case ALLERGENS_ROUTE:
        return "2";
      case ADD_ROUTE:
        return "3";
      case VIEW_ROUTE:
        return "4";
      case ARCHIVE_ROUTE:
        return "5";
      case SEARCH_ROUTE:
        return "6";
      case TESTING_ROUTE:
      case TESTING_ALL_COURSES_ROUTE:
      case TESTING_COURSES_ROUTE:
      case COURSE_INFO_ROUTE:
      case COURSE_LECTIONS_ROUTE:
      case COURSE_TESTS_ROUTE:
      case COURSE_TERMS_ROUTE:
      case COURSE_ONTOLOGY_ROUTE:
      case BACK_TO_TESTING_COURSES_ROUTE:
        return "7";
      case PROFILE_ROUTE:
      case LOGIN_ROUTE:
        return "8";        
      default:
        return "1";
    }
  };