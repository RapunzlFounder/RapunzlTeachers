export const UPDATE_TEACHER_COURSE = (courseID, courseName, isPrivate, courseModulesArray) => `mutation {
	updateTeachercourse(
		courseId: ${courseID}
		courseName: ${JSON.stringify(courseName)}
		isPrivate: ${isPrivate}
	) {
		updatedCourse {
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
	}
}`;
