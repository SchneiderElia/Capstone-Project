import React from "react"
import Button from 'react-bootstrap/Button'

function LogOutBtn () {

    const hendleLogOut = () => {
        localStorage.removeItem('token')
        console.log('Token removed successfully')  
        window.location.href = '/login'
    }

    return(
        <Button onClick={hendleLogOut}>Log Out</Button>
)}

export default LogOutBtn