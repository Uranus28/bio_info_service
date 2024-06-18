import { Collapse, List, Button } from "antd";
import React, { FC } from "react";
import { FormOutlined } from "@ant-design/icons";
import { downloadEmployeeData } from "../utils/testing";

const { Panel } = Collapse;
interface ListLecturesInterface {
  terms: any;
  term: any;
  index: any;
}
export const ListLectures: FC<ListLecturesInterface> = ({
  terms,
  term,
  index,
}) => {
  return (
    <Collapse accordion style={{ width: "50%", marginLeft: "30px" }}>
      <Panel header="Рекомендации к прочтению:" key={index}>
        <List
          size="small"
          bordered
          itemLayout="horizontal"
          dataSource={terms.lectures[term.termObj]}
          renderItem={(lecture: any, index) => {
            return (
              <List.Item
                className="d-flex justify-content-between align-items-start"
                style={{ color: "#6287ab" }}
                key={index}
              >
                <div className="ms-2 me-auto" key={lecture.lectureObj}>
                  <FormOutlined /> {lecture.lectureName}
                </div>
                <Button
                  style={{
                    verticalAlign: "bottom",
                    lineHeight: "0.7",
                    marginLeft: "30px",
                  }}
                  onClick={() => downloadEmployeeData(lecture)}
                >
                  Скачать файл
                </Button>
              </List.Item>
            );
          }}
        />
      </Panel>
    </Collapse>
  );
};
