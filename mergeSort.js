//Performs the merging step
const merge = (leftHalf, rightHalf) => {
	let result = [];

	let leftStart = 0;
	let rightStart = 0;

	while (leftStart < leftHalf.length && rightStart < rightHalf.length) {
		let leftEl = leftHalf[leftStart];
		let rightEl = rightHalf[rightStart];

		if (leftEl <= rightEl) {
			result.push(leftEl);
			leftStart++;
		} else {
			result.push(rightEl);
			rightStart++;
		}
	}

	while (leftStart < leftHalf.length) {
		result.push(leftHalf[leftStart]);
		leftStart++;
	}

	while (rightStart < rightHalf.length) {
		result.push(rightHalf[rightStart]);
		rightStart++;
	}

	return result;
};

const mergeSort = (inputArray) => {
	//handle edge cases
	if (inputArray.length <= 1) {
		return inputArray;
	}

	let leftHalf = [];
	let rightHalf = [];

	for (let i = 0; i < Math.floor(inputArray.length / 2); i++) {
		leftHalf.push(inputArray[i]);
	}

	for (let j = Math.floor(inputArray.length / 2); j < inputArray.length; j++) {
		rightHalf.push(inputArray[j]);
	}

	return merge(mergeSort(leftHalf), mergeSort(rightHalf));
};

export default mergeSort;
