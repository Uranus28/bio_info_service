import React, { FC, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Col, Divider, Input, Row } from "antd";
import ProfileEdit from "../../components/Course/ModalForms/ProfileEdit";
import TestingApi from "../../API/TestingApi";
import { Loader } from "../../components/UI/Loader/Loader";
import { useFetching } from "../../components/hooks/useFetching";
import { UsersList } from "../../components/Course/Users/UsersList";
import { UserOutlined } from "@ant-design/icons";
import { isAdmin } from "../../components/utils/testing";
import { getUserStore } from "../../entities/LocalStore/userStore";

export const Profile: FC = () => {
  const [isProfileEditFormVisible, setIsProfileEditFormVisible] =
    useState(false);
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [update, setUpdate] = useState(false);
  const [user, setUser] = useState(getUserStore());

  const changeUser = (name: string, surname: string) => {
    let userI = user;
    userI["firstName"] = name;
    userI["lastName"] = surname;
    userI["fullName"] = name + " " + surname;
    console.log(user);
    console.log("_______________-");
    console.log(userI);
    setUser(userI);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [fetchUsers, isDataLoading, dataError] = useFetching(async () => {
    let response = await TestingApi.getUsers();
    setUsers(response.data);
    setFilterUsers(response.data);
  });

  const handleEditProfile = () => {
    setIsProfileEditFormVisible(true);
  };

  const onUpdate = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    setIsLoading(true);
    setUser(getUserStore());

    if (isAdmin(user)) fetchUsers();

    setIsLoading(false);
  }, [update]);

  const onChange = (e: any) => {
    setSearchUser(e.target.value);
    setFilterUsers(
      users.filter(
        (user: any) =>
          user.fullName.toLowerCase().indexOf(e.target.value.toLowerCase()) !=
          -1
      )
    );
  };

  if (isDataLoading || isLoading) {
    return <Loader />;
  } else {
    return (
      <div className="contain">
        <Row>
          <Col span={10} style={{ marginLeft: "20px", marginBottom: "20px" }}>
            <Divider
              style={{ color: "rgb(24 144 255)", fontSize: "20px" }}
              orientation="left"
            >
              Мои данные
            </Divider>
            <Table striped bordered>
              <tbody>
                <tr>
                  <th>Имя</th>
                  <td>{user.firstName}</td>
                </tr>
                <tr>
                  <th>Фамилия</th>
                  <td>{user.lastName}</td>
                </tr>
                <tr>
                  <th>Роль</th>
                  <td>{user.role}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{user.email}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              onClick={handleEditProfile}
              style={{ marginLeft: "5px" }}
              variant="outline-secondary"
            >
              Редактировать профиль
            </Button>
          </Col>

          {isAdmin(user) && (
            <Col span={10} offset={4} style={{ margin: "0 0 20px 50px" }}>
              <Divider
                style={{ color: "rgb(24 144 255)", fontSize: "20px" }}
                orientation="left"
              >
                Все пользователи
              </Divider>
              <Input
                placeholder="Введите имя пользователя"
                prefix={<UserOutlined className="site-form-item-icon" />}
                value={searchUser}
                onChange={onChange}
              />
              <UsersList
                onUpdateUsers={onUpdate}
                isEdit={true}
                users={filterUsers}
                isCheck={false}
                handleCheckAttempts={undefined}
                fetchUsers={fetchUsers}
              />
            </Col>
          )}
        </Row>
        <ProfileEdit
          setIsLoadingUpper={setIsLoading}
          onUpdate={onUpdate}
          changeUser={changeUser}
          isVisible={isProfileEditFormVisible}
          setIsVisible={setIsProfileEditFormVisible}
        />
      </div>
    );
  }
};

export default Profile;
