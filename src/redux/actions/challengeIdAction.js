export const setChallengeId = (id) => {
    return {
        type: 'CHALLENGE_ID',
        payload: {
            challengeId: id
        }
    };
};

export const removeChallengeIdValue = () => {
    return {
        type: 'INITIAL_CHALLENGE_ID',
    }
}
