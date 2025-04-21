
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const AuthCallback = () =>{

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const jwtToken = queryParams.get('token')

        if(jwtToken){
            console.log('Token received from URL')
            localStorage.setItem('token', jwtToken)
            console.log('Token saved to localStorage')
            navigate('/dashboard', {replace: true})
        }else{
            navigate('/login?error=token_missing', { replace: true })
            console.log('Token not found in URL')
        }

    }, [location, navigate])

    return(
        <div>Autenticazione in corso...</div>
    )
}

export default AuthCallback