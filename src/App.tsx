import * as React from 'react';
import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { CssBaseline } from '@mui/material';

function Layout() {
  return (
    <>
      <CssBaseline />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>

          <Route path="*" element={<Navigate to="/Home" />} />
          <Route path="/" element={<Navigate to="/Home" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
