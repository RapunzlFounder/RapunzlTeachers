export const REMOVE_STUDENT_MODULE_QUIZSCORES = (studentUserId, moduleId) => `mutation {
	removeStudentmodulequizscores(studentUserId: ${studentUserId}, moduleId: ${moduleId} ) {
		success
  }
}`;
