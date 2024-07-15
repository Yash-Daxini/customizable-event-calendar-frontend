import React from 'react'
import { useAuth } from '../../hooks/AuthProvider'
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {

    const auth = useAuth();

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <Link className="navbar-brand" to="/">Calendar</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/getEvents">See Events</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='d-flex'>
                        <button className={`btn btn-outline-danger`} onClick={() => auth.logOut()}>Logout</button>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout