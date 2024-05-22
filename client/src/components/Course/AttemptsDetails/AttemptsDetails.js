import React, { useState,useEffect } from "react";
import 'antd/dist/antd.css';
import { Button} from "react-bootstrap"
import { Col, Divider, Form, message, Row, Space } from "antd";
import AttemptTask from "../Task/AttemptTask";
import TestingApi from "../../../API/TestingApi";
// import {Loader} from "../../UI/Loader/Loader";
import { getCurAttemps, setCurAttemps } from "../../../entities/LocalStore/curAttemps";
import { getUserStore } from "../../../entities/LocalStore/userStore";
import { getCurTest } from "../../../entities/LocalStore/curTest";
import { Loader } from "../../UI/Loader/Loader";
import { clearCurHasAttempt, getCurHasAttempt, setCurHasAttempt } from "../../../entities/LocalStore/curHasAttempt";
import { MapAttempts } from "./MapAttempts";

const AttemptsDetails = ({onUpdate,viewDetails,setViewDetails, isCheck,curcurAttemps}) => {
    const [curAttempt, setCurAttempt] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [curAttempts,setCurAttempts]=useState(curcurAttemps)
    const [attemptsLoaded,setAttemptsLoaded]=useState(getCurHasAttempt()==="trueL" ? true:false)
    const user = getUserStore();
    const curTest = getCurTest()

    const widthForm = window.innerWidth * 0.35
    let listAttempts = []
    const [myTime, setMyTime] = useState(new Date());

    function tick() {
        setMyTime(new Date());
        if(getCurHasAttempt()==="true" && !attemptsLoaded){
            setCurAttempts(getCurAttemps())
            setAttemptsLoaded(true)
            setCurHasAttempt("trueL")//типо загрузил уже
        }
        
      }

    useEffect(() => {
        var timerID = setInterval(() => tick(), 300);

        
        if(!isCheck)
        fetchAttempts()
        else if(getCurHasAttempt()==="true"){
            setCurAttempts(getCurAttemps())
        }
        else if(getCurHasAttempt()==="trueL"){
            setCurHasAttempt("true")//типо загрузил уже

        }
        else{
            const lisener=()=>{
                // When storage changes refetch
                if(getCurHasAttempt()==="true")
                setCurAttempts(getCurAttemps())
              }
            window.addEventListener("storage", lisener());
              return () => {
                clearInterval(timerID)
                // When the component unmounts remove the event listener
                if(getCurHasAttempt()!=="true")
                window.removeEventListener("storage",lisener());
              };
        }
        return () => clearInterval(timerID);
    }, [])

    const fetchAttempts = async () => {
        
        setIsLoading(true)
        try {
            let response = await TestingApi.getAttempts(user.uid, curTest.testName)
            
            setCurAttemps(response.data)
            setCurAttempts(response.data)
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

    const fetchEditAttempt = async (attempt) => {
        setIsLoading(true)
        try {
            let response = await TestingApi.editAttempt(attempt);
            if (response.data === "ok") {
                message.success('Попытка проверена успешно');
            }
            onUpdate()
            setViewDetails(false)

            clearCurHasAttempt();
            fetchAttempts()
            
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

    const handleAttempt = (attempt) => {
        setCurAttempt(attempt)
        setViewDetails(true)
    }

    const onFinish = values => {
        values.testName = curAttempt.testName
        values["userObj"] = user.userObj
        values["testObj"] = curAttempt.testObj
        values["attemptObj"] = curAttempt.attemptObj
        fetchEditAttempt(values)
        console.log('Received values of form:', values);
    };
    if(curcurAttemps){
        listAttempts = curcurAttemps.map((attempt, ind) => {
           return <MapAttempts ind={ind} handleAttempt={handleAttempt} attempt={attempt}/>

        })
    }
    else if (curAttempts) {
        listAttempts = curAttempts.map((attempt, ind) => {
           return <MapAttempts ind={ind} handleAttempt={handleAttempt} attempt={attempt}/>
           
        })
    }

    const styleResultTest = (percentComplete) => {
        let styleInput = {color: "black", fontSize: '18px'}
        if (percentComplete < 0.3) {
            styleInput.color = "red"
        } else if (percentComplete < 0.61) {
            styleInput.color = "red"
        } else if (percentComplete < 0.81) {
            styleInput.color = "orange"
        } else {
            styleInput.color = "green"
        }
        return styleInput
    }
    if(isLoading)return <Loader/>
    else
    if (!viewDetails) {
        return (
                <Col 
                // style={{border: '1px solid #cbcccd'}} 
                xs={10}>
                    {listAttempts}                           
                </Col>
        )
    } else {
        return (
            <Form 
            name={"dynamic_form_nest_item_"+curAttempt.nameTest}
            style={{border: '1px solid #cbcccd', padding:"15px",minWidth:"550px"}}
            onFinish={onFinish} 
            autoComplete="off"
            layout="vertical"
            initialValues={{
                ["testName"]: curAttempt.nameTest,
                ["tasks"]: curAttempt.tasks,
                // ["answers"]: curAttempt.tasks,
            }}
            >
                <Form.Item>
                    <Button style={{margin: '10px 0 0 30px'}} onClick={() => {setViewDetails(false); setCurAttempt({});  }}>Вернуться к списку попыток</Button>
                </Form.Item>
                <Form.Item name={"testName"}>
                    <Divider 
                        style={{color: 'rgb(76 86 96)', fontSize: '22px'}}
                        orientation="center"
                    >
                        {curAttempt.testName}
                    </Divider>
                    <Divider 
                        style={styleResultTest(curAttempt.percentComplete)}
                        orientation="left"
                    >
                        Результат теста: {curAttempt.percentComplete * 100}%
                    </Divider>
                </Form.Item>
                <Form.List name={"tasks"}>
                    {(fields) => (
                    <>
                        {fields.map((field, index) => (
                        <Space key={field.key} style={{display: 'flex', justifyContent: 'center'}}>
                            <Form.Item
                            style={{borderTop: '2px solid', paddingTop: "10px"}}
                            shouldUpdate={(prevValues, curValues) =>
                                prevValues.nameTest !== curValues.nameTest || prevValues.type !== curValues.type
                            }
                            >
                            {() => (
                                <>
                                    <Form.Item 
                                    name={[field.name, 'question']} 
                                    label={`Вопрос ${index + 1} . ${curAttempt.tasks[field.key].question} `}
                                    style={{fontWeight: 'bolder'}}
                                    ></Form.Item >
                                    <AttemptTask isCheck={isCheck} tasks={curAttempt.tasks} curAttempt={curAttempt}  widthForm={widthForm} field={field}></AttemptTask>
                                </>
                            )}
                            </Form.Item>
                        </Space>
                        ))}
                    </>
                    )}
                </Form.List>
                { isCheck
                    ?   <Form.Item>
                            <Button style={{margin: '0 0 10px 30px'}} type="primary" htmltype="submit" onClick={()=>{}}>
                                Завершить проверку
                            </Button>
                        </Form.Item> 
                    :   null
                }
            </Form>
        )
    }
}

export default AttemptsDetails;