const initialState = {
    competitor : [{}]
};
   
export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COMPETITORS':
            return {
                ...state,
                competitor: action.payload
            };
        case 'REMOVE_COMPETITORS_VALUE':
            return {
                ...state,
                competitor: state
            };
        default:
            return state;
    }
};