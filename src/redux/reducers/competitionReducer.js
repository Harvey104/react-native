const initialState = {
    competition : {}
};
   
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMPETITION':
            return {
                ...state,
                competition: action.payload
            };
        default:
            return state;
    }
};