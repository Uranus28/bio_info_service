import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Divider, Avatar, message } from "antd";
import {Row, Col, ListGroup, Button, Badge} from "react-bootstrap"
import { BookOutlined } from '@ant-design/icons';
import TestingApi from "../../../API/TestingApi";
import {Loader} from "../../UI/Loader/Loader";
import { isAdmin, isTeacher } from "../../utils/testing";
import {  TESTING_ALL_COURSES_ROUTE } from "../../../utils/consts";
import history from "../../../services/history";
import {UsersList} from "../Users/UsersList";
import EditCourse from "../ModalForms/CourseEdit";
import { getUserStore } from "../../../entities/LocalStore/userStore";
import { getCurCourse, setCurCourse } from "../../../entities/LocalStore/curCourse";
import { getMyCourses, setMyCourses } from "../../../entities/LocalStore/myCourses";
import { cleanLocalStore } from "../../utils/testing";

const CourseInfo = () => {
    const [students, setStudents] = useState([])
    const [modules, setModules] = useState([])
    const [update, setUpdate] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [isVisibleCourseEditForm, setIsVisibleCourseEditForm] = useState(false)
    
    const user = getUserStore();
    const curCourse = getCurCourse();
    const myCourses = getMyCourses()

    let listStudents = []
    let listModules = []

    const fetchCourseInfo = async () => {
        setIsLoading(true)
        try {
            let response = await TestingApi.getCourseInfo(curCourse.courseObj);
            setCurCourse(response.data)
            setStudents(response.data.students.filter(item =>!isTeacher(user)? item.role !== "admin" && item.role !== "teacher":(user.role=="teacher")?item.role !== "admin":item.role))
            setModules(response.data.modules)
        } catch (err) {
            let errMessage = "";
            if (err instanceof Error) {
                errMessage = err.message;
            }
            console.log(errMessage);
            message.error(errMessage)
        }
        setIsLoading(false)
    }

    const fetchSubscribeCourse = async () => {
        setIsLoading(true)
        try {
            const item = {uid: user.uid, courseObj: curCourse.courseObj}
            let response = await TestingApi.subscribeCourse(item);
            if (response.data === "ok") {
                message.success('Вы подписались на курс успешно');
            }
            let response2 = await TestingApi.getUserCourses(user.uid);
            setMyCourses(response2.data)
            onUpdate()
        } catch (err) {
            let errMessage = "";
            if (err instanceof Error) {
                errMessage = err.message;
            }
            console.log(errMessage);
            message.error(errMessage)
        }
        setIsLoading(false)
    }

    const fetchUnsubscribeCourse = async () => {
        setIsLoading(true)
        try {
            const item = {uid: user.uid, courseObj: curCourse.courseObj}
            let response = await TestingApi.unsubscribeCourse(item);
            if (response.data === "ok") {
                message.success('Вы отписались от курса успешно');
            }
            let response2 = await TestingApi.getUserCourses(user.uid);
            setMyCourses(response2.data)
            onUpdate()
        } catch (err) {
            let errMessage = "";
            if (err instanceof Error) {
                errMessage = err.message;
            }
            console.log(errMessage);
            message.error(errMessage)
        }
        setIsLoading(false)
    }

    const fetchDeleteCourse = async () => {
        setIsLoading(true)
        try {
            let response = await TestingApi.deleteCourse(curCourse);
            if (response.data === "ok") {
                message.success('Курс удалён успешно');
            }
            history.push(TESTING_ALL_COURSES_ROUTE);
        } catch (err) {
            let errMessage = "";
            if (err instanceof Error) {
                errMessage = err.message;
            }
            console.log(errMessage);
            message.error(errMessage)
        }
        setIsLoading(false)
    }

    const onUpdate = () => {
        setUpdate(!update)
    }

    useEffect(() => {
        cleanLocalStore(history.location.pathname)
        fetchCourseInfo()
    }, [update])

    const handleEditCourse = () => {
        setIsVisibleCourseEditForm(true)
    }

    const handleSubscribeCourse = () => {
        fetchSubscribeCourse()
    }

    const handleUnsubscribeCourse = () => {
        fetchUnsubscribeCourse()
    }

    const handleDeleteCourse = () => {
        fetchDeleteCourse()
    }

    const isSubscribe = () => {
        const courses = myCourses.filter(elem => elem.courseName === curCourse.courseName)
        return courses.length > 0 ? true : false
    }

    if (modules) {
        listModules = modules.map((item, index) => {
            //const countPractice = item.practice.length
            const countLectures = item.lectures.length
            return (
                <ListGroup.Item 
                    as="li"
                    className="d-flex justify-content-between align-items-start"
                    key={index}
                >
                    <>
                        <div style={{fontSize: '14px'}} className="ms-2 me-auto">
                            <div className="fw-bold">{index+1}. {item.nameModule}</div>
                        </div> 
                        <Badge style={{color: 'black'}} bg="primary" pill>
                           <BookOutlined/> Материалов: {countLectures}
                        </Badge>        
                    </>            
                </ListGroup.Item>
            )
        })
    }

    const View = () => {
        return (
            <>
                <Row>
                    <Col>
                        <Divider style={{color: 'rgb(24 144 255)', fontSize: '20px'}} orientation="left">Информация о курсе:</Divider>
                        {curCourse.courseInfo}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        { isTeacher(user)
                            ? <Button onClick={handleDeleteCourse} style={{lineHeight: "0.8", margin: "20px 0 0 20px"}} variant="outline-danger">Удалить курс</Button>
                            : null
                        }
                        { isTeacher(user)
                            ? <Button onClick={handleEditCourse} style={{lineHeight: "0.8", margin: "20px 0 0 20px"}} variant="outline-secondary">Редактировать курс</Button>
                            : null
                        }
                    </Col>
                    <EditCourse isVisible={isVisibleCourseEditForm} setIsVisible={setIsVisibleCourseEditForm} onUpdate={onUpdate}></EditCourse>
                </Row>
                <Row>
                    <Col xs={7}>
                        <Divider style={{color: 'rgb(24 144 255)', fontSize: '20px'}} orientation="left">Модули курса:</Divider>
                        <ListGroup as="ol">
                        {listModules}
                        </ListGroup>
                        {isSubscribe()
                            ? <Button style={{marginTop: "20px"}} onClick={() => handleUnsubscribeCourse(curCourse)} variant="outline-danger">Покинуть курс</Button>
                            : <Button style={{marginTop: "20px"}} onClick={() => handleSubscribeCourse(curCourse)} variant="outline-success">Подписаться на курс</Button>
                        }
                    </Col>
                    <Col>
                        <Divider style={{color: 'rgb(24 144 255)', fontSize: '20px'}} orientation="left">Студенты:</Divider>
                        <UsersList isEdit={false} users={students}/>
                    </Col>
                </Row>
            </>
        )
    }
    

    const spinner = isLoading ? <Loader/> : null;
    //const errorMessage = dataError || subscribeError || unsubscribeError ? <ErrorMessage message={dataError} /> : null;
    const content = !(isLoading) ? <View/> : null;

    return (
        <>
            {spinner}
            {content}
        </>
    )
}

export default CourseInfo;