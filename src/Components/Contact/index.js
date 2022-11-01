import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../../index.css';
import Navbar from '../Layouts/standart';

function Contact () {
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <h1>Ini halaman Contact</h1>
            </div>
        </div>
    );
}

export default Contact