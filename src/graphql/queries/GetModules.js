// the input parameter 'skip' allows you to skip the first number of specified records in the returned list of closed positions. 
// Set this input paramter to 0 to not skip any records.
// the input parameter 'first' allows you to return only the first number of specified records in the returned list of closed positions.
// Set this input paramter to 0 to return all records that have not been skipped.
export const GET_MODULES = (getPublicModules, getTeacherModules, moduleIds) => `
  query{
    getTeacherModules(getPublicModules: ${getPublicModules}, getTeacherModules: ${getTeacherModules}, moduleIds: ${moduleIds}}) {
      id
      name
      description
      imageUrl
      presentationUrl
      presentationStandards
      moduleLevel
      vocabUrl
      isPrivate
      isRapunzlModule
      teacherId
      teacherGuides {
        id
        guideName
        description
        imageUrl
        pdfUrl
      }
      articles {
        id
        articleName
        description
        imageUrl
        pdfUrl
        standards
      }
      activities {
        id
        activityName
        description
        imageUrl
        pdfUrl
        standards
      }
      assessments {
        id
        assessmentName
        description
        imageUrl
        questions {
          id
          questionNumber
          question
          answer
          questionOptions
          explanation
          attemptsAllowed
          isRapunzlQuestion
        }
      }
      videos {
        id
        videoName
        description
        imageUrl
        videoUrl
      }
    }
  }
`;