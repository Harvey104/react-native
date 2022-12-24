export const randomQuiz = (quiz) => {
    return {
      type: 'RANDOM_QUIZ',
      payload: {
        quiz: quiz
      }
    };
};

export const setRate = (rate) => {
  return {
    type: 'SET_RATE',
    payload: {
      rate: rate
    } 
  }
}

export const removeQuizValue = () => {
  return {
    type : 'REMOVE_QUIZ_RATE_VALUE'
  }
}