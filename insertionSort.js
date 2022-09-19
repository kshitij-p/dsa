const insertionSort = (arr, comp = (a, b) => a - b) => {
	if (arr.length <= 1) {
		return arr;
	}

	for (let i = 1; i < arr.length; i++) {
		let currValue = arr[i];
		let toCheck = i - 1;

		/* Check if toCheck is in its right place or not, if not 
         overwrite toCheck's right by toCheck, 
         and then continue checking until toCheck is 0  */
		while (comp(arr[toCheck], currValue) > 0 && toCheck >= 0) {
			arr[toCheck + 1] = arr[toCheck];
			toCheck--;
		}

		//we will end up at one place before the place we want to place our curr value at.
		arr[toCheck + 1] = currValue;
	}
	return arr;
};
