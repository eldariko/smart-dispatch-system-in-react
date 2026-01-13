import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useElevator } from '../context/ElevatorContext';

const Floor = ({ floorNumber }) => {
    const { callElevator, floorCalls } = useElevator();

    // Check if this floor is currently in the waiting list
    const isCalled = floorCalls.includes(floorNumber);

    return (
        <Box
            sx={{
                height: '60px', // Fixed height
                borderBottom: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                px: 2,
                justifyContent: 'space-between'
            }}
        >
            <Typography variant="subtitle2" sx={{ width: '60px', fontWeight: 'bold' }}>
                {floorNumber === 0 ? 'GF' : `${floorNumber}th`}
            </Typography>

            <Button
                variant={isCalled ? "contained" : "outlined"}
                color={isCalled ? "error" : "primary"}
                onClick={() => callElevator(floorNumber)}
                size="small"
                sx={{
                    minWidth: '90px',
                    transition: 'all 0.3s'
                }}
            >
                {isCalled ? 'Waiting' : 'Call'}
            </Button>
        </Box>
    );
};

export default Floor;