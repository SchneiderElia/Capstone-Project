import React, { use, useEffect, useState } from "react"
import LogOutBtn from "./components/logOutBtn"
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'



const Dashboard = () => {

    const[isLoadin, setIsLoadin] = useState(true)
    const[userData, setuserData] = useState(null)
    const[error, setError] = useState(null)
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    

    useEffect(() => {
        const fetchDasboard = async () => {
                setIsLoadin(true)
                setError(null)
                const token = localStorage.getItem('token')
            if(!token){
                console.log('Token not found')
                setError("Authentication Request")
                setIsLoadin(false)
                navigate('/login')
                enqueueSnackbar('Authentication Request', { variant: 'error' })
                return
            }

            const urlApi = 'http://localhost:4000/api/v1/dashboard'

          
                const response = await fetch(urlApi, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                    })
                const data = await response.json()
                console.log(data)
                if(!response.ok){
                    console.log("Dashboard Error", data.message)
                    setError(data.message)
                    setIsLoadin(false)
                    enqueueSnackbar(data.message, { variant: 'error' })
                    return
                }
                if(response.status === 401 || response.status === 403){
                    localStorage.removeItem('token')
                    console.log('Token removed successfully')
                    setError(data.message)
                    setIsLoadin(false)
                    navigate('/login')
                    enqueueSnackbar(data.message, { variant: 'error' })
                } else {
                    console.log("Dashboard Succesfully", data)
                    setuserData(data)
                    setIsLoadin(true)
                    enqueueSnackbar('Dashboard Succesfully Logged', { variant: 'success' })
                }
                return
                /////////////// capire perche si presenta questo errore //////////////////
           
        }
        fetchDasboard()
        
    }, [])

    

    
    return (
        <div>
            <h1>Dashboard</h1>
            <LogOutBtn />
        </div>
)}

export default Dashboard
