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
        minWidth: "150px",
        minHeight: "40px",
        border: "1px solid #cbcccd",
        cursor: "pointer",
        verticalAlign: "baseline",
        marginTop: "20px",
      }}
      onClick={() => handleAttempt(attempt)}
    >
      <FormOutlined
        style={{
          color:
            attempt.checked === "True" ? "rgb(24 144 255)" : "rgb(134 136 138)",
        }}
      />{" "}
      {"Попытка"} {ind + 1}
      {attempt.checked === "True" ? (
        <span>
          {" - "}
          <br />
          {" Проверено"}
        </span>
      ) : (
        <span>
          {" - "}
          <br />
          {" Не проверено"}
        </span>
      )}
    </div>
  );
};
