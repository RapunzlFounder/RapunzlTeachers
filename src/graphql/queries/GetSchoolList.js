export const GET_SCHOOL_LIST = (email) => `query {
    getSchoolList(email: "${email}") {
      id
      schoolName
      schoolDomain
      schoolType
    }
  }`
  ;