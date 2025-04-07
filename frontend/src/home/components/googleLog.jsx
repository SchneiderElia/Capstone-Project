import React from "react"
import { Link } from "react-router-dom"
import Button from "react-bootstrap/Button"
import { Icon } from '@iconify/react'



function GoogleLog () {
    return (
        <Button variant="dark" className="login mt-5">
            <Icon icon="flat-color-icons:google" width="20" height="20" className="me-3" />
            Login whit Google
        </Button>
)}

export default GoogleLog