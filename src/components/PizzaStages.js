// Import necessary dependencies from React and Redux
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Import your CSS file for styling
import '../styles/PizzaStages.css';

// Define the functional component PizzaStages
function PizzaStages() {
  // Set up the dispatch function and retrieve orders from the Redux store
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  // Define the stages of pizza preparation
  const stages = [
    { title: 'Order Placed' },
    { title: 'Order in Making' },
    { title: 'Order Ready' },
    { title: 'Order Picked' },
  ];

  // Use useEffect to set up a timer that dispatches a TIMER action every second
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'TIMER' });
    }, 1000);

    // Clean up the timer when the component is unmounted
    return () => clearInterval(timer);
  }, [dispatch]);

  // Handler for moving an order to the next stage
  const handleMoveToNextStage = (orderId) => {
    dispatch({ type: 'MOVE_TO_NEXT_STAGE', payload: { orderId } });
  };

  // JSX code for rendering the PizzaStages component
  return (
    <div className="pizza-stages-container">
      {/* Render stages and orders */}
      {stages.map((stage, index) => (
        <div key={index} className="pizza-stages">
          <h2>{stage.title}</h2>
          {index === 0 ? ( // Check if the current stage is "Order Placed"
            orders.filter((order) => order.stage === index).length === 0 ? ( // Check if there are zero orders in "Order Placed" stage
            <div className="no-orders-card">
            <p>🍕 Hungry?</p>
            <p>No orders placed here!</p>
            <p>Start satisfying your cravings by clicking on Place Order!</p>
          </div>
            ) : (
              orders
                .filter((order) => order.stage === index)
                .map((order) => (
                  <div
                    key={order.id}
                    className={`order-card ${index < stages.length - 1 && order.elapsedSeconds >= 180 ? 'red-background' : ''}`}
                  >
                    <p>Order No: {order.id}</p>
                    {index < stages.length - 1 ? (
                      <>
                        {order.elapsedSeconds !== undefined && (
                          <p>Time Spent: {Math.floor(order.elapsedSeconds / 60)}:{order.elapsedSeconds % 60}</p>
                        )}
                        <button className='next-button' onClick={() => handleMoveToNextStage(order.id)}>
                          Next &rarr;
                        </button>
                      </>
                    ) : (
                      <p>{stage.title}</p>
                    )}
                  </div>
                ))
            )
          ) : (
            orders
              .filter((order) => order.stage === index)
              .map((order) => (
                <div
                  key={order.id}
                  className={`order-card ${index < stages.length - 1 && order.elapsedSeconds >= 180 ? 'red-background' : ''}`}
                >
                  <p>Order No: {order.id}</p>
                  {index < stages.length - 1 ? (
                    <>
                      {order.elapsedSeconds !== undefined && (
                        <p>Time Spent: {Math.floor(order.elapsedSeconds / 60)}:{order.elapsedSeconds % 60}</p>
                      )}
                      <button className='next-button' onClick={() => handleMoveToNextStage(order.id)}>
                        Next &rarr;
                      </button>
                    </>
                  ) : (
                    <p>{stage.title}</p>
                  )}
                </div>
              ))
          )}
        </div>
      ))}
    </div>
  );
}

// Export the PizzaStages component as the default export
export default PizzaStages;
