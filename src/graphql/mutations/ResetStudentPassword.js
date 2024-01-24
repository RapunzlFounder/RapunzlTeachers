export const RESET_STUDENT_PASSWORD = (usernameArray, password) => `mutation {
	teacherChangestudentpassword(studentUsername: ${usernameArray}, newPassword: ${JSON.stringify(password)}) {
		studentlogin {
			firstName
			lastName
			username
			password
		}
	}
}`;