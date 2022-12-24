export const setCompetitor = (competitor) => {
    return {
      type: 'SET_COMPETITORS',
      payload: {
        competitor: competitor
      }
    };
  };
   
export const removeCompetitorValue = () => {
  return {
    type: 'REMOVE_COMPETITORS_VALUE'
  }
}