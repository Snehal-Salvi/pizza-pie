// Import React library for building UI components
import React from 'react';

// Import Provider component from react-redux to provide the Redux store to the entire app
import { Provider } from 'react-redux';

//Import react-toastify for notification
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

// Import the main CSS file for styling
import './App.css';

// Import the Redux store from the specified path
import store from '../src/redux/store/store.js';

// Import custom components
import NavBar from './components/NavBar';
import PizzaStages from './components/PizzaStages.js';
import OrderDetails from './components/OrderDetails.js';

// Functional component representing the main application
function App() {
  return (
    // Wrapiing the entire application with the Provider component to provide the Redux store
    <Provider store={store}>
      {/* Main container for the entire application */}
      <div className="App">

      <ToastContainer />

        {/* Render the NavBar component */}
        <NavBar />
        
        {/* Render the PizzaStages component */}
        <PizzaStages />

        {/* Render the OrderDetails component */}
        <OrderDetails />
      </div>
    </Provider>
  );
}

// Export the App component as the default export
export default App;
