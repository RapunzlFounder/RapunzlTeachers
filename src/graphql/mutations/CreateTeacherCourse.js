

export const CREATE_TEACHER_COURSE = (courseName, isPrivate, modulesList) => `mutation {
  createTeachercourse(courseName: ${JSON.stringify(courseName)}, isPrivate: ${isPrivate}, courseModules: ${modulesList}) {
    newCourse {
		id
		courseName
		createdAt
		lastModifiedAt
		isPrivate
		modules {
			id
			name
			isPrivate
			isRapunzlModule
			teacherId
		}
    }
  }
}`;
