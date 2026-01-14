# **Smart Elevator System**

A React-based simulation of a smart elevator dispatch system. The system manages a building with multiple elevators and floors, optimizing travel time using a proximity-based algorithm.

## **🚀 Features**

* **Smart Dispatch Algorithm:** Assigns the nearest available elevator to the calling floor.  
* **Smooth Animations:** Visual representation of elevator movement using CSS transitions.  
* **State Management:** Real-time tracking of elevator status (Moving, Idle, Occupied).  
* **Customizable Settings:** Ability to change the number of floors and elevators dynamically.  
* **Sound Effects:** Audio feedback upon elevator arrival.  
* **Trip Timer:** Visual display of the time taken for each trip.

## **🛠️ Tech Stack**

* **React (Vite):** For a fast and modern development environment.  
* **Material UI (MUI):** For a clean, responsive, and professional UI infrastructure.  
* **Context API:** For centralized global state management (Elevator Logic).  
* **CSS Transitions:** For performant and smooth animations without external libraries.

## **⚙️ Setup Instructions**

1. **Clone the repository:**  
   git clone https://github.com/eldariko/smart-dispatch-system-in-react.git

   cd arbox-elevators

2. **Install dependencies:**  
   npm install

3. **Run the development server:**  
   npm run dev

4. Open in browser:  
   Navigate to http://localhost:5173 (or the port shown in your terminal).

## **🧠 Dispatch Algorithm**

The core logic resides in ElevatorContext.jsx. The goal is to minimize user wait time.  
**How it works:**

1. **Queue Management:** When a user clicks "Call", the floor is added to a floorCalls queue.  
2. **Selection Criteria:** The system constantly monitors the queue. When a call is detected, it filters for elevators that are:  
   * Currently **Idle** (not moving).  
   * Not **Occupied** (doors closed).  
3. **Proximity Check:** Among the available elevators, it calculates the distance (Math.abs(elevatorFloor \- targetFloor)) and selects the one with the minimum distance.  
4. **Execution:** The selected elevator is dispatched, its state changes to Occupied, and it travels to the target.

Why this approach?  
This "Nearest Idle" strategy is efficient for standard loads and simple to implement without race conditions. It ensures that the closest resource is always utilized first.

## **📐 Key Design Decision**

**Architecture: Centralized Logic via Context API**  
I chose to lift the entire elevator logic (state, movement calculations, queue management) into a single React Context (ElevatorContext) rather than managing it inside the visual components.

* **Why:** This decouples the *Logic* from the *UI*. The Building and Elevator components are "dumb" visual presenters that only receive data. This makes the code cleaner, easier to test, and allows any component (like a future "Control Center" dashboard) to access elevator data without prop-drilling.  
* **Alternatives Considered:** I considered using Redux, but for this scope, Redux would add unnecessary boilerplate. React Context provided the perfect balance of simplicity and global access.

## **🔧 Technical Challenge**

**Challenge: Managing Async State Updates & Audio Policies**  
One significant challenge was synchronizing the visual movement (CSS transition), the logical state update (React state), and the sound effect. Specifically, browsers often block audio autoplay if not triggered by a direct user event, and React's setState inside useEffect can cause loops.  
**Solution:**

1. **Timer Synchronization:** I used setTimeout that exactly matches the CSS transition duration to trigger the "Arrival" state update precisely when the animation ends.  
2. **Refactoring to useCallback:** To avoid useEffect dependency loops, I wrapped the movement logic in useCallback and decoupled the elevator state updates from the triggering effect.  
3. **Robust Audio Handling:** Instead of relying on external hooks that might fail silently, I implemented a native new Audio() call wrapped in a try/catch block to handle browser autoplay policies gracefully without crashing the app.

**Developed by Eldar Yaacobi**