import { Avatar } from "antd";
import React, { FC } from "react";
interface AvatarInfoProps {
  firstL: string;
}
export const AvatarInfo: FC<AvatarInfoProps> = ({ firstL }) => {
  return (
    <Avatar style={{ backgroundColor: "coral", marginRight: "15px" }}>
      {firstL}
    </Avatar>
  );
};
