
export const baseProfile = (profile) => {
  return {
    type: 'BASE_PROFILE',
    payload: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      ruth: profile.ruth,
      department: profile.department
    }
  };
};
 
export const branchProfile = (profile) => {
  return {
      type: 'BRANCH_INPUT',
      payload: {
        branch: profile.branch
      }
  };
};

export const countryProfile = (profile) => {
  return {
      type: 'COUNTRY_INPUT',
      payload: {
        country: profile.country
      }
  };
};

export const regionProfile = (profile) => {
  return {
      type: 'REGION_INPUT',
      payload: {
        region: profile.region
      }
  };
};

export const emailProfile = (profile) => {
  return {
      type: 'EMAIL_INPUT',
      payload: {
        email: profile.email
      }
  };
};