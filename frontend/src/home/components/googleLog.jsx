import React from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import { Icon } from '@iconify/react'



function GoogleLog ({text}) {

    const hendleGoogleLogin = () => {
        window.location.href = 'http://localhost:4000/api/v1/auth/google'
    }

    return (
        <Button onClick={hendleGoogleLogin} variant="light" className="login mt-5">
            <Icon icon="flat-color-icons:google" width="20" height="20" className="me-3" />
            {text}
        </Button>
)}

export default GoogleLog