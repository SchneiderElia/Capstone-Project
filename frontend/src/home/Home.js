import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react';

import LogInText from './components/logInText'
import LogInForm from './components/logInForm'

import SingInText from './components/singInText'
import SingInForm from './components/singInForm'



const Home = () => {

    const navigate = useNavigate()
    
    // const logInText = <LogInText />
    const logInForm = <LogInForm />
    // const singInText = <SingInText />
    const singInForm = <SingInForm />


    const [showForm, setShowForm] = useState(null)
    const [showText, setShowText] = useState(null)
    const [hideBtn, setHideBtn] = useState(false)
    const [svg, setSvg] = useState(null)
    

    const handelLogIn = () => {
        // setShowText('showText-LogIn')
        setShowForm('showForm-LogIn')
        setHideBtn(true)
        navigate('/login')

    }

    const hadelSingIn = () => {
        // setShowText('showText-SingIn')
        setShowForm('showForm-SingIn')
        setHideBtn(true)
        navigate('/signin')

    }

    const handleSvg = () => {
        window.location.href = "/"
        navigate('/')
    }




    return (
        <main className="containerfluid">
            <div className="row p-0 m-0 vh-100">

                {/* Left section */}
                <div className="col-6 bg-primary d-flex flex-column align-items-center justify-content-center">
                <Icon onClick={handleSvg} icon="simple-icons:googlehome" width="52" height="52"  style={{color: "white"}} />
                    <h1 className='text-white'>The Basic Home Note App</h1>
                    <p className='text-white'>building in prgress</p>
                </div>

                {/* Right section */}
                <div className="col-6 bg-black d-flex flex-column align-items-center justify-content-center">
                    {/* 
                    <div className='d-flex align-items-center justify-content-center'>
                        {showText === 'showText-LogIn' && logInText}
                        {showText === 'showText-SingIn' && singInText}
                    </div> */}
                    <h2 className={`text-white mb-4 ${hideBtn ? 'd-none' : ''}`}>Hello User</h2>
                    <div className={`d-flex align-items-center justify-content-center ${hideBtn ? 'd-none' : ''}`}>
                        {/* LogIn BTN */}
                        <Button className='login mx-1' onClick={handelLogIn} >
                            LogIn
                        </Button>

                        {/* SingIn BTN */}
                        <Button className='singin mx-1' onClick={hadelSingIn}>
                            SignIn
                        </Button>
                    </div>
                    {/* Form Box */}
                    <div className='d-flex align-items-center justify-content-center'>

                        {showForm === 'showForm-LogIn' && logInForm}
                        {showForm === 'showForm-SingIn' && singInForm}

                    </div>

                </div>

            </div>
        </main>
    )
}


export default Home;
