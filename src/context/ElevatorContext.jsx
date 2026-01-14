import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { elevatorConfig } from '../config';
import useSound from 'use-sound';

// Create Context
const ElevatorContext = createContext();

export const ElevatorProvider = ({ children }) => {
    // --- STATE ---

    const [elevators, setElevators] = useState(
        Array.from({ length: elevatorConfig.elevators }, (_, i) => ({
            id: i,
            currentFloor: 0,
            targetFloor: null,
            isMoving: false,
            occupied: false
        }))
    );

    const [floorCalls, setFloorCalls] = useState([]);

    // Sound effect hook
    const [playArrival] = useSound(elevatorConfig.arrivalSound, { volume: 0.5 });

    // --- LOGIC ---

    // Helper to calculate travel time
    const getTravelTime = (currentFloor, targetFloor) => {
        return Math.abs(targetFloor - currentFloor) * elevatorConfig.speedPerFloor;
    };

    // 1. Refactored moveElevator: Now wrapped in useCallback and receives currentFloor
    // This breaks the dependency chain so it doesn't need to depend on the 'elevators' array
    const moveElevator = useCallback((id, targetFloor, currentFloor) => {
        const startTime = Date.now(); // Start timer

        // 1. Mark as moving and set target
        setElevators(prev => prev.map(e =>
            e.id === id ? { ...e, isMoving: true, occupied: true, targetFloor,startTime: startTime  } : e
        ));

        // Calculate how long the travel takes
        const travelTime = getTravelTime(currentFloor, targetFloor);

        // 2. Wait for travel time (Simulation of movement)
        setTimeout(() => {
            const endTime = Date.now();
            const duration = (endTime - startTime) / 1000; // Convert to seconds


            // ARRIVAL LOGIC
            // Update floor to target
            setElevators(prev => prev.map(e =>
                e.id === id ? { ...e, currentFloor: targetFloor, isMoving: false,lastTripTime: duration.toFixed(1) } : e
            ));

            // Play Sound
            try { playArrival(); } catch (e) { /* ignore sound errors */
            console.error(e);
            }

            console.log(`Elevator ${id} arrived at floor ${targetFloor}`);

            // 3. Wait for Door Open time
            setTimeout(() => {
                // BACK TO IDLE
                setElevators(prev => prev.map(e =>
                    e.id === id ? { ...e, occupied: false, targetFloor: null } : e
                ));
            }, elevatorConfig.doorWaitTime);

        }, travelTime);
    }, [playArrival]); // No dependency on 'elevators' array!


    // 2. Main Algorithm: Process the queue
    useEffect(() => {
        // If no calls waiting, do nothing
        if (floorCalls.length === 0) return;

        const nextFloor = floorCalls[0];

        // Find the best elevator
        const availableElevators = elevators.filter(e => !e.occupied && !e.isMoving);

        if (availableElevators.length > 0) {
            // Find the closest one
            const bestElevator = availableElevators.reduce((closest, current) => {
                const distCurrent = Math.abs(current.currentFloor - nextFloor);
                const distClosest = Math.abs(closest.currentFloor - nextFloor);
                return distCurrent < distClosest ? current : closest;
            });

            // FIX: Wrap in setTimeout to ensure state update happens AFTER render cycle
            // This solves the "setState synchronously" ESLint error
            setTimeout(() => {
                moveElevator(bestElevator.id, nextFloor, bestElevator.currentFloor);
                // Remove the call from queue
                setFloorCalls(prev => prev.filter(f => f !== nextFloor));
            }, 0);
        }

    }, [floorCalls, elevators, moveElevator]);


    // --- PUBLIC API ---

    const callElevator = (floorIndex) => {
        if (floorCalls.includes(floorIndex)) return;

        // Check if an elevator is already there and free
        const isAlreadyThere = elevators.find(e => e.currentFloor === floorIndex && !e.occupied);
        if (isAlreadyThere) {
            console.log("Elevator already here, opening doors...");
            // Reuse move logic with 0 distance (just triggers sound + door wait)
            moveElevator(isAlreadyThere.id, floorIndex, floorIndex);
            return;
        }

        setFloorCalls(prev => [...prev, floorIndex]);
    };

    const value = {
        elevators,
        floorCalls,
        callElevator
    };

    return (
        <ElevatorContext.Provider value={value}>
            {children}
        </ElevatorContext.Provider>
    );
};

export const useElevator = () => {
    const context = useContext(ElevatorContext);
    if (!context) throw new Error('useElevator must be used within ElevatorProvider');
    return context;
};