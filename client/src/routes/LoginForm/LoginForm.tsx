import React, { FC, useState } from "react";
import { Form, Button, message } from "antd";
import { Layout } from "antd";
import { auth } from "../../services/firebase";
import "./styles.css";
import TestingApi from "../../API/TestingApi";
import Loader from "../../components/UI/Loader/Loader";
import { setLocalStorage } from "../../components/utils/testing";
import { MAIN_ROUTE, USER_STORAGE } from "../../utils/consts";
import history from "../../services/history";
import { FormInput } from "../../shared/LoginForm";

const { Content } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface LoginFormProps {
  setUser: React.Dispatch<any>;
}
export const LoginForm: FC<LoginFormProps> = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typeLog, setTypeLog] = useState(true);

  const fetchCreateUser = async (item: any) => {
    setIsLoading(true);
    let response = await TestingApi.createUser(item);
    if (response.data === "ok") {
      console.log("daskndasldkdlnakdad");
      message.success("Вы успешно зарегистрированы");
    }
    setIsLoading(false);
  };

  const handleRegIn = async () => {
    console.log("aaaaaaaaaaaa");
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      const item = {
        uid: user?.uid,
        email: user?.email,
        firstName: firstName,
        lastName: lastName,
      };
      fetchCreateUser(item);
      setTypeLog(true);
    } catch (err) {
      let errMessage = "";
      if (err instanceof Error) {
        errMessage = err.message;
      }
      message.error("Пользователь с таким email уже существует");
      console.log(errMessage);
    }
  };

  const fetchUser = async (uid: any) => {
    setIsLoading(true);
    try {
      let response = await TestingApi.getUser(uid);
      setUser(response.data);
      setLocalStorage(USER_STORAGE, response.data);
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

  const handleSignIn = async (email: string, password: string) => {
    try {
      const res = await auth.signInWithEmailAndPassword(email, password);
      fetchUser(res.user?.uid);
      history.push(MAIN_ROUTE);
      // setErrorMessage("");
    } catch (err) {
      let errMessage = "";
      if (err instanceof Error) {
        errMessage = err.message;
      }
      console.log(errMessage);
      message.error("Логин или пароль введены неверно");
      // setErrorMessage(errMessage);
    }
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <Content>
        <div className="loginContainer">
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={() =>
              typeLog ? handleSignIn(email, password) : handleRegIn()
            }
          >
            {/* имя */}
            {!typeLog && (
              <FormInput
                inputType={true}
                label={"Имя"}
                name={"firstName"}
                message={"Введите имя"}
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            )}
            {/* фамилия */}
            {!typeLog && (
              <FormInput
                inputType={true}
                label={"Фамилия"}
                name={"lastName"}
                message={"Введите фамилию"}
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            )}
            {/* почта */}
            <FormInput
              inputType={true}
              label={"Email"}
              name={"email"}
              message={"Введите почту"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {/* пароль */}
            <FormInput
              inputType={false}
              label={"Пароль"}
              name={"password"}
              message={"Введите пароль"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                {typeLog ? "Войти" : "Зарегестрироваться"}
              </Button>
              <div style={{ marginTop: "5px" }}>
                <a onClick={() => setTypeLog(!typeLog)}>
                  Или {typeLog ? "зарегистрироваться сейчас!" : "войти сейчас!"}
                </a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Content>
    );
  }
};
