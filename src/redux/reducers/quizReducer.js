const initialState = {
    quiz : [{}],
    rate : {}
};
   
export default (state = initialState, action) => {
    switch (action.type) {
        case 'RANDOM_QUIZ':
            return {
                ...state,
                quiz: action.payload.quiz,
            };
        case 'SET_RATE':
            return{
                ...state,
                rate: action.payload.rate,
            }
        case 'REMOVE_QUIZ_RATE_VALUE':
            return {
                ...state,
                quiz: state.quiz,
                rate: state.rate
            }
        default:
            return state;
    }
};