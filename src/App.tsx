import * as React from 'react';
import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Box, CssBaseline } from '@mui/material';

import Galaxy from './Nostalgia/Galaxy.tsx'

function Layout() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ zIndex: 0, width: "100%", height: "100%", position: "fixed" }}>
        <Outlet />
      </Box>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/Galaxy' element={<Galaxy />} />
          <Route path="*" element={<Navigate to="/Galaxy" />} />
          <Route path="/" element={<Navigate to="/Galaxy" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
