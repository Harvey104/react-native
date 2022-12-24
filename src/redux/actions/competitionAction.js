export const setCompetition = (competition) => {
    return {
      type: 'SET_COMPETITION',
      payload: {
        competition: competition
      }
    }
  }