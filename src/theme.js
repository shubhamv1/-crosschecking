// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize primary color
    },
    secondary: {
      main: '#dc004e', // Customize secondary color
    },
  },
  typography: {
    h1: {
      fontSize: '2.4rem',
      fontWeight: 700,
      margin: '1rem 0',
    },
  },
});

export default theme;
