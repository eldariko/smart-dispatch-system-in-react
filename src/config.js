// src/config.js

import elevatorDing from './assets/elevator-ding.mp3';

// Check if user has custom settings in localStorage
const savedSettings = JSON.parse(localStorage.getItem('elevatorSettings'));


export const elevatorConfig = {
    floors: savedSettings?.floors || 10,           // Use saved value OR default to 10
    elevators: savedSettings?.elevators || 5,      // Use saved value OR default to 5
    speedPerFloor: 1000,
    doorWaitTime: 2000,
    arrivalSound: elevatorDing // Properly imported asset for Vite
};