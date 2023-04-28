
export const CREATE_TEACHER_CLASSROOM_COURSE = (classroomId, courseId) => `mutation {
	createTeacherclassroomcourse(classroomId: ${classroomId}, courseId: ${courseId}) {
		classroomCourse {
			id
			classId
			className
			courseId
			courseName
			createdAt
			isActive
		}
  	}
}`;
