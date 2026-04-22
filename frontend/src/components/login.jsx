import { useEffect, useState } from "react";

export default function Login({ setIsLoggedIn, setShowSignup }) {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    
    const handleLogin = async(e) => {
        e.preventDefault();

        if(username.trim() ==='' || password.trim() === ''){
            return
        } 
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/token/`, {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({
                username: username,
                password: password
                }),
            });

            const data =await response.json();
             
            // if response is OK store in local storage
            if (response.ok) {
                console.log(data);
                localStorage.setItem("accessToken", data.access);
                localStorage.setItem("refreshToken", data.refresh);

                // reset useState empty
                setUsername('');
                setPassword('');
                // set LoggedIn state to TRUE
                setIsLoggedIn(true);
            } else {
                console.log("login failed", data);
            }
        } catch(error) {
            console.log("Error", error);
        }
    };
    return(
        <div>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)}
                />
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                <button type="submit">Login</button>
                <p>
                    <h3>New here? Signup</h3>
                    <button type="button" onClick={()=>setShowSignup(true)}>
                        Sign up
                    </button>
                </p>
            </form>
        </div>
    );
}