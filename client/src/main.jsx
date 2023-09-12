import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes.jsx';
import { ThemeProvider } from '@mui/material';
import theme from './Theme/Theme.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
  <RouterProvider router={router}>

  </RouterProvider>
  </ThemeProvider>
  </React.StrictMode>,
)
