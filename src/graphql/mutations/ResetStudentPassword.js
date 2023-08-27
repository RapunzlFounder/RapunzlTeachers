export const RESET_STUDENT_PASSWORD = (username) => `mutation {
	teacherChangestudentpassword(studentUsername: ${JSON.stringify(username)}) {
		studentlogin {
			firstName
			lastName
			username
			password
		}
	}
}`;