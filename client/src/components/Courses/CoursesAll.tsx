import React, { FC, useEffect, useState } from "react";
import "antd/dist/antd.css";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import { Divider, message } from "antd";
import { cleanLocalStore, isAdmin, isTeacher } from "../utils/testing";
import CreateCourse from "../Course/ModalForms/CreateCourse";
import { COURSE_INFO_ROUTE, adminCourse } from "../../utils/consts";
import TestingApi from "../../API/TestingApi";
import { useFetching } from "../hooks/useFetching";
import { Loader } from "../UI/Loader/Loader";
import { ErrorMessage } from "../UI/Messages/ErrorMessage";
import { AvatarInfo } from "../../shared/AvatarInfo/AvatarInfo";
import { getUserStore } from "../../entities/LocalStore/userStore";
import {
  getMyCourses,
  setMyCourses,
} from "../../entities/LocalStore/myCourses";
import { setCurCourse } from "../../entities/LocalStore/curCourse";
import history from "../../services/history";
export const CoursesAll: FC = () => {
  const [isCreateCourseFormVisible, setIsCreateCourseFormVisible] =
    useState(false);
  const [allCourses, setAllCourses] = useState([]);
  const [update, setUpdate] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const user = getUserStore();
  const myCourses = getMyCourses();

  const [fetchCourses, isDataLoading, dataError] = useFetching(async () => {
    let response = await TestingApi.getAllCourses();
    setAllCourses(response.data);
  });

  const fetchSubscribeCourse = async (curCourse: any) => {
    setIsLoading(true);
    try {
      const item = { uid: user.uid, courseObj: curCourse.courseObj };
      let response = await TestingApi.subscribeCourse(item);
      if (response.data === "ok") {
        message.success("Вы подписались на курс успешно");
      }
      let response2 = await TestingApi.getUserCourses(user.uid);
      setMyCourses(response2.data);
      setUpdate(!update);
    } catch (err) {
      let errMessage = "";
      if (err instanceof Error) {
        errMessage = err.message;
      }
      console.log(errMessage);
      message.error(errMessage);
    }
    setIsLoading(false);
  };

  const fetchUnsubscribeCourse = async (curCourse: any) => {
    setIsLoading(true);
    try {
      const item = { uid: user.uid, courseObj: curCourse.courseObj };
      let response = await TestingApi.unsubscribeCourse(item);
      if (response.data === "ok") {
        message.success("Вы отписались от курса успешно");
      }
      let response2 = await TestingApi.getUserCourses(user.uid);
      setMyCourses(response2.data);
      setUpdate(!update);
    } catch (err) {
      let errMessage = "";
      if (err instanceof Error) {
        errMessage = err.message;
      }
      console.log(errMessage);
      message.error(errMessage);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    cleanLocalStore(history.location.pathname);
    fetchCourses();
  }, [update]);

  const handleCourse = (item: any) => {
    setCurCourse(item);
    history.push(COURSE_INFO_ROUTE);
  };

  const handleCreateCourse = () => {
    setIsCreateCourseFormVisible(true);
  };

  const handleSubscribeCourse = (course: any) => {
    fetchSubscribeCourse(course);
  };

  const handleUnsubscribeCourse = (course: any) => {
    fetchUnsubscribeCourse(course);
  };

  const isSubscribe = (item: any) => {
    console.log(myCourses);
    let courses = [];
    if (myCourses.length > 0)
      courses = myCourses.filter(
        (elem: { courseName: any }) => elem.courseName === item.courseName
      );
    return courses.length > 0 ? true : false;
  };

  const View = () => {
    const listCourses = allCourses.map((item: any) => {
      const isSubscr = isSubscribe(item);
      console.log(item);
      if (item.courseObj == adminCourse && !isAdmin(user)) return null;
      else
        return (
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={item.courseName}
          >
            <Col xs={1}>
              <AvatarInfo firstL={item.courseName.substring(0, 1)} />
            </Col>
            <Col
              style={{ cursor: isAdmin(user) ? "pointer" : "default" }}
              onClick={() => (isAdmin(user) ? handleCourse(item) : {})}
              xs={9}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{item.courseName}</div>
                {item.courseDescription}
              </div>
            </Col>
            <Col>
              {isSubscr ? (
                <Button
                  onClick={() => handleUnsubscribeCourse(item)}
                  variant="outline-danger"
                >
                  Покинуть курс
                </Button>
              ) : (
                <Button
                  onClick={() => handleSubscribeCourse(item)}
                  variant="outline-secondary"
                >
                  Подписаться
                </Button>
              )}
            </Col>
          </ListGroup.Item>
        );
    });

    return (
      <>
        <Row>
          <Col xs={7}>
            <Divider orientation="left">Все курсы:</Divider>
          </Col>
          {isTeacher(user) ? (
            <Col>
              <Button
                onClick={handleCreateCourse}
                style={{ marginLeft: "5px" }}
                variant="outline-success"
              >
                Создать курс
              </Button>
            </Col>
          ) : null}
        </Row>
        <CreateCourse
          isVisible={isCreateCourseFormVisible}
          setIsVisible={setIsCreateCourseFormVisible}
          update={update}
          setUpdate={setUpdate}
        ></CreateCourse>
        <ListGroup variant="flush">{listCourses}</ListGroup>
      </>
    );
  };

  const spinner = isDataLoading || isLoading ? <Loader /> : null;
  const errorMessage = dataError ? <ErrorMessage message={dataError} /> : null;
  const content = !(isDataLoading || isLoading) ? <View /> : null;

  return (
    <>
      {spinner}
      {errorMessage}
      {content}
    </>
  );
};

export default CoursesAll;
