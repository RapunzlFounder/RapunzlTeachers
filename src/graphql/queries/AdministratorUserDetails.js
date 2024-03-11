export const ADMINISTRATOR_USER_DETAILS = `
query{
	administratorUserDetails {
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
		isPrincipal
    	isSuperintendent
		birthDate
		dateJoined
		logoutRequired
		changePasswordRequired
		address1
		address2
		addressCity
		addressState
		addressZipCode
		phoneNumber
		lastUpdated
		school
		schoolId
		district
		districtId
		lastPublicModuleId
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
		teacherCreatedModules {
			id
			name
			description
			imageUrl
			presentationUrl
			presentationStandards
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
				standards
			}
			activities {
				id
				activityName
				description
				imageUrl
				pdfUrl
				standards
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
    	schoolTeacherSummaries{
			school
			schoolId
			teacherSummaries{
				id
    			username
    			email
    			firstName
    			lastName
    			picture
    			courses{
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
    			dateJoined
    			lastUpdated
    			classrooms{
					id
					className
					classYear
					createdAt
					lastModifiedAt
					noStudents
				}
    			classroomCourses{
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
	}
}`;
