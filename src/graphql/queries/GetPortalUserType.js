export const GET_PORTAL_USER_TYPE = `
query{
  getPortalUserType {
    id
    username
    isTeacher
    isPrincipal
		isSuperintendent
  }
}
`;
