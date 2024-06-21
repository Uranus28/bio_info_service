import React, { useContext, useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu,Divider } from 'antd';
import { Breadcrumb } from 'react-bootstrap'
import { Router, Switch, Route, Link } from "react-router-dom";
import Courses from '../../components/Courses/Courses';
import { UserOutlined } from '@ant-design/icons';
import history from '../../services/history';
import { Context } from '../..';
import { COURSE_INFO_ROUTE, COURSE_LECTIONS_ROUTE, COURSE_ONTOLOGY_ROUTE, COURSE_TERMS_ROUTE, COURSE_TESTS_ROUTE, COURSE_TESTS_TEST_EDIT_ROUTE, COURSE_TESTS_TEST_VARIANTS_ROUTE, TESTING_ALL_COURSES_ROUTE, TESTING_COURSES_ROUTE, TESTING_ROUTE, TESTS_TEST_ATTEMPTS_DETAILS_ROUTE, TESTS_TEST_ATTEMPT_ROUTE, TESTS_TEST_CHECK_WORKS_ROUTE } from '../../utils/consts';
import { cleanLocalStore, isMenuCourses } from '../../components/utils/testing';
import CourseInfo from '../../components/Course/CourseInfo/CourseInfo';
import CourseTests from '../../components/Course/CourseTests/CourseTests';
import CourseTest from '../../components/Course/CourseTest/CourseTest';
import CourseTestVariants from '../../components/Course/CourseTestVariants/CourseTestVariants';
import TestEdit from '../../components/Course/ModalForms/CourseTestEdit';
import CoursesAll from '../../components/Courses/CoursesAll';
import CourseLections from '../../components/Course/CourseLections/CourseLections';
import AttemptsDetails from '../../components/Course/AttemptsDetails/AttemptsDetails';
import CheckWorks from '../../components/Course/CheckWorsk/CheckWorks';
import TermsPage from '../../components/Course/Terms/Terms';
import OntologyPage from '../../components/Course/Ontology/OntologyPage';
import { CourseTestingIcon } from '../../shared/CourseTestingIcon/CourseTestingIcon';
import { getCurCourse } from '../../entities/LocalStore/curCourse';
import { getKey } from './getKey';

const { Header, Content, Sider } = Layout;

const Testing = () => {
    
    const {services} = useContext(Context)
    const [selectedKey,setSelectedKey]=useState(getKey())
    const curCourse = getCurCourse();
    const routes = services.Routes[history.location.pathname];


    const [viewDetails,setViewDetails]=useState(false)

    const menuItems = isMenuCourses() ? services.MenuTesting : services.MenuCourse;

    const menuItemsList = menuItems.map((item) => {
        return (
            <Menu.Item key={item.id} icon={<CourseTestingIcon type={item.link} is_back={item.name==="Назад" ? true:false} />}>
                <Link to={item.link} onClick={()=>{cleanLocalStore(item.link)}}>{item.name}</Link>
            </Menu.Item>
        )
    })

    let listRoutes = []

    if (routes) {
        listRoutes = routes.map((item) => {
                return (
                    <Breadcrumb.Item onClick={
                        item.active?()=>{}
                        :
                        ()=>{
                            cleanLocalStore(item.path)
                        }
                    } 
                        key={item.path} active={item.active?true:false} linkAs={item.active?null:Link} linkProps={item.active?{}:{ to: item.path }}>{item.title}</Breadcrumb.Item>
                    )
        })
    }

    return (
        <Router history={history}>
            <div className="logo">
                {isMenuCourses()
                    ? ""
                    : curCourse.courseName 
                }
            </div>
            
            <Layout>
                <Sider
                breakpoint="lg"
                width={200}
                >
                    <Menu 
                        theme="dark" 
                        mode="inline" 
                        // defaultSelectedKeys={['/']}
                        selectedKeys={[selectedKey]}
                        onClick={(e)=>setSelectedKey(getKey())}
                    >
                        {menuItemsList}
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                    <Content style={{ margin: '24px 16px 0' }}>
                        <Breadcrumb>
                            {listRoutes}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Switch>
                                <Route exact path={COURSE_INFO_ROUTE}>
                                {curCourse["courseObj"]? <CourseInfo/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    } 
                                </Route>
                                <Route exact path={COURSE_TESTS_ROUTE}>
                                {curCourse["courseObj"] ? <CourseTests/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    } 
                                </Route>
                                <Route exact path={COURSE_LECTIONS_ROUTE}>
                                {curCourse["courseObj"] ? <CourseLections/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    } 
                                </Route>
                                <Route exact path={TESTING_COURSES_ROUTE}>
                                    <Courses/>
                                </Route>
                                <Route exact path={TESTING_ALL_COURSES_ROUTE}>
                                    <CoursesAll/>
                                </Route>
                                <Route exact path={TESTS_TEST_ATTEMPT_ROUTE}>
                                {curCourse["courseObj"] ?                                   
                                     <CourseTest viewDetails={viewDetails} setViewDetails={setViewDetails}/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    } 
                                </Route>
                                <Route exact path={TESTS_TEST_ATTEMPTS_DETAILS_ROUTE}>
                                {curCourse["courseObj"] ? <AttemptsDetails viewDetails={viewDetails} setViewDetails={setViewDetails} isCheck={false}/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    } 
                                    
                                </Route>
                                <Route exact path={COURSE_TESTS_TEST_EDIT_ROUTE}>
                                {curCourse["courseObj"] ? <TestEdit/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    } 
                                </Route>
                                <Route exact path={COURSE_TESTS_TEST_VARIANTS_ROUTE}>
                                {curCourse["courseObj"] ? <CourseTestVariants/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    } 
                                </Route>
                                <Route exact path={TESTS_TEST_CHECK_WORKS_ROUTE}>
                                {curCourse["courseObj"] ? <CheckWorks/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    } 
                                </Route>
                                <Route exact path={COURSE_TERMS_ROUTE}>
                                {curCourse["courseObj"] ? <TermsPage/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    } 

                                </Route>
                                <Route exact path={COURSE_ONTOLOGY_ROUTE}>
                                    {curCourse["courseObj"] ? <OntologyPage/>
                                    :<Divider orientation="center">Выберите курс</Divider>
                                    }        
                                </Route>
                                <Route exact path={TESTING_ROUTE}>
                                    <Courses/>
                                </Route>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )
}

export default Testing;