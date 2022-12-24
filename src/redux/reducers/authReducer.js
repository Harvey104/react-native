const initialState = {
    auth : {
        id: null,
        username: '',
        email: "",
        roles: [
            "ROLE_USER"
        ],
        accessToken: ""
    }
};
   
export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                auth: action.payload
            };
        case 'LOG_OUT':
            return {
                ...state,
                auth: state,
            };
        default:
            return state;
    }
};