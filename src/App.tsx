import * as React from 'react';
import { Routes, Route, BrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Box, CssBaseline } from '@mui/material';
import Header from './Components/Header.tsx'
import ThemeProviderWrapper from './Theme.tsx';

import scenes from './Scenes.tsx'

const scenesRoutes = scenes.map(({ name, path }) => {
  const Component = React.lazy(() => import(`./Nostalgia/${name}.tsx`));
  return <Route key={path} path={path} element={<Component />} />
});

function Layout() {
  return (
    <>
      <CssBaseline />
      <ThemeProviderWrapper>
        <Header />
        <Box sx={{ zIndex: 0, width: "100%", height: "100%", position: "fixed" }}>
          <Outlet />
        </Box>
      </ThemeProviderWrapper>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          {scenesRoutes}
          <Route index element={<Navigate to={RandomScenePath()} replace />} />
          <Route path="*" element={<Navigate to={"/"} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function RandomScenePath(): string {
  return scenes[
    Math.floor(Math.random() * scenes.length)
  ].path;
}

export default App;
