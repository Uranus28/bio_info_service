import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import {Button} from "react-bootstrap"
import history from "../../../services/history";
import { COURSE_TESTS_ROUTE,  TESTS_TEST_ATTEMPTS_DETAILS_ROUTE, TESTS_TEST_ATTEMPT_ROUTE, TESTS_TEST_CHECK_WORKS_ROUTE } from "../../../utils/consts";
import {  isTeacher } from "../../utils/testing";
import TestEdit from "../ModalForms/CourseTestEdit";
import {Loader} from "../../UI/Loader/Loader";
import TestingApi from "../../../API/TestingApi";
import { Divider, message, Modal, Row } from "antd";
import { getCurTest, setCurTest } from "../../../entities/LocalStore/curTest";
import { getCurCourse, setCurCourse } from "../../../entities/LocalStore/curCourse";
import { getUserStore } from "../../../entities/LocalStore/userStore";
import { setCurAttemps } from "../../../entities/LocalStore/curAttemps";
import { List } from "antd/lib/form/Form";
import { ListLectures } from "../../api/ListLectures";

const CourseTestVariants = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [attempts, setAttempts] = useState([])
    const [pathTerms,setPathTerms]=useState([])

    const curTest = getCurTest()
    const curCourse = getCurCourse()
    const user = getUserStore()
    const [testToggle,setTestToggle]=useState(false)

    const [isEsitTestFormVisible, setIsEditTestFormVisible] = useState(false)
    const [isTermsFormVisible,setIsTermsFormVisible] = useState(false)
    const fetchAttempts = async () => {
        setIsLoading(true)
        try {
            let response = await TestingApi.checkTestOpened(user.uid, curTest.testName)
            setTestToggle(response.data)
            let isOpenned=response.data
            
            response = await TestingApi.getAttempts(user.uid, curTest.testName)
            setAttempts(response.data)
            console.log(response.data.at(-1))
            if (!isOpenned){
                response = await TestingApi.getPathsTerms(user.userObj, response.data.at(-1).attemptObj)
                setPathTerms(response.data)
                console.log(response.data)
            }
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

    const fetchTest = async () => {
        setIsLoading(true)
        try {
            let response = await TestingApi.getTest(curTest.testName)
            setCurTest(response.data)
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

    useEffect(() => {
        
        fetchAttempts()
        fetchTest()
    }, [])

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

    const onDeleteTest = () => {
        fetchDelete()
    }



    const listTerms = (unknownTerms,type) => {
        console.log(testToggle)
        console.log(unknownTerms)
        console.log(pathTerms)
        return (
            <List
            size="small"
            bordered
            itemLayout="horizontal"
            style={{borderColor: type ? "green" : "red"}}
            dataSource={unknownTerms}
            renderItem={(term, index) => {
                return (
                    <>
                        <List.Item 
                        style={{color: 'rgba(0, 0, 0, 0.65)', display: 'flex', justifyContent: 'between', alignItems: 'center'}}
                        key={index}
                        >
                            <div 
                            style={{fontWeight: '700', marginLeft: '2', marginRight: 'auto'}}
                            key={term.termObj} 
                            > 
                                {term.term}
                            </div>
                            {type ? null : pathTerms.lectures[term.termObj].length != 0 ? (
                                <ListLectures terms={pathTerms} term={term} index={index} />
                            ) : null}
                        </List.Item>
                    </>
                )                    
            }}
        />
        )
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
                <Row>
                    <Button 
                        style={{lineHeight: "0.8", margin: "30px 30px", opacity:testToggle?1:0.4}} 
                        variant="outline-success"
                        onClick={testToggle ? handleStartTest : setIsTermsFormVisible(true)}
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
                { !isLoading ?
                // { !isLoading && !testToggle?
                <Modal 
                title="Рекомендации" 
                visible={isTermsFormVisible}
                onCancel={setIsTermsFormVisible(false)}
                footer={[
                    <Button key="back" onClick={setIsTermsFormVisible(false)}>
                      Назад
                    </Button>
                  ]}>
                    <Divider/>
                    {listTerms(pathTerms.pathTerms,false)}
                </Modal>:null}
                { !isLoading
                    ? <TestEdit isVisible={isEsitTestFormVisible} setIsVisible={setIsEditTestFormVisible}></TestEdit>
                    : null
                }
            </>
        )
    }

    const spinner = isLoading ? <Loader/> : null;
    //const errorMessage = attemptsError ? <ErrorMessage message={attemptsError} /> : null;
    const content = !(isLoading) ? <View/> : null;

    return (
        <>
            {spinner}
            {content}
        </>
    )
}

export default CourseTestVariants;