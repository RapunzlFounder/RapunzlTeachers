// NOTE:  make sure that the input parameter 'studentsToAddList' is an array of the following object
// { email: "welshman@me.edu",
//	 firstname: "Chris",
//	 lastName: "Thomas",
//	birthDate: "2008-06-06",
// }
export const CREATE_TEACHER_CLASSROOM = (classroomName, studentsToAddList, classYear) => `mutation {
	createTeacherclassroom(classroomName: ${JSON.stringify(classroomName)}, studentList: ${studentsToAddList}, classYear: ${classYear}) {
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
