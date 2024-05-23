import { TESTING_ALL_COURSES_ROUTE, TESTING_COURSES_ROUTE, BACK_TO_TESTING_COURSES_ROUTE, COURSE_INFO_ROUTE, COURSE_LECTIONS_ROUTE, COURSE_ONTOLOGY_ROUTE, COURSE_TERMS_ROUTE, COURSE_TESTS_ROUTE, COURSE_TESTS_TEST_VARIANTS_ROUTE, TESTS_TEST_CHECK_WORKS_ROUTE, TESTS_TEST_ATTEMPTS_DETAILS_ROUTE, TESTS_TEST_ATTEMPT_ROUTE, COURSE_TESTS_TEST_EDIT_ROUTE, COURSE_TESTS_TEST_ROUTE } from "../../utils/consts";
import history from "../../services/history";
export const getKey = () => {
  console.log(history.location.pathname)
    switch (history.location.pathname) {
      case COURSE_INFO_ROUTE:
      case TESTING_COURSES_ROUTE:
        return "1";
      case COURSE_LECTIONS_ROUTE:
      case TESTING_ALL_COURSES_ROUTE:
        return "2";
      case COURSE_TESTS_ROUTE:
      case COURSE_TESTS_TEST_VARIANTS_ROUTE:
      case TESTS_TEST_CHECK_WORKS_ROUTE:
      case TESTS_TEST_ATTEMPTS_DETAILS_ROUTE:
      case TESTS_TEST_ATTEMPT_ROUTE:
      case COURSE_TESTS_TEST_EDIT_ROUTE:
      case COURSE_TESTS_TEST_ROUTE:
        return "3";
      case COURSE_TERMS_ROUTE:
        return "5";
      case COURSE_ONTOLOGY_ROUTE:
        return "6";
      case BACK_TO_TESTING_COURSES_ROUTE:
        return "7";     
      default:
        return "1";
    }
  };