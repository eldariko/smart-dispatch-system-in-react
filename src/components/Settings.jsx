import React, { useState } from 'react';
import { Box, TextField, Button, Drawer, Typography, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = () => {
    const [open, setOpen] = useState(false);
    const [floors, setFloors] = useState(10);
    const [elevators, setElevators] = useState(5);

    const handleSave = () => {
        // 1. Save the new settings to LocalStorage
        // We store them so they persist after the reload
        localStorage.setItem('elevatorSettings', JSON.stringify({
            floors: Number(floors),
            elevators: Number(elevators)
        }));

        // 2. Reload the page
        // This forces the app to re-read the config from scratch with new values
        window.location.reload();
    };

    return (
        <>
            <IconButton
                onClick={() => setOpen(true)}
                sx={{ position: 'fixed', bottom: 20, right: 20, bgcolor: 'white', boxShadow: 3 }}
            >
                <SettingsIcon />
            </IconButton>

            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 300, p: 3 }}>
                    <Typography variant="h6" gutterBottom>Building Settings</Typography>

                    <TextField
                        label="Number of Floors"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={floors}
                        onChange={(e) => setFloors(e.target.value)}
                    />

                    <TextField
                        label="Number of Elevators"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={elevators}
                        onChange={(e) => setElevators(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleSave}
                    >
                        Apply & Restart
                    </Button>
                </Box>
            </Drawer>
        </>
    );
};

export default Settings;