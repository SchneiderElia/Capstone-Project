import React from "react"
import { Icon } from "@iconify/react"
import { useNavigate } from "react-router-dom"

const BackBtn = () => {

    const navigate = useNavigate()

    const handelGoBack = () => {
        navigate("/dashboard")
    }
    return(
        <Icon icon="lets-icons:refund-back" width="33" height="33"  style={{color:"white", cursor:"pointer"}} onClick={handelGoBack} />
    )
}

export default BackBtn
