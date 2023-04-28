// NOTE:  make sure that the input parameter 'studentsToAddList' is an array of the following object
// { email: "welshman@me.edu",
//	 firstname: "Chris",
//	 lastName: "Thomas",
//	birthDate: "2008-06-06",
// }
export const ADD_CLASSROOM_STUDENTS = (classroomId, studentsToAddList) => `mutation {
	addClassroomstudents(classroomId: ${classroomId}, studentList: ${studentsToAddList}) {
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

// This function is used to create a string from the array of student of object that are to be added to the classroom.  The return of this
// function can then be used as the 'studentsToAddList' input parameter in the graphql mutation syntax 'ADD_CLASSROOM_STUDENTS'
export const STRINGIFY_STUDENTS_LIST = (studentsToAddList) => {
	// check that the length of each of the 3 input arrays is the same.  If not return undefined
	const studentsLen = studentsToAddList.length;
	
	let mutation_text = "[";
	  
	for (var i = 0; i < studentsLen; i++){
		mutation_text += "{email: " + JSON.stringify(studentsToAddList[i].email) + ",";
		mutation_text +=  "firstName: "+ JSON.stringify(studentsToAddList[i].firstName) + ",";
		mutation_text +=  "lastName: "+ JSON.stringify(studentsToAddList[i].lastName) + ",";
		mutation_text +=  "birthDate: "+ JSON.stringify(studentsToAddList[i].birthdate) + "}";

		// add a comma if there is more than 1 item in the student list array
		if (i < studentsLen - 1){
			mutation_text += ",";
		  }
	}
	
	mutation_text += "]"
  
	return mutation_text;

};
  
  
  