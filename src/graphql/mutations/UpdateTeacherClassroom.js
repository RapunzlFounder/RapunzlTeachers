// User can change classroomName and classYear.  
//  Neither input field is required, but we send both in set to null if we do not want to update the value.
export const UPDATE_TEACHER_CLASSROOM = (classroomID, classroomName, classYear) => `mutation {
	updateTeacherclassroom(
		classroomId: ${classroomID}
		classroomName: ${JSON.stringify(classroomName)},
	) {
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
}
`;
