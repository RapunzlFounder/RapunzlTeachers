export const RESET_STUDENT_PASSWORD = (username, password) => `mutation {
	teacherChangestudentpassword(studentUsername: ${JSON.stringify(username)}, newPassword: ${JSON.stringify(password)}) {
		studentlogin {
			firstName
			lastName
			username
			password
		}
	}
}`;