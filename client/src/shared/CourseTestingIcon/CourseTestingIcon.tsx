import React, { FC } from "react";
import {
  COURSE_INFO_ROUTE,
  COURSE_LECTIONS_ROUTE,
  COURSE_ONTOLOGY_ROUTE,
  COURSE_TERMS_ROUTE,
  COURSE_TESTS_ROUTE,
  TESTING_ALL_COURSES_ROUTE,
} from "../../utils/consts";
import {
  ReadOutlined,
  ArrowLeftOutlined,
  BookOutlined,
  ProfileOutlined,
  BranchesOutlined,
  FontSizeOutlined,
  EllipsisOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

interface CourseTestingIconProps {
  type: string;
  is_back: boolean;
}
export const CourseTestingIcon: FC<CourseTestingIconProps> = ({
  type,
  is_back = false,
}) => {
  switch (type) {
    case COURSE_INFO_ROUTE:
      return <EllipsisOutlined />;
    case COURSE_LECTIONS_ROUTE:
      return <BookOutlined />;
    case COURSE_TESTS_ROUTE:
      return <ProfileOutlined />;
    case COURSE_TERMS_ROUTE:
      return <FontSizeOutlined />;
    case COURSE_ONTOLOGY_ROUTE:
      return <BranchesOutlined />;
    case TESTING_ALL_COURSES_ROUTE:
      return <AppstoreOutlined />;
    default:
      return is_back ? <ArrowLeftOutlined /> : <ReadOutlined />;
  }
};
