export const CONTACT_SUPPORT = (text) => `mutation {
  contactSupport(message: ${JSON.stringify(text)}) {
    success
  }
}`;
