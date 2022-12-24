const initialState = {
    challengeId : 0
};
   
export default (state = initialState, action) => {
    switch (action.type) {
        case 'CHALLENGE_ID':
            return {
                ...state,
                challengeId: action.payload
            };
        case 'INITIAL_CHALLENGE_ID':
            return {
                ...state,
                challengeId: state
            }
        default:
            return state;
    }
};