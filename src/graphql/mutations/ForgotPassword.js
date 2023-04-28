export const FORGOT_PASSWORD = (email, type) => `mutation {
  forgotPassword(${type}: ${JSON.stringify(email)}) {
    result
  }
}`;
