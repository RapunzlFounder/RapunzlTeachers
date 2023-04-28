export const FORGOT_USERNAME = (email, type) => `mutation {
  forgotUsername(${type}: ${JSON.stringify(email)}) {
    result
  }
}`;
