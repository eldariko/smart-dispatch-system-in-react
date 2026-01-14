import React from 'react';
import { Box, Typography } from '@mui/material';
import ElevatorIcon from '@mui/icons-material/Elevator';
import { elevatorConfig } from '../config';

// Must match the height used in Building and Floor components
const FLOOR_HEIGHT = 60;

const Elevator = ({ data }) => {
    // data contains: id, currentFloor, targetFloor, isMoving, occupied, state, lastTripTime


    const floorToRender = data.isMoving && data.targetFloor !== null
        ? data.targetFloor
        : data.currentFloor;

    // Calculate position:
    // Floor 0 is at the bottom, Floor 9 is at the top.
    const topPosition = (elevatorConfig.floors - 1 - floorToRender) * FLOOR_HEIGHT;

    // If moving, the duration must match the total travel time (Distance * Speed).
    // If not moving, we use a short transition for color changes.
    let transitionDuration = '300ms'; // Default for background color

    if (data.isMoving && data.targetFloor !== null) {
        const distance = Math.abs(data.targetFloor - data.currentFloor);
        // Ensure we don't multiply by 0
        const travelTime = Math.max(distance, 1) * elevatorConfig.speedPerFloor;
        transitionDuration = `${travelTime}ms`;
    }

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

                // Visual Movement Logic
                transform: `translateY(${topPosition}px)`,

                // We apply the calculated duration to the transform property
                transition: `transform ${transitionDuration} linear, background-color 300ms`,

                zIndex: 10,
                boxShadow: 3,
                border: '2px solid #333'
            }}
        >
            <ElevatorIcon />

            {/* BONUS: Display Trip Time */}
            {!data.isMoving && data.lastTripTime && (
                <Typography variant="caption" sx={{ fontSize: '0.7rem', fontWeight: 'bold', ml: 0.5 }}>
                    {data.lastTripTime}s
                </Typography>
            )}
        </Box>
    );
};

export default Elevator;