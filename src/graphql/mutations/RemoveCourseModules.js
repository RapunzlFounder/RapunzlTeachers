export const REMOVE_COURSE_MODULES = (courseId, modulesToRemoveList) => `mutation {
  removeCoursemodules(courseId: ${courseId}, modulesToRemove: ${modulesToRemoveList} ) {
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
