import React, { FC, useState } from "react";
import "antd/dist/antd.css";
import { Button, Divider, List } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import EditRole from "../ModalForms/EditRole";
import { isAdmin, isTeacher } from "../../utils/testing";
import { Loader } from "../../UI/Loader/Loader";
import { AvatarInfo } from "../../../shared/AvatarInfo/AvatarInfo";
import { getUserStore } from "../../../entities/LocalStore/userStore";
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

  const user = getUserStore();

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
                avatar={<AvatarInfo firstL={item.fullName.substring(0, 1)} />}
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
              {isTeacher(user) &&
              isCheck &&
              !isAdmin(item) &&
              user.userObj !== item.userObj ? (
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
      <EditRole
        onUpdateUsers={onUpdateUsers}
        user={userEdit}
        isVisible={isEditRoleFormVisible}
        setIsVisible={setIsEditRoleFormVisible}
      ></EditRole>
    </div>
  );
};
