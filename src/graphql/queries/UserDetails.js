export const USER_DETAILS = `
query{
  teacherUserDetails {
		id
		username
		email
		emailVerified
		firstName
		lastName
		picture
		allowNotifications
		unreadNotifications
		isTeacher
		birthDate
		dateJoined
		logoutRequired
		address1
		address2
		addressCity
		addressState
		addressZipCode
		phoneNumber
		lastUpdated
    	school      
    	schoolId 
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
		availablePublicModules {
			id
			name
			description
			imageUrl
			presentationUrl
			moduleLevel
			vocabUrl
			isPrivate
			isRapunzlModule
			teacherId
			teacherGuides {
				id
				guideName
				description
				imageUrl
				pdfUrl
			}
			articles {
				id
				articleName
				description
				imageUrl
				pdfUrl
			}
			activities {
				id
				activityName
				description
				imageUrl
				pdfUrl
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
		teacherCreatedModules {
			id
			name
			description
			imageUrl
			presentationUrl
			moduleLevel
			vocabUrl
			isPrivate
			isRapunzlModule
			teacherId
			teacherGuides {
				id
				guideName
				description
				imageUrl
				pdfUrl
			}
			articles {
				id
				articleName
				description
				imageUrl
				pdfUrl
			}
			activities {
				id
				activityName
				description
				imageUrl
				pdfUrl
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
}`;
