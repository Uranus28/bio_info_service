import React, { useContext, useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { ListGroup, Row, Col, Button } from 'react-bootstrap';
import { Context } from '../../index';
import { Divider, message } from "antd";
import history from "../../services/history";
import {  isTeacher } from '../utils/testing';
import CreateCourse from '../Course/ModalForms/CreateCourse';
import { COURSE_INFO_ROUTE, TESTING_ALL_COURSES_ROUTE } from '../../utils/consts';
import TestingApi from '../../API/TestingApi';
import {Loader} from '../UI/Loader/Loader';
import { AvatarInfo } from "../../shared/AvatarInfo/AvatarInfo";
import { getUserStore } from '../../entities/LocalStore/userStore';
import { setCurCourse } from '../../entities/LocalStore/curCourse';
import { setMyCourses } from '../../entities/LocalStore/myCourses';

const Courses = () => {
    const [isCreateCourseFormVisible, setIsCreateCourseFormVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [Courses, setCourses] = useState([])

    const user = getUserStore()

    const fetchCourses = async () => {
        setIsLoading(true)
        try {
            let response = await TestingApi.getUserCourses(user.uid);
            setCourses(response.data)
            setMyCourses(response.data)        
        } catch (err) {
            let errMessage = "";
            if (err instanceof Error) {
                errMessage = err.message;
            }
            console.log(user.uid)
            console.log(errMessage);
            message.error(errMessage)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        fetchCourses()
    }, [])

    const handleCourse = (item) => {
        setCurCourse(item)
        history.push(COURSE_INFO_ROUTE);
    }

    const handleAddCourse = () => {
        history.push(TESTING_ALL_COURSES_ROUTE);
    }

    const handleCreateCourse = () => {
        setIsCreateCourseFormVisible(true)
    }

   // if (history.action === "POP") {
   //     console.log("POPOPO")
   // }

    let listItems = []

    if (Courses) {
        listItems = Courses.map((item, index) => {
            return (
                <ListGroup.Item 
                    className="d-flex justify-content-between align-items-start"
                    style={{cursor: 'pointer'}}
                    onClick={() => handleCourse(item)}
                    key={index}
                >
            <AvatarInfo firstL={item.courseName.substring(0, 1)} />
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{item.courseName}</div>
                        {item.courseDescription}
                    </div>                    
                </ListGroup.Item>
            )
        })
    }

    const View = () => {
        return (
            <>
                <Row>
                    <Col xs={7}>
                        <Divider orientation="left">Мои курсы:</Divider>
                    </Col>
                    <Col>
                        <Button onClick={handleAddCourse} variant="outline-success">Добавить</Button>{' '}
                    </Col>
                    { isTeacher(user)
                        ? <Col><Button onClick={handleCreateCourse} style={{marginLeft: "5px"}} variant="outline-success">Создать курс</Button></Col>
                        : null
                    }
                </Row>
                <CreateCourse isVisible={isCreateCourseFormVisible} setIsVisible={setIsCreateCourseFormVisible}></CreateCourse>
                <ListGroup variant="flush">
                    {listItems}
                </ListGroup>    
            </>
        )
    }

    const spinner = isLoading ? <Loader/> : null;
    //const errorMessage = dataError ? <ErrorMessage message={dataError} /> : null;
    const content = !(isLoading) ? <View/> : null;

    return (
        <>
            {spinner}
            {content}
        </>
    )
}

export default Courses;