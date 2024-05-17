import { FC } from "react";
import { Specie } from "../../../types/types";
import React from "react";
import { InputNumber } from "antd";
import "../styles.css";

interface SpeciesProps {
  setInputs: React.Dispatch<any>;
  inputs: any;
  trees: Specie[];
  herbs: Specie[];
  //   setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
  //   loadingPage: boolean;
}
export const Species: FC<SpeciesProps> = ({
  setInputs,
  inputs,
  trees,
  //   setLoadingPage,
  //   loadingPage,
  herbs,
}) => {
  //пытался починить подгрузку страницы, чтобы не скакала

  //   const [loadingCount, setLoadingCount] = useState(0);

  //   useEffect(() => {
  //     if (loadingCount < 20) {
  //       setLoadingCount(loadingCount + 1);
  //       setLoadingPage(true);
  //     }
  //     if (loadingCount == 20) {
  //       console.log("done");
  //       setLoadingCount(loadingCount + 1);
  //       setLoadingPage(false);
  //     }
  //   });

  const changeInput = (id: string, value: string | number | undefined) => {
    setInputs((inputs: any) => {
      return {
        ...inputs,
        [id]: value,
      };
    });
  };

  const renderList = (list: any) => {
    return list.map((item: Specie) => (
      <div key={item.id} className="addDataInput">
        <label htmlFor={item.id}>{item.name_ru}</label>
        <InputNumber
          name={item.id}
          type="number"
          min={0}
          value={inputs[item.id] || ""}
          onChange={(value) => {
            const userInput = Number(value); // immutable value
            if (Number.isInteger(userInput)) changeInput(item.id, value);
            else value = ""; //console.log(value);
          }}
        />
      </div>
    ));
  };

  return (
    <div className="addDataInputs">
      <div>
        {/* {!loadingPage &&  */}
        <h3>Деревья</h3>
        {/* } */}
        {renderList(trees)}
      </div>
      <div className="addDataRightColumn">
        {/* {!loadingPage &&  */}
        <h3>Травы</h3>
        {/* } */}
        {renderList(herbs)}
      </div>
    </div>
  );
};
