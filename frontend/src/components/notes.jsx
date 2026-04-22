import { useEffect, useState } from "react";

export default function Notes({ setIsLoggedIn }) {

    // future note: better to store current auth state
    const token = localStorage.getItem("accessToken");
   
    // Hooks
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [text, setText] = useState('');
    const [editingID, setEditingID] = useState(null)
    // Effects
    useEffect(()=>{
        fetchNotes()
    }, []);

    // Handlers
    function fetchNotes() {
        setLoading(true);
        if (!token) {
            setIsLoggedIn(false);
            return;
        }
        const API_URL = 'http://127.0.0.1:8000/api/v1/notes/';
        console.log("TOKEN",token);
        fetch(API_URL, {
            headers:{"Authorization":`Bearer ${token}`}
        })
        .then(response=> {
            if (response.status === 401){
                localStorage.removeItem("accessToken");
                setIsLoggedIn(false);
                return;
            }
            if(!response.ok){
                throw new Error('Response was not OK!');
            }
            return response.json();
        })
        .then(notes => {
            console.log(notes);
            setNotes(notes);
            setLoading(false)
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })
    }

    const handleAddNote = async() =>{
        if(text.trim() === ''){
            return
        } else {
            let response
        if(editingID){
            response = await fetch(`http://127.0.0.1:8000/api/v1/notes/${editingID}/update/`, 
                {method:'PATCH',
                 headers: {
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                    },
                 body: JSON.stringify({text: text})})
        } else {
            response = await fetch(`http://127.0.0.1:8000/api/v1/notes/`, {
            method:'POST',
            headers: {
                "Content-Type":"application/json","Authorization": `Bearer ${token}`
                },
            body: JSON.stringify({text: text})})
        }
        const data = await response.json();
        console.log(data);
        if (response.ok){
            fetchNotes()
            setText('')
            setEditingID(null)
        } else {
            setError(new Error('Adding note unsuccessful'))
        }
        }
    };

    const handleEditNote = async(id) => {
        const selectedNote = notes.find(note => note.id === id)
        if (!selectedNote) {
            setError(new Error('Note not found'));
            return;
        }
        console.log(selectedNote)
        setText(selectedNote.text)
        setEditingID(selectedNote.id)
    };

    const handleDeleteNote = async(id) => {
        let response = await fetch(`http://127.0.0.1:8000/api/v1/notes/${id}/delete/`, {
            method:'DELETE',
            headers: {"Authorization": `Bearer ${token}`}
        })
        if (response.ok){
        fetchNotes();}
        else {
            setError(new Error ("Delete failed"));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
    };

    // Render
    if (loading) 
            return <p>Loading data from backend...</p>
        if (error) 
            return <p>Error: {error.message}</p>
    return (
    <div className='App'>
        <h2 className='header'>Welcome to Note Desk</h2>
        <button onClick={handleLogout}>logout</button>
        {notes.length===0 ?(
            // If no notes:
            <p>No notes</p>
        ):( // else:
            <ul>
            {notes.map((note)=>{
                return(
                    <li className='note' key={note.id}>{note.text} 
                    <span className='btns'>
                        <button className="deleteBtn" type='button' onClick={()=> handleDeleteNote(note.id)}>Delete</button>
                        <button className="editBtn" type='button' onClick={()=>handleEditNote(note.id)}>
                            Edit
                        </button>
                    </span>
                    </li>
                )
            })}
            </ul>
        )}
        <input className='inputBox' type='text' 
        id='inputText'
        value={text}
        onChange={(e)=>setText(e.target.value)}/>
        <button className='addBtn' type='button' onClick={handleAddNote}>Add</button> 

    </div>
    );
}