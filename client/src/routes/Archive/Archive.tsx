import React, { FC, useState } from "react";
import "../../App.css";
import "./style.css";
import { get2019Year } from "../../services/api";
import { Graph } from "./Graph/Graph";

export const Archive: FC = () => {
  const [data] = useState<any>(get2019Year());
  return (
    <div className="container">
      <div className="graphTitle">2019 - Деревья</div>

      {data.length > 0 && (
        <Graph
          data={data}
          Line1DataKey={"alnus"}
          Line2DataKey={"betula"}
          secondGraph={true}
        />
      )}

      <div className="graphTitle">2019 - Травы</div>

      {data.length > 0 && (
        <Graph data={data} Line1DataKey={"urtica"} Line2DataKey={"poaceae"} />
      )}
    </div>
  );
};
