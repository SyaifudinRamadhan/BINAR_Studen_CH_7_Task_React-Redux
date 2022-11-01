import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../../index.css';
import Navbar from '../Layouts/standart';

function Contact ({user}) {
    return (
        <div>
            <Navbar user={user}></Navbar>
            <div>
                <h1>Ini halaman Contact</h1>
            </div>
        </div>
    );
}

export default Contact