const swap = (arr, index1, index2) => {
	let temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
};

/* 
	Finds random between min (inclusive) and max (exclusive)
	Check out the Math.random page on MDN for how the math works. 
	*/
const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
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

/*
	In both popular implementations of partitioning around a pivot,
	random pivot can be obtained by swapping the item we normally use as pivot
	with a random item. Random pivoting helps avoid worst case where pivot is the smallest or largest el in the array.
*/
const randomPivot = (arr, low, high) => {
	let rand = getRandomInt(low, high);

	swap(arr, rand, high);
	return pivot(arr, low, high);
};

const quickSort = (arr, low = 0, high = arr.length - 1) => {
	if (low < high) {
		let pivotIndex = randomPivot(arr, low, high);

		quickSort(arr, low, pivotIndex - 1); //sort smaller elements
		quickSort(arr, pivotIndex + 1, high); //sort larger elements
	}

	return arr;
};
