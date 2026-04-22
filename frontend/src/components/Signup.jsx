import { useState } from "react";

export default function Signup({ setIsLoggedIn,setShowSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        // validate input
        if(username.trim() ==='' || password.trim() === ''){
            console.log("Invalid: Empty username or password");
            return;
        } 

        // send POST to /api/v1/register/
        try {
            const response = await fetch (`http://127.0.0.1:8000/api/v1/register/`, {
                method: "POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    username:username,
                    password:password
                }),
            });

            // handle response
            const data = await response.json();

            if (response.ok) {

                console.log("Signup successful", data);

                // login after signup                
                const loginResponse = await fetch (`http://127.0.0.1:8000/api/token/`,{
                    method:"POST",
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify({
                        username: username,
                        password: password
                        }),
                     })
                const loginData = await loginResponse.json();

                if (loginResponse.ok){
                    console.log("Auto login sucess:", loginData);

                    // store tokens
                    localStorage.setItem("accessToken", loginData.access);
                    localStorage.setItem("refreshToken", loginData.refresh);

                    // clear input fields
                    setUsername('');
                    setPassword('');

                    // enter App.jsx:
                    setIsLoggedIn(true);
                    setShowSignup(false);
                } else {
                    console.log("Auto login failed:", loginData);
                }       
            } else {
                console.log("Signup failed:", data);
            }
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSignup}>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
                <div>
                    Already have an account?
                    <button type="button" onClick={()=>setShowSignup(false)}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}