import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login';
import Signup from './components/Signup';
import Notes from './components/notes';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("accessToken")
    ); 
    // if setShowSignup(false) => show login
    // if setShowSignup(true) => show signup
    const [showSignup, setShowSignup] = useState(false);

    useEffect(()=> {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("accessToken"));
        };
        window.addEventListener("storage", handleStorageChange);
        return()=>{
            window.removeEventListener("storage", handleStorageChange)
        };
    }, []);
    return (
        <div>
            {isLoggedIn ? (
                <Notes setIsLoggedIn={setIsLoggedIn} />
            ) : showSignup ? (
                <Signup setShowSignup={setShowSignup} setIsLoggedIn={setIsLoggedIn}/>
            ):(
                <Login setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} />
            )}
        </div>
    );

}

