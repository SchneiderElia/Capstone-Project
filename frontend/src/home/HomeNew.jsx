import React, { useState, useEffect, useRef, use } from "react"
import { useNavigate } from "react-router-dom"
import LogInFormNew from "./components/LogInFormNew"
import SingInFormNew from "./components/SignInFormNew"


import "./homeNew.css"


const HomeNew = () => {

    const navigate = useNavigate()
  

    const [isActive, setIsActive] = useState(null)
    const actionAreaRef = useRef(null)

    const handleLogIn = () =>{
        setIsActive("LogIn")
    }

    const handleSingIn = () =>{
        setIsActive("SingIn")
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
          if(isActive!== null && actionAreaRef.current && !actionAreaRef.current.contains(event.target)) {
            console.log('Click outside the action area')
            setIsActive(null);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isActive]);



  return (
    
    <div className="container-fluid m-0 p-0 d-flex flex-column vh-100 main">
      <div className="col-12 d-flex flex-column  p-0 m-0 top">
        <h1>RELAX</h1>
      </div>

       {/* Area centrale con i bottoni */}

      <div className="col-12 d-flex flex-md-row align-items-center flex-column justify-content-md-center gap-3 p-3 m-0" ref={actionAreaRef}>

         {/* --- Bottone SignIn  --- */}
         {isActive !== "SingIn" && (
              <button className="btn btn-outline-danger mx-5 my-5"  onClick={handleSingIn}>
              SignIn
              </button>
         )}
        {isActive === "SingIn" && <SingInFormNew onCancel={() => setIsActive(null)}/>}

        <h3 >Your anxiety, neatly filed.</h3>

         {/* --- Bottone SignIn  --- */}
         {isActive !== "LogIn" && (
            <button className="btn btn-outline-warning mx-5 my-5" onClick={handleLogIn}>
            LogIn
          </button>
          
         )}
        {isActive === "LogIn" && <LogInFormNew onCancel={() => setIsActive(null)}/>}
      </div>

      

      <div className="col-12 d-flex flex-column  p-0 m-0 low">
        <p>and take Note</p>
      </div>
    </div>
  );
};

export default HomeNew;
