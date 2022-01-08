import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Distructuring
        const { name, email, password } = credentials;
        // Fetch API boiler plate
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the authToken and redirect
            localStorage.setItem("token", json.authToken);
            history.push("/login");
            props.showAlert("Woow! Account created successfully.", "success");
        } else {
            props.showAlert("Invalid details!", "danger");
        }
    }

    const onChange = (e) => {
        // Spread operator
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
        <h5 className="mt-3">Create an account to use iNotbook</h5>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm password</label>
                    <input type="cpassword" className="form-control" value={credentials.cpassword} onChange={onChange} id="cpassword" name="cpassword" minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </>
    )
}

export default Signup
