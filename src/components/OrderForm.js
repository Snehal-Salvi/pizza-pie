// Import necessary dependencies from React and Redux
import React from 'react';
import { useDispatch } from 'react-redux';

//Import react-toastify for notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import the placeOrder action from the orderReducer
import { placeOrder } from '../redux/reducers/orderReducer';

// Import CSS styles for the OrderForm component
import "../styles/OrderForm.css";

// Import images used in the OrderForm
import veg from "../images/veg.png";
import nonveg from "../images/nonveg.png";
import smallPizza from "../images/smallpizza.png";
import mediumPizza from "../images/mediumpizza.png";
import largePizza from "../images/largepizza.png";

// Define the functional component OrderForm
function OrderForm({ onCloseModal }) {
  // Set up the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Extract form data using FormData
    const formData = new FormData(e.target);

    // Create an object with the new order details
    const newOrderDetails = {
      pizzaType: formData.get('pizzaType'),
      pizzaSize: formData.get('pizzaSize'),
      pizzaBase: formData.get('pizzaBase'),
    };

    // Dispatch the placeOrder action to update the state
    dispatch(placeOrder(newOrderDetails));

    toast.success('Order placed successfully!');

    // Close the modal after submission
    onCloseModal();
  };

  // JSX code for the OrderForm component
  return (
    <div className="modal-content">
      {/* Modal header with title and close button */}
      <div className="modal-header">
        <h2>Place Your Order</h2>
        <span className="close" onClick={onCloseModal}>&#10006;</span>
      </div>

      {/* Form for submitting new orders */}
      <form onSubmit={handleSubmit}>
        {/* Input for selecting pizza type */}
        <label htmlFor="pizzaType">Pizza Type</label>
        <div className="pizza-type">
          <label htmlFor="veg">
            <input type="radio" id="veg" name="pizzaType" value="Veg" required />
            <img src={veg} alt="Veg" />
          </label>
          <label htmlFor="nonVeg">
            <input type="radio" id="nonVeg" name="pizzaType" value="Non-Veg" required />
            <img src={nonveg} alt="Non-Veg" />
          </label>
        </div>

        {/* Input for selecting pizza size */}
        <label htmlFor="pizzaSize">Pizza Size</label>
        <div className="pizza-size">
          <label htmlFor="small">
            <input type="radio" id="small" name="pizzaSize" value="Small" required />
            <img src={smallPizza} alt="Small Pizza" className="pizza-image" />
            <span>Small</span>
          </label>
          <label htmlFor="medium">
            <input type="radio" id="medium" name="pizzaSize" value="Medium" required />
            <img src={mediumPizza} alt="Medium Pizza" className="pizza-image" />
            <span>Medium</span>
          </label>
          <label htmlFor="large">
            <input type="radio" id="large" name="pizzaSize" value="Large" required />
            <img src={largePizza} alt="Large Pizza" className="pizza-image" />
            <span>Large</span>
          </label>
        </div>

        {/* Input for selecting pizza base */}
        <label htmlFor="pizzaBase">Pizza Base</label>
        <div className="pizza-base">
          <label htmlFor="thinCrust">
            <input type="radio" id="thinCrust" name="pizzaBase" value="Thin Crust" required />
            Thin Crust
          </label>
          <label htmlFor="thickCrust">
            <input type="radio" id="thickCrust" name="pizzaBase" value="Thick Crust" required />
            Thick Crust
          </label>
        </div>

        {/* Button for submitting the order */}
        <button className='submit-button' type="submit">Submit Order</button>
      </form>
    </div>
  );
}

// Export the OrderForm component as the default export
export default OrderForm;
