export const challenger = (id) => {
    return {
        type: 'MY_CHALLEGER',
        payload: {
            challenger: id
        }
    };
};