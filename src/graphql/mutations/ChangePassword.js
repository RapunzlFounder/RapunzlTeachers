export const CHANGE_PASSWORD = (oldPass, newPass, confirmPass) => `mutation {
  changePassword(
    oldPassword: ${JSON.stringify(oldPass)},
    newPassword: ${JSON.stringify(newPass)},
    confirmPassword: ${JSON.stringify(confirmPass)})
    {
      result
    }
  }
`;
