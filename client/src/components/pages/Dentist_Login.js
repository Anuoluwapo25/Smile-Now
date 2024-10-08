import React, {useState} from "react";
import "./dentist_login.css"
import { useNavigate } from "react-router-dom";

const Dentist_Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{   
        e.preventDefault()
        setError("");
        
        const payload = { email, password };

        try {
            const response = await fetch(`http://127.0.0.1:8000/doctor/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json(); 
            const { token } = data;
            localStorage.setItem("token", token);
            console.log('Retrieved token:', token);

            navigate("/dentists-dashboard")            
        } catch (error) {
            setError(error.message);
            console.error("Error:", error);
        }
    };


  return (
    <div className="login-form">
        <h1>Welcome Dr!</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
        <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <p>{error}</p>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Dentist_Login;
