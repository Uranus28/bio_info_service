import React, { FC } from "react";
import {
  LineChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Line,
} from "recharts";

interface GraphProps {
  data: any;
  Line1DataKey: string;
  Line2DataKey: string;
  secondGraph?: boolean;
}

export const Graph: FC<GraphProps> = ({
  data,
  Line1DataKey,
  Line2DataKey,
  secondGraph = false,
}) => {
  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dateString" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey={Line1DataKey}
        stroke="#82ca9d"
        dot={false}
      />
      <Line
        type="monotone"
        dataKey={Line2DataKey}
        stroke="rgb(57,106,177)"
        dot={false}
      />
      {secondGraph && (
        <Line
          type="monotone"
          dataKey="populus"
          stroke="rgb(218,124,48)"
          dot={false}
        />
      )}
    </LineChart>
  );
};
