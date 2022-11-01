import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import '../../index.css';

function Navbar() {

    const [login, setLogin] = useState(true);
    const {getUserData, getUserLoading, getUserErr} = useSelector(state => state.userReducer);

    const logoutHandle = () => {
        console.log('Di klik');
        localStorage.removeItem('token');
        setLogin(false);
    }

    useEffect(() => {
        try {
            document.getElementById('logout').addEventListener('click', () => {
                logoutHandle();
            });
        } catch (error) {
            console.log(error);
        }
    })

    return (
        login ? (
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href={'/'}>Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href={'/'}>Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={'/blog'}> Blog</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href={'/contact'}>Contact</a>
                            </li>
                        </ul>
                        <div className="d-flex" role="search">
                            <ul>
                                <li className="nav-item dropdown" style={{ listStyle: 'none' }}>
                                    <a className="nav-link dropdown-toggle" href={'/'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {getUserData ? getUserData.email : 'My Account'}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">{getUserData ? getUserData.username : 'Username'}</li>
                                        {
                                            console.log(getUserData, getUserLoading, getUserErr)
                                        }
                                        <li><button id='logout' className="dropdown-item">Logout</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        ) : (<Navigate to={'/login'} />)

    );
}

export default Navbar