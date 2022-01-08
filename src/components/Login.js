import React, { useState } from 'react'
import {useHistory} from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})
    let history = useHistory();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await  response.json()
        console.log(json);
        if(json.success) {
            // Save the authToken in local storage and redirect
            localStorage.setItem("token", json.authToken);
            props.showAlert("Logged in successfully", "success");
            history.push("/");
        } else {
            props.showAlert("Invalid credentials!", "danger");
        }
    }

    const onChange = (e) => {
        // Spread operator
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
        <h5 className="mt-3">Login to continue with iNotbook</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </>
    )
}

export default Login
