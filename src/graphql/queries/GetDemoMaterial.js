
export const GET_DEMO_CONTENT = `
  query{
    getDemoContent {
      courses {
        id
        courseName
        createdAt
        lastModifiedAt
        isPrivate
        courseModules {
          id
          name
          isPrivate
          isRapunzlModule
          teacherId
        }
      }
      classrooms {
        id
        className
        classYear
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
      classroomCourses {
        id
        classId
        className
        courseId
        courseName
        createdAt
        isActive
      }
    }
  }
`;