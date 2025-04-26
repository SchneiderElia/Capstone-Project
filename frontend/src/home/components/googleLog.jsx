import React from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import { Icon } from '@iconify/react'



function GoogleLog ({text}) {
    const baseUrlApi = process.env.REACT_APP_API_BASE_URL;
    const apiVersion = process.env.REACT_APP_API_VERSION
    
    const apiUrl = `${baseUrlApi}/${apiVersion}`;

    const hendleGoogleLogin = () => {
        window.location.href = apiUrl + '/auth/google/callback'
    }

    return (
        <Button onClick={hendleGoogleLogin} variant="light" className="login mt-5">
            <Icon icon="flat-color-icons:google" width="20" height="20" className="me-3" />
            {text}
        </Button>
)}

export default GoogleLog