
 /**
 * Summary. This function is used to build the string required for the Rapunzl GraphQL mutation updateUser.  It allows more than one field to be updated at a time.
 *
 * Description. The names of all of the UserUpdateInput fields are as follows:
 *      firstName, lastName, email, bio, picture, allowNotfications, overEighteen, backtestEquity, defaultEquityShares, 
 *  defaultFuturesContracts, defaultForexSize, school, schoolId, allowShorts, allowOptions, facebookToken, birthDate
 * 
 *  The names of all of the BaseUserInfo return type fields are as follows:
 *      id, username, email, emailVerified, firstName, lastName, bio, picture, allowNotfications, overEighteen, backtestEquity, defaultEquityShares, 
 *   defaultFuturesContracts, defaultForexSize, isStudent, school, allowShorts, allowOptions, facebookToken, birthDate
 *
 * @param {array}  updateName   An array of namnes of the UserUpdateInput field that are to be updated, eg firstName, lastName etc..
 * @param {array}  updateValue   An array of values of the UserUpdateInput field that are to be updated, eg 'John' for firstName etc..
 * @param {array}  returnName   An array of names of the BaseUserInfo return field that are to be returned from the mutation, eg bio, picture etc..
 *
 * @return {string} The graphql mutation string.
 */
  
export const UPDATE_USER = (updateName, updateValue, returnName) => {
  // check that the length of each of the 3 input arrays is the same.  If not return undefined
  const updateNameLen = updateName.length;
  const updateValueLen = updateValue.length;
  const returnNameLen = returnName.length;
  let mutation_text = "mutation { updateUser(updateInfo: {";
  // build the updateUser mutation string dynamically from the contents of the 3 input arrays
  // eslint-disable-next-line
  if (updateNameLen == updateValueLen && updateValueLen == returnNameLen && updateNameLen == returnNameLen){
    
    for (var i = 0; i < updateNameLen; i++){
      const formattedUpdateValue = createUpdateValue(updateName[i], updateValue[i])
      mutation_text += updateName[i] + ": " + formattedUpdateValue.toString();
      // add a comma if there is more than 1 item in each array
      if (i < updateNameLen - 1){
        mutation_text += ",";
      }
    }
    mutation_text += "}) {baseUserInfo { ";
    // eslint-disable-next-line
    if (updateName[0] != "phoneNumber" && updateName[0] != "uniqueID") {
      for (var j = 0; j < returnNameLen; j++){
        mutation_text += returnName[j] + " ";
      }
    }
    mutation_text += "school isStudent xpEvents{id description xpAmount} coinEvents{id description coinAmount code coinBalance} userLevel{ currentLevelNumber nextLevelXP xpPointsBalance}}}}"

    return mutation_text;
  }
  else{
    return undefined;
  }
};

function createUpdateValue(updateName, updateValue){
  // eslint-disable-next-line
  if (updateName == "firstName" || updateName == "lastName" || updateName == "email" || updateName == "bio"
  // eslint-disable-next-line
   || updateName == "picture" || updateName == "school" || updateName == "facebookToken" || updateName == "birthDate" || updateName == "phoneNumber"){
    updateValue = JSON.stringify(updateValue);
  }
  return updateValue;
}

