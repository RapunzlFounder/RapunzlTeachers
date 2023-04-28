export const ADD_COURSE_MODULES = (courseId, modulesToAddList) => `mutation {
  addCoursemodules(courseId: ${courseId}, modulesToAdd: ${modulesToAddList}) {
    updatedCourse {
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
