import React, { useEffect, useState } from "react";
import { Router } from "react-router-dom";
import { Layout, message } from "antd";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import history from "./services/history";
import { SpeciesContextProvider } from "./services/speciesContext";
import "./App.css";
import { RouterSwitcher } from "./app/RouterSwitcher/RouterSwitcher";
import { AppHeader } from "./widgets/MainFormWidgets";
const { Footer } = Layout;

const App = () => {
  const [user, setUser] = useState<any>(null);

  return (
    <SpeciesContextProvider>
      <Router history={history}>
        <Layout style={{ minHeight: "100vh" }}>
          <AppHeader user={user} />
          <RouterSwitcher user={user} setUser={setUser} />
          <Footer style={{ textAlign: "center" }}>PSU, 2020</Footer>
        </Layout>
      </Router>
    </SpeciesContextProvider>
  );
};

export default App;
