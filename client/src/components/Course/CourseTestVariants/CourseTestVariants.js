import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import {Button} from "react-bootstrap"
import history from "../../../services/history";
import { COURSE_TESTS_ROUTE,  TESTS_TEST_ATTEMPTS_DETAILS_ROUTE, TESTS_TEST_ATTEMPT_ROUTE, TESTS_TEST_CHECK_WORKS_ROUTE } from "../../../utils/consts";
import {   isTeacher } from "../../utils/testing";
import TestEdit from "../ModalForms/CourseTestEdit";
import {Loader} from "../../UI/Loader/Loader";
import TestingApi from "../../../API/TestingApi";
import { Divider, message, Row } from "antd";
import { getCurTest, setCurTest } from "../../../entities/LocalStore/curTest";
import { getCurCourse, setCurCourse } from "../../../entities/LocalStore/curCourse";
import { getUserStore } from "../../../entities/LocalStore/userStore";
import { CheckRecomendations } from "../ModalForms/CheckRecomendations";

const CourseTestVariants = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [attempts, setAttempts] = useState([])
    const [pathTerms,setPathTerms]=useState([])
    const curTest = getCurTest()
    const curCourse = getCurCourse()
    const user = getUserStore()
    //открытый закрытый тест
    const [testToggle,setTestToggle]=useState(false)

    const [isEsitTestFormVisible, setIsEditTestFormVisible] = useState(false)
    const [isTermsFormVisible,setIsTermsFormVisible] = useState(false)
    const fetchAttempts = async () => {
        try {
            let response = await TestingApi.checkTestOpened(user.uid, curTest.testName)
            setTestToggle(response.data)
            let isOpenned=response.data
            
            response = await TestingApi.getAttempts(user.uid, curTest.testName)
            setAttempts(response.data)
            if (!isOpenned && !isTeacher(user)){
                response = await TestingApi.getPathsTerms(user.userObj, response.data.at(-1).attemptObj)
                setPathTerms(response.data)
            }
        } catch (err) {
            let errMessage = "";
            if (err instanceof Error) {
                errMessage = err.message;
            }
            console.log(errMessage);
            message.error(errMessage)
        }
    }

    const fetchTest = async () => {
        try {
            let response = await TestingApi.getTest(curTest.testName)
            console.log(response.data)
            setCurTest(response.data)
        } catch (err) {
            let errMessage = "";
            if (err instanceof Error) {
                errMessage = err.message;
            }
            console.log(errMessage);
            message.error(errMessage)
        }
    }

    useEffect(() => {     
        setIsLoading(true)  
        if(!testToggle && attempts.length==0 && !isTeacher(user)) 
        {     
            if(!isTeacher(user))fetchAttempts()
            fetchTest()}            
        if(!testToggle && attempts.length==0 && !isTeacher(user))
            setIsLoading(true)   
        else
       {
            setIsLoading(false)}
    }, [attempts])

    const fetchDelete = async () => {
        setIsLoading(true)
        try {
            let response = await TestingApi.deleteTest(curTest);
            let response1 = await TestingApi.getCourseInfo(curCourse.courseObj);
            setCurCourse(response1.data)
            setCurTest(null)
            if (response.data === "ok") {
                message.success("Тест успешно удален")
            }
            history.push(COURSE_TESTS_ROUTE);
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

    const handleStartTest = () => {
        history.push(TESTS_TEST_ATTEMPT_ROUTE);
    }

    const handleViewDetails = () => {
        history.push(TESTS_TEST_ATTEMPTS_DETAILS_ROUTE);
    }

    const handleCheckWorksStudents = () => {
        history.push(TESTS_TEST_CHECK_WORKS_ROUTE);
    }

    const onEditTest = () => {
        setIsEditTestFormVisible(true)
    }
    const onPathTerms = ()=>{
        setIsTermsFormVisible(true)
    }

    const onDeleteTest = () => {
        fetchDelete()
    }



    const View = () => {
        return (
            <>
                <Divider orientation="left">{curTest.testName}</Divider>
                
                <Row>
                    { isTeacher(user)
                        ?<Button 
                            style={{lineHeight: "0.8", margin: "30px 30px"}} 
                            variant="outline-success"
                            onClick={handleCheckWorksStudents}
                        >
                            Проверить работы студентов
                        </Button>
                        : null
                    }
                </Row>
                {!isTeacher(user) && <><Row>
                    <Button 
                        style={{lineHeight: "0.8", margin: "30px 30px", opacity:1  }}
                        variant="outline-success"
                        onClick={testToggle ? handleStartTest :onPathTerms}
                    >
                        {testToggle?"Начать попытку":"Посмотреть рекомендации"}
                    </Button>
                </Row>
                <Row style={{lineHeight: "0.8", margin: "0 30px 30px 30px"}} >
                    Совершено попыток: {attempts.length}
                    { attempts.length != 0
                        ? <Button 
                            style={{lineHeight: "0.8", margin: "0px 30px"}} 
                            variant="outline-success"
                            onClick={handleViewDetails}
                        >
                            Посмотреть подробно
                        </Button>
                        : null
                    }
                </Row>
                </>
                }
                <Row>
                    { isTeacher(user)
                        ? <Button onClick={onEditTest} style={{lineHeight: "0.8", marginLeft: "30px"}} variant="outline-secondary">Редактировать тест</Button>
                        : null
                    }
                    { isTeacher(user)
                        ? <Button onClick={onDeleteTest} style={{lineHeight: "0.8", marginLeft: "15px"}} variant="outline-danger">Удалить тест</Button>
                        : null
                    }
                </Row>
                
                { !isLoading
                    ? <TestEdit isVisible={isEsitTestFormVisible} setIsVisible={setIsEditTestFormVisible}></TestEdit>
                    : null
                }
                { !isLoading ?
                <CheckRecomendations pathTerms={pathTerms} isTermsFormVisible={isTermsFormVisible} setIsTermsFormVisible={setIsTermsFormVisible}/>
               :null}
            </>
        )
    }

    if (isLoading) {
        return <Loader/>
    } else {
        return (
        <>
            <View/>
        </>
    )}
}

export default CourseTestVariants;