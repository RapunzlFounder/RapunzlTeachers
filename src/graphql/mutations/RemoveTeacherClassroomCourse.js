export const REMOVE_TEACHER_CLASSROOM_COURSE = (classroomCoursesToRemove) => `mutation {
	removeTeacherclassroomcourse(classroomCoursesToRemove: [${classroomCoursesToRemove.toString()} ]) {
		success
  }
}`;
