import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import SideBar from "../global.components/sideBar";
import ProfileImg from "../global.components/components/profile.Img";
import LogOutBtn from "../global.components/components/logOutBtn";
import TakeNoteArea from "./components/takeNoteArea";
import NoteTitle from "./components/NoteTitle";
import SideBarAllNoteView from "./components/sideBarAllNoteView"
import { enqueueSnackbar } from "notistack"
import EditableTitle from  "../dashboard/components/editableTitle";
import Button from "react-bootstrap/esm/Button";


const DashboardBlock = () => {
  const { id:blockId } = useParams();

  const[containerInfo, setContainerInfo] = useState(null)
  const[notes, setNotes] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [newNoteTitle, setNewNoteTitle] = useState('');         
    const [newNoteContent, setNewNoteContent] = useState('');   
    const [isSavingNote, setIsSavingNote] = useState(false);

    const [editingNoteId, setEditingNoteId] = useState(null); // null = Nuova, ID = Esistente
    const [editingNoteTitle, setEditingNoteTitle] = useState('');
    const [editingNoteContent, setEditingNoteContent] = useState('')

/*     const handleCreateNewNote = async () => {

      const token = localStorage.getItem("token")
      if (!token) {
        console.log("Token not found")
        throw new Error("Authentication Request")
      }

      if(!newNoteContent || !newNoteContent.trim() === ""){
        enqueueSnackbar("The content is empty", { variant: "error" }) 
        return
      }
      setIsSavingNote(true)

      const NoteData = {
        title: newNoteTitle.trim() || "No Title", 
        textContent: newNoteContent || "empty note"
      }
      console.log(`Attempt to create newNote in container ${blockId} whit data:`, NoteData)

      try{
        const urlApi = `http://localhost:4000/api/v1/blocks/${blockId}/notes`
        const response = await fetch(urlApi, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(NoteData)
        })
        if(response.ok){
          const data = await response.json()
          setNotes(prevNotes => [...prevNotes, data])
          setNewNoteTitle('')
          setNewNoteContent('')
          enqueueSnackbar("New Note Created", { variant: "success" })
      }
      

    }catch(error){
      console.log("Error newNote Creation:", error)

      setError(error.message || "Error newNote Creation")
      enqueueSnackbar(error.message, { variant: "error" })
    }finally{
      setIsSavingNote(false)
      }
    }
 */

    const handleSaveCreateNewNote = async () => {

      const token = localStorage.getItem("token")
      if (!token) {
        console.log("Token not found")
        throw new Error("Authentication Request")
      }

    /*   if(!newNoteContent || newNoteContent.trim() === " "){
        enqueueSnackbar("The content is empty", { variant: "error" }) 
        return
      } */
      setIsSavingNote(true)
        const dataNote ={
          title : editingNoteTitle.trim() || "No Title", 
          textContent: editingNoteContent || "empty note"
        }

        let urlApi
        let method
        if(editingNoteId){
          urlApi = `http://localhost:4000/api/v1/notes/${editingNoteId}`
          method = "PUT"
          console.log(`Attempt to save newNote ${editingNoteId} whit data:`, dataNote)
        }else{
          urlApi = `http://localhost:4000/api/v1/blocks/${blockId}/notes`
          method = "POST"
          console.log(`Attempt to create newNote in container ID: ${blockId} whit data:`, dataNote)
        }


      try{
        const response = await fetch(urlApi, {
          method: method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataNote) // forse N maiuscola 
        })

        const saveOrUpdateNote = await response.json()
     
          
        if(editingNoteId){
          setNotes(prevNotes => prevNotes.map(note => note._id === editingNoteId ? saveOrUpdateNote : note))
          enqueueSnackbar("Note Updated", { variant: "success" })
        }else{
          setNotes(prevNotes => [...prevNotes, saveOrUpdateNote])
          enqueueSnackbar("New Note Created", { variant: "success" })

        }
        handlerStartNewNote()

    }catch(error){
      console.log("Error newNote Creation:", error)

      setError(error.message || "Error newNote Creation")
      enqueueSnackbar(error.message, { variant: "error" })
    }finally{
      setIsSavingNote(false)
      }
    }

    const selectNoteToEdit = (noteToEdit) => {
      //const selectedNote = notes.find(note => note._id === noteId)
      if(!noteToEdit) return
      console.log('Notes selected to edit', noteToEdit)

        setEditingNoteId(noteToEdit._id)
        setEditingNoteTitle(noteToEdit.title || "No Title")
        setEditingNoteContent(noteToEdit.textContent || "empty note")
      
    }


    const handlerStartNewNote = () => {
      console.log("Start new note...")
      setEditingNoteId(null)
      setEditingNoteTitle('')
      setEditingNoteContent('')
    }

    const handleDeleteNote = async (noteIdToDelete) => {

      if(!noteIdToDelete){
        console.error('handleDeleNote call but ID not valid')
      }

      console.log(`Attempt to delete note ID: ${noteIdToDelete}`)

      if(!window.confirm("Are you sure you want to delete this note?")){
        return
      }
    

      const token = localStorage.getItem("token")
      if (!token) {
        console.log("Token not found")
        throw new Error("Authentication Request")
      }
      setIsLoading(true)
      setError(null)
   
      try{

        const noteUrlDelete = `http://localhost:4000/api/v1/notes/${noteIdToDelete}`
        const noteDeleteResponse = await fetch(noteUrlDelete, {
          method: "DELETE",
          headers : {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"

          },
        })
        console.log('Delete response:', noteDeleteResponse.status)
        if(noteDeleteResponse.ok){
          setNotes(prevNotes => prevNotes.filter(note => note._id !== noteIdToDelete))
          console.log(`Note ${noteIdToDelete} deleted successfully`)
          enqueueSnackbar(`Note ${noteIdToDelete} deleted successfully`, { variant: "success"})
        }
      }catch(error){
        console.log("Error during note Deletion:", error)

        setError(error.message || "Error during note Deletion")
        enqueueSnackbar(error.message || "Error during note Deletion", { variant: "error" })
      }finally{
        setIsLoading(false)
      } 
    }

      



useEffect(()=>{
  const fetchContainerInfo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.log("Token not found")
        throw new Error("Authentication Request")
      }
      const urlApi = `http://localhost:4000/api/v1/blocks/${blockId}`

      const response = await fetch(urlApi, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        },
        console.log("start fetch")
      )

      if(response.ok){
      const data = await response.json()
      console.log("JSON data received:", data)
      setContainerInfo(data)
      enqueueSnackbar("Data Block received", { variant: "success" })
    }

      const notesUrl = `http://localhost:4000/api/v1/blocks/${blockId}/notes`
    const notesResponse = await fetch(notesUrl, {
      method: "GET",
      headers : {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    },console.log("start fetch"))
    if(notesResponse.ok){
      const notesData = await notesResponse.json()
      setNotes(notesData)
      console.log('Data Notes received:', notesData)
      enqueueSnackbar("Data Notes received", { variant: "success" })
      setIsLoading(false) 
      }

      

    } catch (error) {
      console.log("Somethings wrong:", error)
      enqueueSnackbar(error.message, { variant: "error" })
      setError(error.message)
      setIsLoading(false)
    }

    
  

  }
  fetchContainerInfo()


},[blockId])

const handleSaveTitle = async (newTitle) => {
  setContainerInfo(prevInfo => prevInfo ? { ...prevInfo, title: newTitle } : null);
  
}


  return (
    <main className="px-2 py-4 d-flex vh-100 align-items-center"
      style={{backgroundColor:"black"}}>
      <SideBar>
        <ProfileImg />
        <LogOutBtn />
      </SideBar>
      <div className="px-2 py-4 d-flex flex-column vh-100 bg-dark">
        <EditableTitle  initialTitle={containerInfo?.title} onSaveTitle={handleSaveTitle}/>
       
       <h5>Create new Note</h5>
       <input type="text" placeholder="Title" value={editingNoteTitle} onChange={(e) => setEditingNoteTitle(e.target.value)} key={`title-${editingNoteId || 'new'}`}  />
       
        <TakeNoteArea key={editingNoteId || 'new-note-editor'} initialValue={editingNoteContent} onTextChange={setEditingNoteContent}/>
        <Button onClick={handleSaveCreateNewNote}>
        {isSavingNote ? 'Salvataggio...' : (editingNoteId ? 'Aggiorna Nota' : 'Salva Nuova Nota')}
          </Button>
      </div>
      <SideBarAllNoteView note={notes} onDeleteNote={handleDeleteNote} onSelectNote={selectNoteToEdit}/>
    </main>
  );
};

export default DashboardBlock;
