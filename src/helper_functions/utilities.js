import moment from 'moment';

// function to convert an object of objects to an array of objects
export const objectToArray  = (inputObject) => {
    let returnArray = [];
    const isValidObject = isObject(inputObject);
    // check that the object is valid and not undefined
    if (isValidObject){
      for (var key in inputObject){
        returnArray.push(inputObject[key]);
      }
    }
    return returnArray;
};

// Function to sort an array of objects by a property of the array objects, 'key', in ascending order.
export function sortArrayObjectsByKey(array, key)
{
 return array.sort(function(a, b)
 {
  var x = a[key]; var y = b[key];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}

// Function to sort an array of objects by a property of the array objects, 'key', in descending order.
export function sortArrayObjectsByKeyDesc(array, key)
{
 return array.sort(function(a, b)
 {
  var x = a[key]; var y = b[key];
  return ((x < y) ? 1 : ((x > y) ? -1 : 0));
 });
}

// function to transform an array of objects into an object of objects using the "id"
export const arrayToObjectID = (array) =>
array.reduce((obj, item) => {
  obj[item.id] = item
  return obj
}, {})

// function to transform an array of objects into an object of objects using the "id"
export const arrayToObjectLikedID = (array) =>
array.reduce((obj, item) => {
  obj[parseInt(item.likedId)] = item.id
  return obj
}, {})

// function to transform an array of objects into an object of objects using the "competitionID"
export const arrayToObjectCompetitionID = (array) =>
array.reduce((obj, item) => {
  obj[item.competitionID] = item
  return obj
}, {})

// function to transform an array of objects into an object of objects using the "userId"
export const arrayToObjectUserID = (array) =>
array.reduce((obj, item) => {
  obj[item.userId] = item
  return obj
}, {})

// function to transform an array of objects into an object of objects using the "moduleId"
export const arrayToObjectModuleID = (array) =>
array.reduce((obj, item) => {
  obj[item.moduleId] = item
  return obj
}, {})

// function to transform an array of objects into an object of objects using the "standardId"
export const arrayToObjectStandardID = (array) =>
array.reduce((obj, item) => {
  obj[item.standardId] = item
  return obj
}, {})

// function to transform an array of objects into an object of objects using the "quizQuestionId"
export const arrayToObjectQuizQuestionID = (array) =>
array.reduce((obj, item) => {
  obj[item.quizQuestionId] = item
  return obj
}, {})

// function to transform an array of subscription objects into an object of objects using the "ProductID"
export const arrayToObjectProductID = (array) =>
array.reduce((obj, item) => {
  obj[item.ProductID] = item
  return obj
}, {})

// function to transform an array of objects into an object of objects using the "closedAtInt"
export const arrayToObjectClosedAt = (array) =>
array.reduce((obj, item) => {
  obj[item.closedAtInt] = item
  return obj
}, {})

// function to transform an array of objects into an object of objects using the " timeFilledInt"
export const arrayToObjectFilledAt = (array) =>
array.reduce((obj, item) => {
  obj[item.timeFilledInt] = item
  return obj
}, {})

// function to transform an array of InstrumentPrice objects into an object of InstrumentPrice objects using the "S"
export const arrayToSymbol = (array) =>
array.reduce((obj, item) => {
obj[item.S] = item
return obj 
}, {})

// function to create the array of symbols from the object of Instrument prices
export function createSymbolArray(pricesArray) {
    let outputArray = [];
    for (var i=0;i < pricesArray.length; i++){
        outputArray.push(pricesArray[i].S);
    }
    return outputArray;
}

// function to transform an array of string to an array of lower case strings
export function strArraytoLowerCase(strArray) {
  let outputArray = [];
    for (var i=0;i < strArray.length; i++){
        outputArray.push(strArray[i].toLowerCase());
    }
    return outputArray;
}

// create an array from the keys of an object
export function keysToArray(inputObject){
    let outputArray = []
    for (var key in inputObject){
        outputArray.push(key);
    }
    return outputArray;
}

// function to delete the key from an object.  This function is mostly used by the Redux reducers
export function removeKey (myObj, deleteKey) {
  // eslint-disable-next-line
    return Object.keys(myObj)
      .filter(key => key !== deleteKey)
      .reduce((result, current) => {
        result[current] = myObj[current];
        return result;
    }, {});
  }

// function to check if an object is empty
export function isEmpty(object) { 
  for(var i in object) { 
    return false;
   } 
  return true;
}

// function to check if a specific value of a key exists in an object.  If the key is found, return the value of the key 
export function containsKey(object, key, value) { 
  for(var i in object) { 
    // eslint-disable-next-line
    if (key in object[i] && object[i][key] == value){
      return object[i];
    }
   } 
  return null;
}

// function to check if a specific values of two keys exists in an object.  If the keys are found, return the value of the key 
export function containsTwoKeys(object, key1, value1, key2, value2) { 
  for(var i in object) { 
    // eslint-disable-next-line
    if (key1 in object[i] && object[i][key1] == value1 && key2 in object[i] && object[i][key2] == value2){
      return object[i];
    }
   } 
  return null;
}

// Function to find the difference between 2 arrays as a new array of dsifferences
export function differenceOf2Arrays (array1, array2) {
    const temp = [];
    array1 = array1.toString().split(',').map(Number);
    array2 = array2.toString().split(',').map(Number);
    
    for (var i in array1) {
        if(!array2.includes(array1[i])) temp.push(array1[i]);
    }
    for(i in array2) {
        if(!array1.includes(array2[i])) temp.push(array2[i]);
    }
    return temp.sort((a,b) => a-b);
}

export function isObject (item) {
  return (typeof item == "object" && !Array.isArray(item) && item !== null);
}

// calculate the number of seconds between the current time and the input time
export function calcTimeDiff(inputTime, secondsDiff, daysDiff){
  let timeDiff = 0;
  let localTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
  localTime = new Date(localTime);
  const currentTime = moment(localTime);
  // calculate the time difference in seconds between the current time and the last market data timestamp  
  const retrieved = moment(inputTime);
  // if the input parameter secondsDiff is true then calculate the time difference in seconds and return this
  if (secondsDiff && !daysDiff){
    timeDiff = currentTime.diff(retrieved, 'seconds');
  }
  // if the input parameter daysdDiff is true then calculate the time difference in seconds and return this
  else if (!secondsDiff && daysDiff){
    timeDiff = currentTime.diff(retrieved, 'days');
  }
  return timeDiff;
}

// calculate the current day of the week using local time
export function calcDayOfWeek(){
  let dayOfWeek = 0;
  let localTime = new Date().toLocaleString("en-US", {timeZone: "America/Chicago"});
  localTime = new Date(localTime);
  // determine the day number for the current date
  dayOfWeek = localTime.getDay();  // Sunday = 0, Saturday = 6
  
  return dayOfWeek;
}

// This function is used to create a string from the array of integers such as ID's.  This string can then be inserted into a graphql query
// or mutation in the correct format. 
export function stringifyIntArray(intList){
	
	const listLen = intList.length;
	
	let mutation_text = "[";
	  
	for (var i = 0; i < listLen; i++){
		mutation_text += intList[i];

		// add a comma if there is more than 1 item in the array
		if (i < listLen - 1){
			mutation_text += ",";
		  }
	}
	
	mutation_text += "]"
  
	return mutation_text;

}