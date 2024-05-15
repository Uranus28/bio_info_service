import React, { FC, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import AddData from "../../routes/AddData/AddData";
import { Allergens } from "../../routes/Allergens/Allergens";
import { Archive } from "../../routes/Archive/Archive";
import { LoginForm } from "../../routes/LoginForm/LoginForm";
import { MainPage } from "../../routes/MainPage";
import Profile from "../../routes/Profile/Profile";
import ProtectedRoute from "../../routes/ProtectedRoute";
import Testing from "../../routes/Testing/Testing";
import { ViewData } from "../../routes/ViewData/ViewData";
import { auth } from "../../services/firebase";
import {
  LOGIN_ROUTE,
  VIEW_ROUTE,
  ADD_ROUTE,
  SEARCH_ROUTE,
  TESTING_ROUTE,
  ARCHIVE_ROUTE,
  ALLERGENS_ROUTE,
  PROFILE_ROUTE,
  TESTING_COURSES_ROUTE,
  TESTING_ALL_COURSES_ROUTE,
  COURSE_INFO_ROUTE,
  COURSE_TESTS_TEST_ROUTE,
  COURSE_TESTS_TEST_EDIT_ROUTE,
  COURSE_TESTS_TEST_VARIANTS_ROUTE,
  COURSE_TESTS_ROUTE,
  COURSE_LECTIONS_ROUTE,
  TESTS_TEST_ATTEMPT_ROUTE,
  TESTS_TEST_ATTEMPTS_DETAILS_ROUTE,
  TESTS_TEST_CHECK_WORKS_ROUTE,
  COURSE_TERMS_ROUTE,
  COURSE_ONTOLOGY_ROUTE,
} from "../../utils/consts";
import Search from "../../routes/Search/Search";
import Layout from "antd/lib/layout";

interface RouterSwitcherProps {
  user: any;
  setUser: React.Dispatch<any>;
  setSelectedKey: React.Dispatch<React.SetStateAction<string>>;
}

const { Content } = Layout;

export const RouterSwitcher: FC<RouterSwitcherProps> = ({
  user,
  setUser,
  setSelectedKey,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);
  return (
    <Switch>
      <Route
        path={LOGIN_ROUTE}
        exact
        render={() => (
          <Content>
            <LoginForm setUser={setUser} setSelectedKey={setSelectedKey} />
          </Content>
        )}
      />

      <Route path={VIEW_ROUTE} exact component={ViewData} />

      <ProtectedRoute
        exact
        path={ADD_ROUTE}
        user={user}
        loading={loading}
        component={AddData}
      />

      <ProtectedRoute
        exact
        path={SEARCH_ROUTE}
        user={user}
        loading={loading}
        component={Search}
      />

      <ProtectedRoute
        exact
        path={TESTING_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <Route exact path={ARCHIVE_ROUTE} component={Archive} />
      <Route exact path={ALLERGENS_ROUTE} component={Allergens} />

      <ProtectedRoute
        exact
        path={PROFILE_ROUTE}
        user={user}
        loading={loading}
        component={Profile}
      />

      <ProtectedRoute
        exact
        path={TESTING_COURSES_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={TESTING_ALL_COURSES_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={COURSE_INFO_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={COURSE_TESTS_TEST_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={COURSE_TESTS_TEST_EDIT_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={COURSE_TESTS_TEST_VARIANTS_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={COURSE_TESTS_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={COURSE_LECTIONS_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={TESTS_TEST_ATTEMPT_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={TESTS_TEST_ATTEMPTS_DETAILS_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <ProtectedRoute
        exact
        path={TESTS_TEST_CHECK_WORKS_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />
      <ProtectedRoute
        exact
        path={COURSE_TERMS_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />
      <ProtectedRoute
        exact
        path={COURSE_ONTOLOGY_ROUTE}
        user={user}
        loading={loading}
        component={Testing}
      />

      <Route path="/" exact component={MainPage} />
    </Switch>
  );
};
