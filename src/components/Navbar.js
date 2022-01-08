import React from 'react'
import { useHistory } from 'react-router-dom';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    let history = useHistory();

    let location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        history.push("/login");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        <Link type="button" to="/login" role="button" className="mx-1 btn btn-outline-light">Login</Link>
                        <Link type="button" to="/signup" role="button" className="mx-1 btn btn-outline-light">Signup</Link>
                    </form> : <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
