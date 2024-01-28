// Import necessary dependencies from React and Redux
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Import react-toastify for notification
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import the cancelOrder action from the orderReducer
import { cancelOrder } from '../redux/reducers/orderReducer';

// Import CSS styles for the OrderDetails component
import '../styles/OrderDetails.css';

// Define the functional component OrderDetails
function OrderDetails() {
  // Retrieve orders and set up the dispatch function from the Redux store
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  // Handler for canceling an order
  const handleCancelOrder = (orderId, stage) => {
    // Check if the order is already picked (stage 3)
    if (stage === 3) {
      toast.error('Order is already picked. Cannot cancel.');
    } else {
      // Dispatch the cancelOrder action to update the state
      dispatch(cancelOrder(orderId));
      toast.success('Order canceled successfully!');
    }
  };

  // Helper function to get the stage name based on the stage value
  function getStageName(stage) {
    const stages = ['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'];
    return stages[stage];
  }

  // Helper function to format the time taken for an order
  function formatTimeTaken(order) {
    if (order.stage) {
      // Calculate total time taken in seconds from the starting point
      const totalTimeTaken = Math.floor((order.timestamps[order.timestamps.length - 1].timestamp - order.timestamps[0].timestamp) / 1000);

      // Convert total time taken to minutes and seconds
      const minutes = Math.floor(totalTimeTaken / 60);
      const seconds = totalTimeTaken % 60;

      return `${minutes}m ${seconds}s`;
    }

    return '';
  }

  // Calculate the total number of orders picked today
  const totalPickedOrders = orders.filter((order) => order.stage === 3).length;

   // JSX code for the Order Details component
  return (
    <div className="order-details-container">
      <h1>Order Details</h1>
      {/* Table to display order details */}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Stage</th>
            <th>Time Taken</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through orders to create table rows */}
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{getStageName(order.stage)}</td>
              <td>{formatTimeTaken(order)}</td>
              <td>
                {/* Button rendering logic based on order stage */}
                {order.stage === 2 ? (
                  <button
                    onClick={() => handleCancelOrder(order.id, order.stage)}
                    disabled={order.stage === 2}
                    className="readyto-picked-button"
                  >
                    Order Ready To Picked
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancelOrder(order.id, order.stage)}
                    disabled={order.stage === 3}
                    className={order.stage === 3 ? 'order-picked-button' : ''}
                  >
                    {order.stage === 3 ? 'Order Picked' : 'Cancel Order'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        {/* Table footer to display the total number of orders picked today */}
        <tfoot>
          <tr>
            <td colSpan="4">Total Pizza Delivered Today: {totalPickedOrders}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// Export the OrderDetails component as the default export
export default OrderDetails;
