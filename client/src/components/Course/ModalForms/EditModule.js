import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Form, Input, message, Select } from 'antd';
import { deepEqual } from '../../utils/testing';
import { useFetching } from '../../hooks/useFetching';
import TestingApi from '../../../API/TestingApi';
import { getCurCourse, setCurCourse } from '../../../entities/LocalStore/curCourse';
import { getCurModule } from '../../../entities/LocalStore/curModule';
const { Option } = Select;

const ModuleEdit = ({isVisible, setIsVisible, onUpdate}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [subAreas, setSubAreas] = useState([])
    
    const [form] = Form.useForm();

    const curCourse = getCurCourse()
    const curModule = getCurModule()

    const [fetchSubjectAreas, isDataLoading, dataError] = useFetching(async () => {
        let response = await TestingApi.getSubjectAreas();
        setSubAreas(response.data)
    })

    const fetchEditModule = async (module) => {
        setIsLoading(true)
        try {
            let response = await TestingApi.editModule(module);
            if (response.data === "ok") {
                message.success('Модуль изменен успешно');
                let response1 = await TestingApi.getCourseInfo(curCourse.courseObj);
                setCurCourse(response1.data)
                setIsVisible(false)
                onUpdate()
            } 
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
        if (isVisible) {
            fetchSubjectAreas()
        }
    }, [isVisible])

    const handleOk = () => {
        setIsVisible(false);
    };

    const handleCancel = () => {
        setIsVisible(false);
    };

    const onFinish = values => {
        values["moduleObj"] = curModule.moduleObj
        console.log('Received values of form:', values);
        const isEqual = deepEqual(values, curModule)
        if (!isEqual) {
            fetchEditModule(values)
        }
    };

    const listAreas = subAreas.map((item) => {
        return (
            <Option key={item.subjectAreaObj} value="item">{item}</Option>
        )
    })

    if (curModule) {
        return (
            <Modal title="Редактирование модуля" visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form 
                    form={form} 
                    name="dynamic_form_nest_item" 
                    onFinish={onFinish} 
                    autoComplete="off"
                    initialValues={{
                        ["nameModule"]: curModule.nameModule,
                        ["subjectArea"]: curModule.subjectArea,
                    }}
                >
                    <Form.Item name="nameModule" label="Название модуля" rules={[{ required: true, message: 'Не заполнено название модуля' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="subjectArea" label="Предметная область" rules={[{ required: true, message: 'Не заполнено название модуля' }]}>
                        <Select placeholder="Select subject area">
                            {listAreas}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                        Сохранить изменения
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        );
    } else {
        return null;
    }
};

export default ModuleEdit;