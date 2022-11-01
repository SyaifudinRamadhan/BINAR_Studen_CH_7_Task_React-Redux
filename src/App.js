import './App.css';
import { Login, Dashboard, Blog, Contact, ProtectedRoute } from './Components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';


function App() {

  const [globalUser, setGlobalUser] = useState(undefined);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/login'
            element={
              <Login></Login>
            } />
          <Route path='/' element={
            <ProtectedRoute callback={setGlobalUser}>
              <Dashboard user={globalUser} />
            </ProtectedRoute>
          } />
          <Route
            path="blog"
            element={
              <ProtectedRoute callback={setGlobalUser}>
                <Blog user={globalUser} />
              </ProtectedRoute>
            } />
          <Route
            path="contact"
            element={
              <ProtectedRoute callback={setGlobalUser}>
                <Contact user={globalUser} />
              </ProtectedRoute>
            } />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
