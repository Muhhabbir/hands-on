import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'token',
    initialState: {
        value: "",
    },

    reducers: {
        setToken: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { setToken } = slice.actions;
export default slice.reducer;