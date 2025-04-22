
import React from "react"
import HelloUser from "./hello.User"
import BaseBlock from "./baseBlock"


const Board = ({ userInfo, blocks, onDeleteBlock, onUpdateTitle, }) => {
  
  return (
    <div className="p-0 ms-5 me-3" style={{ height: "90vh", width: "100%", backgroundColor:"black" }}>
      <HelloUser username={userInfo ? userInfo.username : "Ospite"} />
      <div className="p-0 m-0 gap-3 justyfy-content-center" style={{display:"flex", flexWrap:'wrap'}}>
      

        {blocks.map((blocks, index) => (
          <BaseBlock key={blocks._id} id={blocks._id} index={index} title={blocks.title} onDelete={onDeleteBlock} onTitleUpdate={onUpdateTitle}/>
        ))}
      </div>
    </div>
  );
};

export default Board;
