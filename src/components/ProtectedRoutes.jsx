import React from 'react';
import { Route, Navigate, Routes, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, isAuthenticated}) => {
    console.log("testing",isAuthenticated)
  return (

       
          isAuthenticated ? <Outlet/> : <Navigate to="/login" />
       
   
  );
};

export default ProtectedRoute;
