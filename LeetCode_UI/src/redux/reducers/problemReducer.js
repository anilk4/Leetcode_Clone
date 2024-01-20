import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const problemSlice = createSlice({
    name: "leetCodeProblems",
    initialState: {
        problems: [],
        status:'idle'
    },
    extraReducers:(builder)=>{
        builder.addCase(getProblems.pending,(state,action)=>{
            state.status = 'loading'
        })

        builder.addCase(getProblems.fulfilled,(state,action)=>{
            state.problems = action.payload
            state.status = 'idle'
        })

        builder.addCase(getProblems.rejected,(state,action)=>{
            state.status = 'error'
        })
    }
});

export default problemSlice.reducer;

export const { getProblemsSuccess } = problemSlice.actions;


export const getProblems = createAsyncThunk('product/get',async ()=>{
    const data = await fetch("http://localhost:3000/problem/getAll")
    const result = await data.json()

    return result;
})
