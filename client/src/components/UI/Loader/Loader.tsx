import React, { FC } from "react";
import cl from "./Loader.module.css";

export const Loader: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <div className={cl.loader}></div>;
    </div>
  );
};
