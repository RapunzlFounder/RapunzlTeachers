export const CHANGE_CLASSROOM_ACTIVE_STATUS = (classroomIdArray, isActive) => `mutation {
	changeClassroomActiveStatus(
		classroomId: ${classroomIdArray}
		isActive: ${isActive}
	) {
		activeClassrooms{
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
}`;
