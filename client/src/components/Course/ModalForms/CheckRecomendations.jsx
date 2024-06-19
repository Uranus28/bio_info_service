import React, { useEffect, useState } from 'react';
import { Loader } from '../../UI/Loader/Loader';
import { Modal, Button,Divider,List} from 'antd';
import { ListLectures } from '../../api/ListLectures';

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
    const listTerms = (unknownTerms,type) => {
        // console.log(unknownTerms)
        // console.log(pathTerms)
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