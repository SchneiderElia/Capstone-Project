import React, { useState, useEffect } from "react"
import { enqueueSnackbar } from "notistack"

import SideBar from "../global.components/sideBar"
import Board from "./components/board"
import LogOutBtn from "../global.components/components/logOutBtn"
import ProfileImg from "../global.components/components/profile.Img"
import CreatBlock from "../global.components/components/creatBlock"


const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [blocks, setBlocks] = useState([]);
  const [nextId, setNextId] = useState(1);

  const maxBlocks = 4;

  const handleAddBlock = async () => {
    console.log("Attempting to add block via API...", nextId)

    if (blocks.length >= 4) {
      console.log("Max Blocks Limit Reached =", maxBlocks);
      enqueueSnackbar("Max Blocks Limit Reached", { variant: "error" })
      return;
    }
    const token = localStorage.getItem("token")
    if (!token) {
        enqueueSnackbar("Autentication Request", { variant: "error" })
        console.log("Token not found")
        return
    }
    setIsLoading(true);
    setError(null);

    try{
        const urlApi = "http://localhost:4000/api/v1/blocks"
        const response = await fetch(urlApi, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title: `Nuovo Contenitore ${blocks.length + 1}` })
        });
        if (!response.ok) {
            //throw new Error("Server Error:", response.status);
            console.log("fetch error:", response.status);
            enqueueSnackbar("Server Error:", { variant: "error" });
            return
        }
            

            const createBlock = await response.json()
            console.log("New Block Created:", createBlock)
            enqueueSnackbar("New Block Created", { variant: "success" })
            setBlocks((currentBlocks) => [...currentBlocks, createBlock])
            enqueueSnackbar("New Block Added", { variant: "success" })
            setNextId((prevId) => prevId + 1)
            setIsLoading(false)
    } catch (error) {
        console.log("Errror during buiilding block:", error)
        enqueueSnackbar(error.message, { variant: "error"})
        setError(error.message)
        setIsLoading(false)
    } 
    }

    
    const handleDeleteBlock = async (blockIdToDelete) => {
      console.log("Attempting to delete block via API...")

      if (!blockIdToDelete){
        console.log('handleDeleteBlock: No Id Found')
        return
      }
      console.log(`Attempting to delete block via API: ID = ${blockIdToDelete}`)

      if (!window.confirm(`You sure to delete block ${blockIdToDelete}? All data will be lost`)) {
        return;
   }

      const token = localStorage.getItem("token")
      if (!token) {
          enqueueSnackbar("Autentication Request", { variant: "error" })
          console.log("Token not found")
          return
      }
      setIsLoading(true);
      setError(null);

      try{
          const urlApi = `http://localhost:4000/api/v1/blocks/${blockIdToDelete}`
          const response = await fetch(urlApi, {
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
              }
              
           })
           console.log('Start deleting block')
           if(response.ok){
            console.log( `Block ${blockIdToDelete}  deleted successfully}`)
            setBlocks(blocks.filter((block) => block._id !== blockIdToDelete))
            enqueueSnackbar(`Block${blockIdToDelete}  deleted successfully`, { variant: "success" })
           }
          }catch (error) {
              console.log("Errror during deleting block:", error)
              enqueueSnackbar('Error during deleating Block', error, { variant: "error" })
              setError(error.message)
              setIsLoading(false)
          }
    }

      const handleChangeTitle = async (blockIdUpdate, newTitle) => {
        console.log('handleChangeTitle start')

        if(!blockIdUpdate){
          console.log('handleChangeTitle: No Id Found')
          return
        }
        if(!newTitle){
          console.log('handleChangeTitle: No Title Found')
          enqueueSnackbar('No Title Found or Empty', { variant: "warning" })
          return
        }

        
        const token = localStorage.getItem("token")
        if (!token) {
            enqueueSnackbar("Autentication Request", { variant: "error" })
            console.log("Token not found")
            return
        }
        setIsLoading(true);
        setError(null);

        const previousBlocks = [...blocks]

        try{
          const urlApi = `http://localhost:4000/api/v1/blocks/${blockIdUpdate}`
          const response = await fetch(urlApi, {
              method: "PUT",
              headers :{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({ title: newTitle })
            })
            console.log('Start rewriting title')
            if(response.ok){
              const updatedBlockFromServer = await response.json();
            console.log('Title rewritten successfully. Server response:', updatedBlockFromServer)
           
            setBlocks(blocks.map((block) => {
              if (block._id === blockIdUpdate) {
                return { ...block, title: newTitle };
              }
              return block;
            }))
            enqueueSnackbar('Title rewritten successfully', { variant: "success" })
            setIsLoading(false)


            }
        }catch (error) {
            console.error("Error rewriting new title:", error)
            enqueueSnackbar('Error rewriting new title', error, { variant: "error" })
            setError(error.message)
            setBlocks(previousBlocks)
            setIsLoading(false)
        }
            
    
    }

  

/*     const newBlock = {
      id: nextId,
    };
    setBlocks((currentBlocks) => [...currentBlocks, newBlock]);
    setNextId((prevId) => prevId + 1);
  }; */

  useEffect(() => {
    const fetchDashboard = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.log("Token not found")
          throw new Error("Authentication Request")
        }
        const urlApi = "http://localhost:4000/api/v1/dashboard"

        const response = await fetch(
          urlApi,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          },
          console.log("start fetch")
        )

        if (!response.ok) {
          throw (
            (new Error("Server Error:", response.status),
            console.log("fetch error:", response.status))
          )
        }

        const data = await response.json()
        console.log("JSON full received:", data)
        console.log("User data hello:", data.userInfo)
        setUserInfo(data.userInfo)
        enqueueSnackbar("Dashboard Succesfully Logged", { variant: "success" })
        console.log("User data Block:", data.blocks)
        setBlocks(data.blocks)
        enqueueSnackbar("Data Block received", { variant: "success" })
        setIsLoading(false)
      } catch (error) {
        console.log("Somethings wrong:", error)
        enqueueSnackbar(error.message, { variant: "error" })
        setError(error.message)
        setIsLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  return (
    <main className="px-2 py-4 d-flex vh-100 align-items-center"
    style={{backgroundColor:"black"}}>
      <SideBar>
        <ProfileImg />
        <CreatBlock handleAddBlock={handleAddBlock} />
        <LogOutBtn />
      </SideBar>
      <Board userInfo={userInfo} blocks={blocks} onDeleteBlock={handleDeleteBlock} onUpdateTitle={handleChangeTitle} />
    </main>
  );
}
export default Dashboard;
