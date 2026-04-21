import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login';
import Notes from './components/notes';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("accessToken")
    );
    return (
        <div>
            {isLoggedIn ? (
                <Notes setIsLoggedIn={setIsLoggedIn} />
            ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
            )}
        </div>
    );

}

