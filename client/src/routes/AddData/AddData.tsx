import React, { useState, useContext, FC } from "react";
import { DatePicker, Button, message } from "antd";
import moment from "moment";
import { db } from "../../services/firebase";
import "./styles.css";
import "../../App.css";
import { SpeciesContext } from "../../services/speciesContext";
import { Species } from "./Species/Species";
import { getMonitoringDataByDay } from "../../services/api";
import { filterData } from "../../API/filtering";

interface AddDataProps {}

export const AddData: FC<AddDataProps> = () => {
  const [species] = useContext(SpeciesContext);
  const [inputs, setInputs] = useState<any>({});
  const [prevData, setPrevData] = useState<any>({});
  const [date, setDate] = useState({
    day: 0,
    year: 0,
    month: 0,
    dateString: "",
  });

  const selectDate = (value: any, dateString: string) => {
    const year = moment(dateString).get("year");
    const month = moment(dateString).get("month") + 1;
    const day = moment(dateString).get("date");
    setDate({
      day,
      month,
      year,
      dateString,
    });

    if (dateString != "") {
      getMonitoringDataByDay(dateString).then((value: any) => {
        setPrevData(value);
      });
    }
  };

  const sendData = () => {
    let dataToSend = {};

    species.map((item: any) => {
      dataToSend = {
        ...dataToSend,
        [item.id]:
          parseInt(inputs[item.id]) + prevData[item.id] ||
          0 + prevData[item.id],
      };
    });
    db.collection("monitoring")
      .doc(`${date.dateString}`)
      .set({
        ...dataToSend,
        timestamp: new Date(date.dateString).getTime(),
        dateString: date.dateString,
        year: date.year,
        month: date.month,
        day: date.day,
      })
      .then(function () {
        message.success("Документ успешно добавлен");
      })
      .catch(function () {
        message.error("Ошибка при добавлении документа");
      });
  };
  return (
    <div className="container">
      <div>
        <DatePicker onChange={selectDate} />
        <div className="speciesWrapper">
          <Species
            setInputs={setInputs}
            inputs={inputs}
            trees={React.useMemo(() => filterData(species, "tree"), [species])}
            herbs={React.useMemo(() => filterData(species, "herb"), [species])}
          />
        </div>
        <Button
          style={
            date.dateString === ""
              ? { pointerEvents: "none", opacity: "0.4" }
              : {}
          }
          type="primary"
          onClick={sendData}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};
