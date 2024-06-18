import React, { useEffect, useState } from "react";
import 'antd/dist/antd.css';
import { Collapse, Divider, List, message  } from "antd";
import {Row, Col } from "react-bootstrap"
import TestingApi from "../../../API/TestingApi";
import {Loader} from "../../UI/Loader/Loader";
import { getUserStore } from "../../../entities/LocalStore/userStore";
import { ListLectures } from "../../api/ListLectures";
const { Panel } = Collapse;

const TermsPage = () => {
    const [subAreas, setSubAreas] = useState([])
    const [terms, setTerms] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    
    const user = getUserStore();

    const fetchTermsByUser = async () => {
        setIsLoading(true)
        try {
            let response = await TestingApi.getTermsByUser(user.userObj, user.uid);
            setTerms(response.data)
            console.log(response.data)
            let response1 = await TestingApi.getSubjectAreas();
            setSubAreas(response1.data)
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
        fetchTermsByUser()
    }, [])

    const listTerms = (unknownTerms,type) => {
        return (
            <List
            size="small"
            bordered
            itemLayout="horizontal"
            style={{borderColor: type ? "green" : "red"}}
            dataSource={unknownTerms}
            renderItem={(term, index) => {
                return (
                    <>
                        <List.Item 
                        style={{color: 'rgba(0, 0, 0, 0.65)', display: 'flex', justifyContent: 'between', alignItems: 'center'}}
                        key={index}
                        >
                            <div 
                            style={{fontWeight: '700', marginLeft: '2', marginRight: 'auto'}}
                            key={term.termObj} 
                            > 
                                {term.term}
                            </div>
                            <div
                            style={{fontWeight: '700', color: type ? "green" : "red"}}
                            >
                                {term.sumCorrect} / {term.sumCount}
                            </div>
                            {type ? null : terms.lectures[term.termObj].length != 0 ? (
                                <ListLectures terms={terms} term={term} index={index} />
                            ) : null}
                        </List.Item>
                    </>
                )                    
            }}
        />
        )
    }


    const listSubjAreas = subAreas.map((subjArea, ind) => {
        const knownTerms = terms.knownTerms.filter(item => item.subjectArea === subjArea.subjectAreaObj)
        const unknownTerms = terms.unknownTerms.filter(item => item.subjectArea === subjArea.subjectAreaObj)

        let header = subjArea.subjectArea
        if (terms.sumScoresLite[subjArea.subjectAreaObj]) {
            header = subjArea.subjectArea + " " + terms.sumScoresLite[subjArea.subjectAreaObj].sumCorrect + "/" + terms.sumScoresLite[subjArea.subjectAreaObj].sumCount
        }

        return (
            <Panel header={header} key={ind}>
                <Divider orientation="left">Плохо изучены:</Divider>
                {listTerms(unknownTerms,false)}
                <Divider orientation="left">Хорошо изучены:</Divider>
                {listTerms(knownTerms,true)}
            </Panel>
        )
    })

    const View = () => {
        return (
            <>
                <Row>
                    <Col>
                        <Divider style={{color: 'rgb(24 144 255)', fontSize: '20px'}} orientation="left">Концепты:</Divider>
                        <Collapse accordion>
                            {listSubjAreas}
                        </Collapse>
                    </Col>
                </Row>
            </>
        )
    }

    const spinner = isLoading ? <Loader/> : null;
    //const errorMessage = dataError ? <ErrorMessage message={dataError} /> : null;
    const content = !(isLoading) ? <View/> : null;

    return (
        <>
            {spinner}
            {content}
        </>
    )
}

export default TermsPage;