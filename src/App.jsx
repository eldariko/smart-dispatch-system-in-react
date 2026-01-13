import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Building from './components/Building';

function App() {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    ElevateBox
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Smart Dispatch System
                </Typography>
            </Box>

            {/* The main Building component handles the visual logic */}
            <Building />
        </Container>
    );
}

export default App;