// Import necessary dependencies from React and Redux
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Import CSS styles for the Navbar component
import '../styles/Navbar.css';

// Import images used in the Navbar
import logo from '../images/pizza-logo.png';
import placeorder from '../images/placeorder.png';

// Import the OrderForm component
import OrderForm from './OrderForm';

// Define the functional component NavBar
function NavBar() {
  // State to manage the visibility of the order form modal
  const [showModal, setShowModal] = useState(false);

  // Retrieve orders from the Redux store using the useSelector hook
  const orders = useSelector((state) => state.orders);

  // Handler for the "Place Order" button click
  const handlePlaceOrderClick = () => {
    // Count the number of orders that are in the "placed" stage (stage === 0)
    const orderPlacedCount = orders.filter((order) => order.stage === 0).length;

    // Check if the number of placed orders is less than 10
    if (orderPlacedCount < 10) {
      // If within limit, show the order form modal
      setShowModal(true);
    } else {
      // If the limit is exceeded, display an alert
      alert('Sorry, not more than 10 orders can be placed at the moment.');
    }
  };

  // Handler to close the order form modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // JSX code for the Navbar component
  return (
    <nav className="navbar">
      {/* Left section of the Navbar with logo and app name */}
      <div className="navbar-left">
        <img src={logo} alt="Pizza Pie Logo" className="pizza-logo" />
        {/* Replace Link with an anchor tag */}
        <a href="/" className="app-name">
          Pizza Pie
        </a>
      </div>

      {/* Center section of the Navbar with the "Place Order" button */}
      <div className="navbar-center">
        <div className="place-order-button" onClick={handlePlaceOrderClick}>
          <img src={placeorder} alt="Place Order" />
          <span className="button-text">Place Order</span>
        </div>
      </div>

      {/* Right section of the Navbar with a welcome message */}
      <div className="navbar-right">
        <h3 className="welcome-message">
          <span className="person-icon">&#128100;</span>
          Welcome to Pizza Pie!!
        </h3>
      </div>

      {/* Display the order form modal if showModal state is true */}
      {showModal && (
        <div className="modal">
          {/* Pass onCloseModal as a prop to OrderForm */}
          <OrderForm onCloseModal={handleCloseModal} />
        </div>
      )}
    </nav>
  );
}

// Export the NavBar component as the default export
export default NavBar;
