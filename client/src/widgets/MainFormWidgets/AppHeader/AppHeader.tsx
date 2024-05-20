import { Layout, Button, Menu } from "antd";
import React, { FC, useContext } from "react";
import { auth } from "../../../services/firebase";
import history from "../../../services/history";
import { LOGIN_ROUTE } from "../../../utils/consts";
import { Link } from "react-router-dom";
import { Context } from "../../..";
import { getDefaultKey } from "../../../app/Consts/getDefaultKey";

import "./AppHeader.css";

const { Header } = Layout;

interface AppHeaderProps {
  user: any;
  selectedKey: string;
  setSelectedKey: React.Dispatch<React.SetStateAction<string>>;
}

export const AppHeader: FC<AppHeaderProps> = ({
  user,
  selectedKey,
  setSelectedKey,
}) => {
  const { services } = useContext(Context);
  //const [isLoadingHeader, setIsLoadingHeader] = useState(false);
  const logOut = () => {
    return auth.signOut().then(() => {
      localStorage.clear();
      setSelectedKey("8");
      return history.push(LOGIN_ROUTE);
    });
  };

  return (
    <Header className="mainHeader">
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[selectedKey]}
        onClick={(e) => setSelectedKey(getDefaultKey())}
      >
        {services.MenuApp.map((item: any) => {
          return (
            <Menu.Item
              style={
                item.need_auth && !user
                  ? { pointerEvents: "none", opacity: "0.4" }
                  : {}
              }
              key={item.id}
            >
              <Link to={item.link}>{item.name}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
      {user && (
        <Button type="link" onClick={(e) => logOut()}>
          Выйти
        </Button>
      )}
    </Header>
  );
};
