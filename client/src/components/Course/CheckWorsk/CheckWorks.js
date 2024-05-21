import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Col, Divider, Input, message, Row } from "antd";
import TestingApi from "../../../API/TestingApi";
import {UsersList} from "../Users/UsersList";
import {Loader} from "../../UI/Loader/Loader";
import { UserOutlined } from '@ant-design/icons';
import AttemptsDetails from "../AttemptsDetails/AttemptsDetails";
import { getCurTest } from "../../../entities/LocalStore/curTest";
import { setCurAttemps } from "../../../entities/LocalStore/curAttemps";
import { setCurHasAttempt } from "../../../entities/LocalStore/curHasAttempt";

const CheckWorks = () => {
    const [usersAttempts, setUsersAttempts] = useState([])
    const [filterUsers, setFilterUsers] = useState([])
    const [searchUser, setSearchUser] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [curcurAttempts,setCurCurAttempts]=useState()
    const curTest = getCurTest()

    const fetchUsersWhoPassedTheTest = async () => {
        setIsLoading(true)
        try {
            let response = await TestingApi.getUsersWhoPassedTheTest(curTest);
            setUsersAttempts(response.data)
            setFilterUsers(response.data)
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
        //setLocalStorage(CUR_ATTEMPTS_STORAGE, [])
        fetchUsersWhoPassedTheTest()
    }, [update])

    const onUpdate = () => {
        setUpdate(!update)
    }

    // const fetchAttempts = async () => {
        
    //     setIsLoading(true)
    //     try {
    //         let response = await TestingApi.getAttempts(user.uid, curTest.testName)
            
    //         setCurAttemps(response.data)
    //         setCurAttempts(response.data)
    //     } catch (err) {
    //         let errMessage = "";
    //         if (err instanceof Error) {
    //             errMessage = err.message;
    //         }
    //         console.log(errMessage);
    //         message.error(errMessage)
    //     }
    //     setIsLoading(false)
    // }




    const handleCheckAttempts = async (user) => {

        setIsLoading(true)
        setCurAttemps(user.attempts)
        setCurCurAttempts(user.attempts)
        setCurHasAttempt("true")

        setIsLoading(false)
    }

    const onChange = (e) => {
        setSearchUser(e.target.value)
        setFilterUsers(usersAttempts.filter(user => user.fullName.toLowerCase().indexOf(e.target.value.toLowerCase()) != -1))
    }

    if (isLoading) {
        return (
            <Loader></Loader>
        )
    } else {
        return (
            <Row>
                <Col style={{margin: '0 30px 30px 50px'}} xs={9}>
                    <Divider style={{color: 'rgb(24 144 255)', fontSize: '20px'}} orientation="left">Студенты, проходившие тест</Divider>
                    <Input
                        placeholder="Введите имя пользователя"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        value={searchUser}
                        onChange={onChange}
                    />
                    <UsersList isCheck={true} handleCheckAttempts={handleCheckAttempts} users={filterUsers}></UsersList>
                </Col>
                <Col xs={13}>
                    <AttemptsDetails onUpdate={onUpdate} isCheck={true} curcurAttempts={curcurAttempts} ></AttemptsDetails>
                </Col>
            </Row>
        )
    }
}

export default CheckWorks;