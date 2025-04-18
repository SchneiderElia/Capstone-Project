import React from "react"
import Button from 'react-bootstrap/Button'
import { Icon } from '@iconify/react'



function LogOutBtn () {

    const hendleLogOut = () => {
        localStorage.removeItem('token')
        console.log('Token removed successfully')  
        window.location.href = '/login'
    }

    return(
            <Icon onClick={hendleLogOut} icon="ri:logout-circle-line" width="28" height="28"
            style={{color:"white", marginBottom:"13px", cursor:"pointer"}} />    
)}

export default LogOutBtn