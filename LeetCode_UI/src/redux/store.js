import { configureStore } from '@reduxjs/toolkit';
import problemSlice from './reducers/problemReducer';

export const store = configureStore({
    reducer: {
        leetCodeProblems: problemSlice,
    },

});
