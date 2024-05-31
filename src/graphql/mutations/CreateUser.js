// This mutation creates a new Teacher User.  Note that the input parameters invitationCode, demoProductID, and schoolID are optional.
//  If they are not provided, they will be set as null. Provide the invitationCode if an invitation code is used to create the teacher, otherwise do not 
//provide it as its default value will be sent with the mutation.  Provide the demoProductID parameter if the user is requesting a specific demo.  
// The value 1 is used for the demoProductID if the user is requesting a demo of the full Teacher Portal product with the curriculum and the simulator, 
// the value 3 is used if the user is requesting a demo of the teacher portal with no curriculum, just the classroom and simulator.
// Provide the schoolID parameter if the user has NOT provided an invitationCode.

// NOTE that in the returned object, currentProduct.expiresAt is the date that the user's product expires. 

export const CREATE_USER = (username, firstName, lastName, email, password, birthDate, invitationCode=null, demoProductID=null,schoolID=null) => `mutation {
  createTeacheruser(username: ${JSON.stringify(username)}, firstName: ${JSON.stringify(firstName)}, lastName: ${JSON.stringify(lastName)}, 
                    email: ${JSON.stringify(email)}, password: ${JSON.stringify(password)}, birthDate: ${JSON.stringify(birthDate)}, 
                    invitationCode: ${invitationCode}, demoProductID: ${demoProductID}, schoolId: ${schoolID}) {
     newUser {
      id
      email
      isActive
      isTeacher
      isSuperintendent
      isPrincipal
      username
      firstName
      lastName
      birthDate
      currentProduct{
				id
				name
				description
				monthlyCost
				annualCost
				expiresAt
				isActive
				productSubject
			}
			productFeatures{
				id
				createClassroom
    		removeClassroom
    		addClassroomStudents
    		removeClassroomStudents
    		createCourse
    		removeCourse
    		createClassroomCourse
    		removeClassroomCourse
    		viewClassrooms
    		viewCourses
    		viewClassroomCourses
    		addAssignments
    		removeAssignments
    		viewAssignments
    		viewStudentPortfolios
    		viewRapunzlCurriculums
    		createPrivateCurriculums
			}
		  availablePublicModules {
        id
        name
        description
        imageUrl
        presentationUrl
        presentationGoogleURL
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
          googleURL
					pdfUrl
          googleURL
        }
        articles {
          id
					articleName
					description
					imageUrl
          googleURL
					pdfUrl
          googleURL
        }
        activities {
          id
					activityName
					description
					imageUrl
          googleURL
					pdfUrl
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
  }
}
`;
