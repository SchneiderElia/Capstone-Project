import React from "react"



const SideBar = ({ children }) => {
    return (
        <div className="container d-flex flex-column  align-items-center justify-content-between bg-primary m-0 p-0 ms-3"
            style={{"height": "95vh", borderRadius: "100px", width: "60px"}}>
                {children}
        </div>
)}

export default SideBar