// src/App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Users from './components/Users';
import './App.css';
import CursorDot from './components/CursorDot';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Users />
        <CursorDot/>
      </div>
    </ThemeProvider>
  );
}

export default App;
