import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './combineReducer'
import { persistStore, persistReducer, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, FLUSH } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

const persistor = persistStore(store);
export { store, persistor }
