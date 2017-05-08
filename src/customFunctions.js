// Returns an object from a provided id from an array of objects
export const getObjectById = (id, objects) => {
        let arrayOfObjectIds = objects.map(object => object.id);
        let indexOfId = arrayOfObjectIds.indexOf(id);
        return objects[indexOfId];
    }

// Takes a milestone array and creates a new array that only includes milestones in a specified level
export const filterArrayByLevel = (array, level) => {
  let newArr = array.filter((item) => {
     return item.level === level ? true : false;
  });
  return newArr;
}

// Takes creates an array of milestone arrays that are ordered by level
export const reformatArrayByLevel = (array, numberOfLevels) => {
  var newArray = []
  for (var i=0; i < 5; i++) {
    newArray[i] = filterArrayByLevel(array, i+1);
  }
  return newArray;
}

// Normalizes the object provided by scaphold.io to remove node keys
export const normalizeNode = (nodeArray) => {
      let normalizedObject = nodeArray.map(({node}) => node);
      return normalizedObject;
  }