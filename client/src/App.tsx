import React, { FC, useState } from "react";
import { Router } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import history from "./services/history";
import { SpeciesContextProvider } from "./services/speciesContext";
import "./App.css";
import { RouterSwitcher } from "./app/RouterSwitcher/RouterSwitcher";
import { AppHeader } from "./widgets/MainFormWidgets";
import { getDefaultKey } from "./app/Consts/getDefaultKey";
const { Footer } = Layout;

export const App: FC = () => {
  const [user, setUser] = useState<any>(null);
  const [selectedKey, setSelectedKey] = useState(getDefaultKey());

  return (
    <SpeciesContextProvider>
      <Router history={history}>
        <Layout
          style={{
            // overflow: "auto",
            minHeight: "100vh",
            minWidth: "155vh",
            height: "100%",
            display: "flex",
          }}
        >
          <AppHeader
            user={user}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
          />
          <RouterSwitcher
            user={user}
            setUser={setUser}
            setSelectedKey={setSelectedKey}
          />
          <Footer style={{ textAlign: "center" }}>PSU, 2020</Footer>
        </Layout>
      </Router>
    </SpeciesContextProvider>
  );
};
