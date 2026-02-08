import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    useEffect(()=>{
        const API_URL = 'http://127.0.0.1:8000/api/v1/notes/';
        fetch(API_URL)
        .then(response=> {
            if(!response.ok){
                throw new Error('Response was not OK');
            }
            return response.json();
        })
        .then(notes => {
            // console.log(notes);
            setNotes(notes);
            setLoading(false)
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        })
    }, []);
    if (loading) return <p>Loading data from backend...</p>
    if (error) return <p>Error: {error.message}</p>
    return (
    <div className='App'>
        <h2>Welcome to Note Desk</h2>
        {notes.length===0 ?(<p>No notes</p>):(
            <ul>
            {notes.map((note)=>{
                return(
                    <li key={note.id}>{note.text}</li>
                )
            })}
            </ul>
        )}
    </div>
    );
}