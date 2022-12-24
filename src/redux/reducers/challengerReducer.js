const initialState = {
    challenger : 0
};
   
export default (state = initialState, action) => {
    switch (action.type) {
        case 'MY_CHALLEGER':
            return {
                ...state,
                challenger: action.payload
            };
        default:
            return state;
    }
};