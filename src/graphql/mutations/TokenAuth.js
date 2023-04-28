export const TOKEN_AUTH = (username, password) => `mutation {
  tokenAuth(username: ${JSON.stringify(username)}, password: ${JSON.stringify(password)}) {
    token
  }
}`;
