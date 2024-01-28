// Define the initial state for the orderReducer
const initialState = {
  orders: [], // Array to store all orders
  orderId: 0, // Variable to keep track of the latest order ID
};

// Helper function to calculate the timer based on pizza size
const calculateTimer = (pizzaSize) => {
  switch (pizzaSize) {
    case 'Small':
      return 3 * 60; // 3 minutes for Small size pizza
    case 'Medium':
      return 4 * 60; // 4 minutes for Medium size pizza
    case 'Large':
      return 5 * 60; // 5 minutes for Large size pizza
    default:
      return 0;
  }
};

// Action types as constants
const PLACE_ORDER = 'PLACE_ORDER';
const CANCEL_ORDER = 'CANCEL_ORDER';
const MOVE_TO_NEXT_STAGE = 'MOVE_TO_NEXT_STAGE';
const TIMER = 'TIMER';

// Action creators using the constants
export const placeOrder = (orderDetails) => ({
  type: PLACE_ORDER,
  payload: orderDetails,
});

export const cancelOrder = (orderId) => ({
  type: CANCEL_ORDER,
  payload: { orderId },
});

// Reducer function for handling orders
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    // Case for placing a new order
    case PLACE_ORDER:
      const { pizzaSize } = action.payload;
      const newOrder = {
        id: state.orderId + 1,
        details: action.payload,
        timer: calculateTimer(pizzaSize),
        stage: 0, // Initial stage is 0 (Order Placed)
        timestamps: [{ stage: 0, timestamp: Date.now() }],
      };
      return {
        ...state,
        orders: [...state.orders, newOrder],
        orderId: state.orderId + 1,
      };

    // Case for moving an order to the next stage
    case MOVE_TO_NEXT_STAGE:
      const { orderId } = action.payload;
      return {
        ...state,
        orders: state.orders.map((order) => ({
          ...order,
          stage: order.id === orderId ? (order.stage < 3 ? order.stage + 1 : order.stage) : order.stage,
          timestamps: order.id === orderId ? [...order.timestamps, { stage: order.stage, timestamp: Date.now() }] : order.timestamps,
        })),
      };

    // Case for handling the timer and elapsedSeconds
    case TIMER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          const elapsedSeconds = Math.floor((Date.now() - order.timestamps[order.timestamps.length - 1].timestamp) / 1000);

          // Check if the order is in the "Order Picked" stage
          if (order.stage === 3) {
            return {
              ...order,
              elapsedSeconds,
            };
          }

          return {
            ...order,
            timer: order.timer > 0 ? order.timer - 1 : 0,
            elapsedSeconds: order.timer === 0 ? 3 * 60 : elapsedSeconds,
          };
        }),
      };

    // Case for canceling an order
    case CANCEL_ORDER:
      const canceledOrderId = action.payload.orderId;
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== canceledOrderId),
      };

    // Default case returns the current state
    default:
      return state;
  }
};

// Export the orderReducer as the default export
export default orderReducer;
