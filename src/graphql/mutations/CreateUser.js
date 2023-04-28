// This mutation creates a new Teacher User
export const CREATE_USER = (username, firstName, lastName, email, password, birthDate, invitationCode) => `mutation {
  createTeacheruser(username: ${JSON.stringify(username)}, firstName: ${JSON.stringify(firstName)}, lastName: ${JSON.stringify(lastName)}, 
                    email: ${JSON.stringify(email)}, password: ${JSON.stringify(password)}, birthDate: ${JSON.stringify(birthDate)}, 
                    invitationCode: ${invitationCode}) {
     newUser {
      id
      email
      isActive
      isTeacher
      username
      firstName
      lastName
      birthDate
      possibleSchools {
        id
        schoolName
        schoolType
        schoolDomain
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
    }
  }
}
`;
