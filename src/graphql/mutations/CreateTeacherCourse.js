

export const CREATE_TEACHER_COURSE = (courseName, isPrivate, modulesList) => `mutation {
  createTeachercourse(courseName: ${JSON.stringify(courseName)}, isPrivate: ${isPrivate}, courseModules: ${modulesList}) {
    newCourse {
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
