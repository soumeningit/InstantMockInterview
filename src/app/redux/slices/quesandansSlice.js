import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quesandans: null,
    interviewAnswer: null,
}
export const quesandansSlice = createSlice({
    name: 'questionsandanswers',
    initialState: initialState,
    reducers: {
        setQuesandAns: (state, action) => {
            state.quesandans = action.payload
        },
        setInterviewAnswer: (state, action) => {
            state.interviewAnswer = action.payload
        },
    }
})
export const { setQuesandAns, setInterviewAnswer } = quesandansSlice.actions;
export default quesandansSlice.reducer;