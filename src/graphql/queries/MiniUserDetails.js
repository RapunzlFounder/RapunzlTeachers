
export const MINI_USER_DETAILS = `query {
  miniTeacherUserDetails {
    id
    className
    createdAt
    lastModifiedAt
    noStudents
    studentList {
      userId
      firstName
      lastName
      username
      numberOfFriends
      lastUpdated
      numberOfStockTrades
      numberOfStockPositions
      defaultStockPortfolioID
      stockPortfolioPerformance
      stockCompetitionsEntered {
        id
        title
        status
        startDate
        startTime
        endDate
        endTime
        competitorCount
        compRank
        compPerformance
      }
      numberOfCryptoTrades
      numberOfCryptoPositions
      cryptoPortfolioPerformance
      defaultCryptoPortfolioID
      cryptoCompetitionsEntered {
        id
        title
        status
        startDate
        startTime
        endDate
        endTime
        competitorCount
        compRank
        compPerformance
      }
      moduleAssessmentScores{
        moduleId
        moduleName
        percentComplete
        percentCorrect
        questionResults{
          quizQuestionId
          moduleQuestionNumber
          studentAnswer
          answerCorrect
          noAttempts
          lastAttemptAt
        }
      }
    }
  }
}`;
