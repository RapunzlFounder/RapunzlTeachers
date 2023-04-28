export const SEARCH_USERS = (name) => `query{
   searchUsers(searchType:USERNAME_ICONTAINS, searchText:${JSON.stringify(name)}, limit:15){
    id
    email
    username
    dateJoined
    firstName
    lastName
  }
}`;
