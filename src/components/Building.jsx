import React from 'react';
import { Box, Paper } from '@mui/material';
import { elevatorConfig } from '../config';
import Floor from './Floor';
import Elevator from './Elevator';
import { useElevator } from '../context/ElevatorContext';

const FLOOR_HEIGHT = 60;

const Building = () => {
    const { elevators } = useElevator();

    // Create floor array [9, 8, ..., 0]
    const floors = Array.from({ length: elevatorConfig.floors }, (_, i) => i).reverse();

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                bgcolor: '#fff',
                // Ensure the building takes full width of container
                width: '100%',
                overflowX: 'auto' // Adds scroll if screen is too small
            }}
        >
            <Box sx={{ display: 'flex', width: '100%' }}>

                {/* Left Column: Floor Controls */}
                <Box sx={{ width: '150px', flexShrink: 0, borderRight: '2px solid #eee' }}>
                    {floors.map((floorNumber) => (
                        <Floor key={floorNumber} floorNumber={floorNumber} />
                    ))}
                </Box>

                {/* Right Column: Elevator Area */}
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    position: 'relative',
                    ml: 2,
                    justifyContent: 'space-around' // Spread elevators evenly
                }}>

                    {/* Background Grid */}
                    <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                        {floors.map((f) => (
                            <Box key={f} sx={{ height: `${FLOOR_HEIGHT}px`, borderBottom: '1px solid #f5f5f5' }} />
                        ))}
                    </Box>

                    {/* Render Shafts + Elevators */}
                    {elevators.map((elevator) => (
                        <Box
                            key={elevator.id}
                            sx={{
                                // Min-width ensures elevators don't get squashed
                                minWidth: '100px',
                                flex: 1,
                                height: `${elevatorConfig.floors * FLOOR_HEIGHT}px`,
                                borderRight: '1px dashed #e0e0e0',
                                borderLeft: elevator.id === 0 ? '1px dashed #e0e0e0' : 'none',
                                position: 'relative',
                                bgcolor: '#fafafa'
                            }}
                        >
                            <Elevator data={elevator} />
                        </Box>
                    ))}

                </Box>
            </Box>
        </Paper>
    );
};

export default Building;