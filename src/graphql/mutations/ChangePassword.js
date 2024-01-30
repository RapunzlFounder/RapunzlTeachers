export const CHANGE_PASSWORD = (newPass, confirmPass) => `mutation {
  changePassword(
    newPassword: ${JSON.stringify(newPass)},
    confirmPassword: ${JSON.stringify(confirmPass)})
    {
      result
    }
  }
`;
