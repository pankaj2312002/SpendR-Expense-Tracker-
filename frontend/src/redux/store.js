import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import authReducer from './slices/AuthSlice.js'; // Your authentication reducer


// 1. Combine your reducers
const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers can go here
});

// 2. Create a persist config
// redux-persist is a library used to persist the Redux state to a storage medium (e.g., localStorage or sessionStorage)
const persistConfig = {
  key: 'root', // Key for localStorage (or another storage)
  storage: storage,   // The storage engine (localStorage is used here)
  whitelist: ['auth'] // List of reducers to persist (auth in this case)
};

// 3. Wrap the root reducer with persistReducer/persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed to allow non-serializable values in state
    }),
});

// 5. Create a persistor
export const persistor = persistStore(store);

// Export the store as usual
export default store;
