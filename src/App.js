import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Component/Header';
import Challanges from './Layouts/Challanges';
import Wishlist from './Layouts/Wishlist';
import SidebarDrawer from './Component/SidebarDrawer';
import AllGames from './Layouts/AllGames';
import GameCollection from './Layouts/GameCollection';
import HomePage from './Layouts/HomePage';
import Profile from './Layouts/Profile/Profile';
import SharedModal from './Component/SharedModal';
import { ModalProvider } from './Contexts/ModalContext';
import ProfileEdit from './Layouts/Profile/ProfileEdit';
import ProfileSettings from './Layouts/Profile/ProfileSettings';

const App = ({}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
        },
      }),
    [darkMode]
  );

  const toggleDrawer = (open) => () =>{
    setDrawerOpen(open);
  };

  return (
    <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <ModalProvider>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} onMenuClick={toggleDrawer(true)}/>
        <SidebarDrawer open={drawerOpen} onClose={toggleDrawer(false)}/>
        <div>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AllGames" element={<AllGames />} />
          <Route path="/Challanges" element={<Challanges />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/GameCollection" element={<GameCollection />} />
          <Route path="/ProfileSettings" element={<ProfileSettings />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/ProfileEdit" element={<ProfileEdit/>} />
        </Routes>
        </div>
        <SharedModal/>
        </ModalProvider>
      </div>
    </ThemeProvider>
    </Router>
  );
};

export default App;