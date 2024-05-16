import React, { useState, useContext, FC } from "react";
import "../../App.css";
import "./styles.css";
import { DatePicker } from "antd";
import { Typography } from "antd";
import {
  getMonitoringDataByDay,
  getDataBetweenTwoDates,
} from "../../services/api";
import { SpeciesContext } from "../../services/speciesContext";
import isEmpty from "../../services/isEmpty";
import moment from "moment";
import { RenderTwoDatesData } from "./RenderTwoDatesData/RenderTwoDatesData";
import { RenderSpecies } from "./RenderSpecies/RenderSpecies";

const { Title } = Typography;

export const ViewData: FC = () => {
  const [species] = useContext(SpeciesContext);
  const [data, setData] = useState<any>({});
  const [firstDate, setFirstDate] = useState<any>(null);
  const [secondDate, setSecondDate] = useState<any>(null);
  const [twoDatesData, setTwoDatesData] = useState<any>([]);

  const selectDate = async (value: any, dateString: string) => {
    if (dateString != null && dateString != "")
      setData(await getMonitoringDataByDay(dateString));
  };

  const selectFirstDate = async (value: any) => {
    if (value) {
      setFirstDate(moment(value).valueOf());
      if (secondDate) {
        const first = moment(value).valueOf();
        const result = await getDataBetweenTwoDates(first, secondDate);
        setTwoDatesData(result);
      }
    }
  };

  const selectSecondDate = async (value: any) => {
    if (value) {
      setSecondDate(moment(value).valueOf());
      if (firstDate) {
        const second = moment(value).valueOf();
        const result = await getDataBetweenTwoDates(firstDate, second);
        setTwoDatesData(result);
      }
    }
  };

  const renderContent = () => {
    if (data === undefined) {
      return <div className="informationText">Нет данных на эту дату</div>;
    } else {
      if (!isEmpty(data)) {
        return <RenderSpecies species={species} data={data} />;
      } else {
        return null;
      }
    }
  };

  const renderTwoDatesContent = () => {
    if (twoDatesData.length == 0 && secondDate && firstDate) {
      return (
        <div className="informationText">Нет данных на этот промежуток</div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="container">
      <div>
        <Title>Показать данные за один день</Title>
        <DatePicker onChange={selectDate} className="viewImageDayPicker" />
        {renderContent()}
        {data && !isEmpty(data) && (
          <img
            src={require("../../images/levels.png")}
            className="levelsImage"
          />
        )}
        <Title>Показать данные за временной промежуток</Title>
        <DatePicker onChange={selectFirstDate} className="viewImageDayPicker" />
        <DatePicker
          onChange={selectSecondDate}
          className="viewImageDayPicker"
        />
        {renderTwoDatesContent()}
        {twoDatesData.length > 0 && (
          <RenderTwoDatesData twoDatesData={twoDatesData} />
        )}
      </div>
    </div>
  );
};
