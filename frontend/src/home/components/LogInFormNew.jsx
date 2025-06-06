import React, { use, useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import LogInText from "./logInText"
import { Icon } from '@iconify/react'
import { Link } from "react-router-dom"
import PwRecovery from "./pwRecovery"
import GoogleLog from "./googleLog"
import { useSnackbar } from 'notistack'

const LogInFormNew = () => {
  const [isActive, setIsActive] = useState(true);

   const { enqueueSnackbar } = useSnackbar()

   const baseUrlApi = process.env.REACT_APP_API_BASE_URL;
const apiVersion = process.env.REACT_APP_API_VERSION

const apiUrl = `${baseUrlApi}/${apiVersion}`;
  
    async function handleSubmit(event) {
  
      event.preventDefault()
        const urlApi = apiUrl + '/login'
        //const identifier = document.getElementById('identifier').value
        const username = document.getElementById('identifier').value
        const password = document.getElementById('password').value
        const email =document.getElementById('identifier').value
        console.log('Data User', 'ID',username, 'PW')
        console.log(apiUrl)
      
        try{
          const response = await fetch(urlApi, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email : email,
              username : username,
              password : password
            })
          })
          const data = await response.json()
          console.log(data)
          if(!response.ok){
            console.log("Login Error", data.message)
            //alert(data.message)
            enqueueSnackbar(data.message, { variant: 'error' })
            return
          }
          console.log("Login Succesfully", data)
          if(data.token){
            localStorage.setItem('token', data.token)
            console.log('Token saved successfully')
            enqueueSnackbar('Login Succesfully', { variant: 'success' })
            window.location.href = '/dashboard'
          }else{
            console.log('Token not found')
            enqueueSnackbar('Token not found', { variant: 'error' })
          }
        }catch(error){
          console.log('Error fetch call', error)
          enqueueSnackbar('Error fetch call', { variant: 'error' })
        }
    }

  return (
    <>
      {isActive !== null && (
        <div className="formLogIn"
          style={{
            height: "20%",
            width: "20%",
            zIndex: 100,
            position: "absolute",
            top: "15%",
            right: "5%",
          }}
          onClick={(e) => e.stopPropagation()}
        >
           <div className="vh-100 d-flex flex-column align-items-center">
     <LogInText />
      <Form  style={{width: "400px"}} >
        
        <div className="d-flex align-items-center justify-content-center gap-2">
        <Icon icon="line-md:account" width="30" height="30" style={{color: "white"}}/>
        <Form.Control type="email" placeholder="Usernamen or Email" id="identifier" />
        </div>
        <br />
        <div className="d-flex align-items-center justify-content-center gap-2" >
        <Icon icon="teenyicons:password-outline" width="30" height="30"  style={{color:"white"}} />
          <Form.Control type="password" placeholder="Password" id="password" />
        </div>
        <div className="d-flex  justify-content-end" >
        <PwRecovery />
        </div>
        <br />
        <div className="d-flex  justify-content-center" >
        <Button className="login" type="submit" onClick={handleSubmit}>
          LogIn
        </Button>
        </div>
      </Form>
      
      <div className="mt-5 d-flex align-items-center justify-content-center gap-2 text-white" >
        <Icon icon="pepicons-pencil:line-x" width="20" height="20"   style={{color:"white"}} /> 
        OR
        <Icon icon="pepicons-pencil:line-x" width="20" height="20"   style={{color:"white"}} />
      </div>

      <div className="d-flex align-items-center justify-content-center gap-2" >
      <GoogleLog text='Login whit Google'/>
      </div>

      {/* <h6 className="mt-5 text-white">Don't have an account?</h6>
      <Button variant="dark" className="login">SingIn</Button> */}
     
    </div>
        </div>
      )}
    </>
  );
};

export default LogInFormNew