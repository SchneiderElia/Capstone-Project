
import React from "react"
import HelloUser from "./hello.User"
import BaseBlock from "./baseBlock"


const Board = ({ userInfo, blocks }) => {
  
  return (
    <div className="p-0 ms-5 me-3" style={{ height: "90vh", width: "100%" }}>
      <HelloUser username={userInfo ? userInfo.username : "Ospite"} />
      <div className="p-0 m-0 gap-3 justyfy-content-center" style={{display:"flex", flexWrap:'wrap'}}>
      

        {blocks.map((block, index) => (
          <BaseBlock key={block.id} id={block.id} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Board;
