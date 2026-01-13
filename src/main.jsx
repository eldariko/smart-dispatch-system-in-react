import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ElevatorProvider } from './context/ElevatorContext'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

// Create a dark theme instance (optional, looks better for elevators)
const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            {/* CSS Baseline kicks in an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <ElevatorProvider>
                <App />
            </ElevatorProvider>
        </ThemeProvider>
    </React.StrictMode>,
)