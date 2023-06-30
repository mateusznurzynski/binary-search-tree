const mergeSort = function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  const leftHalf = array.slice(0, parseInt(array.length / 2));
  const rightHalf = array.slice(parseInt(array.length / 2), array.length);

  const leftSorted = mergeSort(leftHalf);
  const rightSorted = mergeSort(rightHalf);

  const leftSortedLength = leftSorted.length;
  const rightSortedLength = rightSorted.length;
  const totalLength = leftSortedLength + rightSortedLength;

  let leftIndex = 0;
  let rightIndex = 0;

  const resultArray = [];

  while (resultArray.length < totalLength) {
    if (leftIndex + 1 > leftSortedLength) {
      resultArray.push(rightSorted[rightIndex++]);
    } else if (rightIndex + 1 > rightSortedLength) {
      resultArray.push(leftSorted[leftIndex++]);
    } else if (leftSorted[leftIndex] < rightSorted[rightIndex]) {
      resultArray.push(leftSorted[leftIndex++]);
    } else {
      resultArray.push(rightSorted[rightIndex++]);
    }
  }

  return resultArray;
};

const removeDuplicates = (array) => {
  const lookupTable = {};
  const cleanArray = array.filter((element) => {
    if (lookupTable[element]) {
      return false;
    } else {
      lookupTable[element] = true;
      return true;
    }
  });
  return cleanArray;
};

export { mergeSort, removeDuplicates };
