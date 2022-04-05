import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './reducer/slice';

export default configureStore({
    reducer: {
        token: tokenReducer,
    },
})