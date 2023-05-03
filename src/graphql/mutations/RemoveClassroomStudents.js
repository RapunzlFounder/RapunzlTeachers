// NOTE:  make sure that the input parameter 'studentsToRemoveList' is an array of Student user Id's

export const REMOVE_CLASSROOM_STUDENTS = (classroomId, studentsToRemoveList) => `mutation {
	removeClassroomstudents(classroomId: ${classroomId}, studentList: ${studentsToRemoveList}) {
		classroom {
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
  	}
}`;
