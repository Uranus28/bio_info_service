import React, { useEffect, useState } from 'react';
import { Loader } from '../../UI/Loader/Loader';
import { Modal, Button,Divider,List} from 'antd';
import { ListLectures } from '../../api/ListLectures';
import { TESTS_TEST_ATTEMPT_ROUTE } from '../../../utils/consts';
import history from "../../../services/history";
export const CheckRecomendations=({pathTerms,isTermsFormVisible,setIsTermsFormVisible})=>{
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        if(isTermsFormVisible){
        setIsLoading(true)
        setIsLoading(false)
        }

    },[])
    const handleCancel = () => {
        setIsTermsFormVisible(false);
    };
    const handleStartTest = () => {
        history.push(TESTS_TEST_ATTEMPT_ROUTE);
    }
    const listTerms = (unknownTerms,type) => {
        // console.log(unknownTerms)
        console.log(pathTerms)
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
                            {pathTerms.lectures[term.termObj]?(<Button
                             style={{
                                verticalAlign: "bottom",
                                lineHeight: "0.7",
                            }}
                            onClick={() => handleStartTest()}>
                                Перейти к тесту
                            </Button>):null}
                            {type ? null : pathTerms.lectures[term.termObj].length != 0 ? (
                                <ListLectures terms={pathTerms} term={term} index={index} />
                            ) : null}
                        </List.Item>
                    </>
                )                    
            }}
        />
        )
    }

    if (isLoading) {
        return <Loader/>
    } else {
    return(
    <Modal 
    width={"800px"}
        title="Рекомендации" 
        visible={isTermsFormVisible}
        onCancel={handleCancel}
        footer={[
            <Button key="back" onClick={handleCancel}>
              Назад
            </Button>
          ]}>
            <Divider/>
            {listTerms(pathTerms.pathTerms,false)}
        </Modal>
        )
    }
}