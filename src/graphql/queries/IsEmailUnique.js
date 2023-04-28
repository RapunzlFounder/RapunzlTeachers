/* 
  Query to determine if an email is unique in the database.  A response of true indicates that the username is unique and could, 
  for example, be used to create a new user account.  A response of false indicates that the username is not unique and is already taken.  
  This username could not, for example, be used to create a new user account if a response of false is returned.
*/export const IS_EMAIL_UNIQUE = (email) => `query {
    isEmailUnique(email: ${JSON.stringify(email)})
  }`
  ;