export const COMPLETE_QUIZ = (quizCompleted) => `mutation {
  completeQuiz(quizCompleted: ${quizCompleted}) {
    success
  }
}`;
