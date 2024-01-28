// Import the configureStore function from the '@reduxjs/toolkit' package
import { configureStore } from '@reduxjs/toolkit';

// Import the orderReducer from the '../reducers/orderReducer' file
import orderReducer from '../reducers/orderReducer';

// Configure the Redux store using the configureStore function with a single reducer
const store = configureStore({
  reducer: orderReducer,
});

// Export the configured Redux store as the default export
export default store;
