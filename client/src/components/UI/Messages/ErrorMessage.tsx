import React, { FC } from "react";
interface ErrorMessageProps {
  message: string;
}
export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <div style={{ color: "red" }}>{message}</div>;
};
