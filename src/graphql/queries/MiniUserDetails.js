
export const MINI_USER_DETAILS  = (lastModuleID) => `query {
  miniTeacherUserDetails(lastPublicModuleID: ${lastModuleID}) {
		logoutRequired
		lastPublicModuleId
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
				emailVerified
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
				moduleAssessmentScores {
					moduleId
					moduleName
					percentComplete
					percentCorrect
					questionResults {
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
		availablePublicModules {
			id
			name
			description
			imageUrl
			presentationUrl
			presentationGoogleURL
			presentationStandards
			moduleLevel
			vocabUrl
			vocabGoogleURL
			isPrivate
			isRapunzlModule
			teacherId
			teacherGuides {
				id
				guideName
				description
				imageUrl
				pdfUrl
				googleURL
			}
			articles {
				id
				articleName
				description
				imageUrl
				pdfUrl
				standards
				googleURL
			}
			activities {
				id
				activityName
				description
				imageUrl
				pdfUrl
				standards
				googleURL
			}
			assessments {
				id
				assessmentName
				description
				imageUrl
				questions {
					id
					questionNumber
					question
					answer
					questionOptions
					explanation
					attemptsAllowed
					isRapunzlQuestion
				}
			}
			videos {
				id
				videoName
				description
				imageUrl
				videoUrl
			}
		}
	}
}`;
