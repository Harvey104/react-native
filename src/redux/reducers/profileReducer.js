const initialState = {
    profile : {
        firstName: '',
        lastName: '',
        ruth: '',
        department: '',
        branch: '',
        country: '',
        region: '',
        email: '',
    }
};
   
export default (state = initialState, action) => {
    switch (action.type) {
        case 'BASE_PROFILE':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    ruth: action.payload.ruth,
                    department: action.payload.department,
                }
            };
        case 'BRANCH_INPUT':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    branch: action.payload.branch
                },
            };
        case 'COUNTRY_INPUT':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    country: action.payload.country
                },
            }
        case 'REGION_INPUT':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    region: action.payload.region
                },
            }
        case 'EMAIL_INPUT':
            return {
                ...state,
                profile: {
                    ...state.profile,
                    email: action.payload.email
                },
            }
        default:
            return state;
    }
};