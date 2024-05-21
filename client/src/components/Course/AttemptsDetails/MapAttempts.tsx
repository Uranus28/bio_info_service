import React, { FC } from "react";
import { FormOutlined } from "@ant-design/icons";

interface MapAttemptsProps {
  ind: number;
  handleAttempt: (attempt: any) => void;
  attempt: any;
}
export const MapAttempts: FC<MapAttemptsProps> = ({
  ind,
  handleAttempt,
  attempt,
}) => {
  return (
    <div
      key={ind}
      style={{
        cursor: "pointer",
        verticalAlign: "baseline",
        marginTop: "20px",
      }}
      onClick={() => handleAttempt(attempt)}
    >
      <FormOutlined /> Попытка {ind + 1}
      {attempt.checked === "True" ? (
        <span> - Проверено</span>
      ) : (
        <span> - Не проверено</span>
      )}
    </div>
  );
};
