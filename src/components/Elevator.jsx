import React from 'react';
import { Box } from '@mui/material';
import ElevatorIcon from '@mui/icons-material/Elevator';
import { elevatorConfig } from '../config';

// Must match the height used in Building and Floor components
const FLOOR_HEIGHT = 60;

const Elevator = ({ data }) => {
    // data contains: id, currentFloor, isMoving, occupied, state

    // Calculate position:
    // Floor 0 is at the bottom, Floor 9 is at the top.
    // The DOM renders top-to-bottom.
    // Formula: (TotalFloors - 1 - CurrentFloor) * FloorHeight
    const topPosition = (elevatorConfig.floors - 1 - data.currentFloor) * FLOOR_HEIGHT;

    // Determine color based on state
    let color = 'black'; // Default / Idle
    if (data.occupied && data.isMoving) {
        color = '#d32f2f'; // Red: Moving to target
    } else if (data.occupied && !data.isMoving) {
        color = '#388e3c'; // Green: Arrived / Door Open
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${FLOOR_HEIGHT}px`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                bgcolor: color,
                borderRadius: 1,
                // The magic happens here: translate moves it smoothly
                transform: `translateY(${topPosition}px)`,
                // We match the transition time to the travel time per floor
                transition: `transform ${elevatorConfig.speedPerFloor}ms linear, background-color 0.3s`,
                zIndex: 10,
                boxShadow: 3,
                border: '2px solid #333'
            }}
        >
            <ElevatorIcon />
            {/* Optional: Display Elevator ID for debugging */}
            {/* <Typography variant="caption" sx={{position:'absolute', bottom: 0}}>{data.id}</Typography> */}
        </Box>
    );
};

export default Elevator;