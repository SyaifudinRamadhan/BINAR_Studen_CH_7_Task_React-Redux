import React, { useState, useEffect } from 'react';
import '../../index.css';
import Navbar from '../Layouts/standart';

let loopRender = 0;

function Dashboard ({user}) {
    
    return (
        <div>
            <Navbar user={user}></Navbar>
            <div>
                <h1>Ini halaman dashboard</h1>
            </div>
        </div>
    );
}

export default Dashboard