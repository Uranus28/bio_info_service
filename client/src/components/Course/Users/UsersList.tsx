import React, { FC, useState } from "react";
import "antd/dist/antd.css";
import { Avatar, Button, Divider, List } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import RoleEdit from "../ModalForms/EditRole";
import { getLocalStorage, isAdmin } from "../../utils/testing";
import { USER_STORAGE } from "../../../utils/consts";
import { Loader } from "../../UI/Loader/Loader";
interface UsersListProps {
  onUpdateUsers: () => void;
  isEdit: boolean;
  isCheck: boolean;
  handleCheckAttempts: any;
  users: any;
  fetchUsers: () => Promise<void>;
}
export const UsersList: FC<UsersListProps> = ({
  onUpdateUsers,
  isEdit,
  isCheck,
  handleCheckAttempts,
  users,
  fetchUsers,
}) => {
  const [isEditRoleFormVisible, setIsEditRoleFormVisible] = useState(false);
  const [userEdit, setUserEdit] = useState({});

  const user = getLocalStorage(USER_STORAGE);

  const handleEditRole = (userItem: any) => {
    setUserEdit(userItem);
    setIsEditRoleFormVisible(true);
  };

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <InfiniteScroll
        loader={<Loader />}
        next={fetchUsers}
        dataLength={users.length}
        hasMore={users.length > 50}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={users}
          renderItem={(item: any) => (
            <List.Item key={item.uid}>
              <List.Item.Meta
                avatar={
                  <Avatar style={{ backgroundColor: "coral" }}>
                    {item.fullName.substring(0, 1)}
                  </Avatar>
                }
                title={item.fullName}
                description={item.role}
              />
              {isAdmin(user) && isEdit && !isAdmin(item) ? (
                <Button
                  onClick={() => handleEditRole(item)}
                  style={{ marginLeft: "5px" }}
                  //   variant="outline-success"
                >
                  Изменить роль
                </Button>
              ) : null}
              {isAdmin(user) && isCheck && !isAdmin(item) ? (
                <Button
                  onClick={() => handleCheckAttempts(item)}
                  style={{ marginLeft: "5px" }}
                  //   variant="outline-success"
                >
                  Проверить попытки
                </Button>
              ) : null}
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <RoleEdit
        onUpdateUsers={onUpdateUsers}
        user={userEdit}
        isVisible={isEditRoleFormVisible}
        setIsVisible={setIsEditRoleFormVisible}
      ></RoleEdit>
    </div>
  );
};
