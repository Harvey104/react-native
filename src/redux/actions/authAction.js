
export const login = (auth) => {
    return {
      type: 'LOG_IN',
      payload: {
        id: auth.id,
        username: auth.username,
        email: auth.email,
        roles: [
            "ROLE_USER"
        ],
        accessToken: auth.accessToken
      }
    };
  };
   
export const logout = () => {
    return {
        type: 'LOG_OUT',
    };
};
