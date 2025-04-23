import React from "react"



const SideBar = ({ children }) => {
    return (
        <div className="container d-flex flex-column  align-items-center justify-content-between  m-0 p-0 ms-3"
            style={{"height": "67vh", borderRadius: "100px", width: "60px", backgroundColor: "rgb(4, 62, 149)"}}>
                {children}
        </div>
)}

export default SideBar