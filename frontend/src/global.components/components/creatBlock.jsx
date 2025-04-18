import React from "react";
import { Icon } from '@iconify/react'

const CreatBlock = ({ handleAddBlock }) => {
  return (
    <Icon
    onClick={handleAddBlock}
      icon="lets-icons:add-ring-light"
      width="33"
      height="33"
      style={{ color: "white", cursor: "pointer" }}
    />
  );
};

export default CreatBlock;
