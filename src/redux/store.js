import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, employeeSlice)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)



// export const store = configureStore({
//   reducer: {
//     employee: employeeSlice,
//   },
// });