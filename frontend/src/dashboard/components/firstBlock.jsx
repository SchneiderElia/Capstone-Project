import React from "react"

const FristBlock =  ({ onAddBlock }) => {

    return(

        <div className="d-felx p-3 mt-5 align-items-center justify-content-center" 
        style={{width: "20%", height: "20%", border: "1px solid white", borderRadius: "9px", display: "flex"}}
        onClick={onAddBlock}>
        <p id="newBlock" className="text-white">Click to add Block</p>
</div>

)}

export default FristBlock

