const swap = (arr, index1, index2) => {
	let temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
};

const pivot = (arr, low, high) => {
	let pivot = arr[high];
	let newPos = low - 1;

	/* whenever our item is smaller than the pivot, increment newPos to make space for it in the 
    array then swap in into place */
	for (let i = low; i < high; i++) {
		if (arr[i] < pivot) {
			newPos++;
			swap(arr, newPos, i);
		}
	}

	/** At the end we end up at one spot before where the pivot should be at. So increment newPos and swap pivot(high is its index) to it. */
	newPos++;
	swap(arr, newPos, high);
	return newPos;
};

const quickSort = (arr, low = 0, high = arr.length - 1) => {
	if (low < high) {
		let pivotIndex = pivot(arr, low, high);

		quickSort(arr, low, pivotIndex - 1); //sort smaller elements
		quickSort(arr, pivotIndex + 1, high); //sort larger elements
	}

	return arr;
};
