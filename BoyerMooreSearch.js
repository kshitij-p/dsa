/* 
	Bad char table tells us how much we need to shift to our search by.
	Initialised at 256 because we are allowing to search upto 255 charcode chars max 
	(You can use a hash map for not having to deal with this and modify search to not call charcodeat).

	Filled by iterating through pattern and for every character, inserting the index its on to the apt. place in our table.
	(Duplicates are thus overrwritten i.e. meow would have o as 2 and meoow would have o as 3)
*/
const getBadCharTable = (pattern) => {
	let table = new Array(256).fill(-1);

	for (let i = 0; i < pattern.length; i++) {
		table[pattern[i].charCodeAt(0)] = i;
	}

	return table;
};

/* Searches for substrings using a bad match table (explained above) in O(n + m) worst case and O(n/2) best case time.
    We iteratote through the string checking starting from pattern.length-1 (currChar) + shift(initially 0)
    for pattern match from the end of pattern i.e. we move right to left checking for pattern.

    If we do not reach the first character of the pattern then we need to shift.
    Shift += ( currChar - badMatch[text[shift + currChar]] ) or 1, whichever is bigger. (sometimes this value can be negative and we dont want to go back)
    (If we dont get a match, we shift our search by looking up in the bad match table for the value of the 
        item we were comparing (shift + currChar). The subtraction part is for alignment )
        
    If we reach end i.e. first character of the pattern:
    return shift as thats the occurence index if we are only finding one item, else we shift by incrementing with 
    pattern.length (the whole length not the index val (p.length - 1)):
    shift += If shift + p.length > text.length, only increment by 1 (this case is handle when pattern is found at the end of the text)
    else: p.length - badChar[text[shift+p.length]]
    (Same logic as above shift, except here we shift using p.length as increment instead of currChar to reset our search. Naturally we subtract using the same.)

*/
const BoyerMooreSearch = (text, pattern, findAll = false, charTable = []) => {
	if (text.length < pattern.length) {
		return -1;
	}

	let badCharTable = !charTable.length ? getBadCharTable(pattern) : charTable;

	let shift = 0;
	let results = [];

	while (shift <= text.length - pattern.length) {
		let currChar = pattern.length - 1;

		while (currChar >= 0 && pattern[currChar] === text[currChar + shift]) {
			currChar--;
		}

		if (currChar < 0) {
			if (!findAll) {
				return shift;
			}
			results.push(shift);

			//like below but shift using patter.length because we want to reset
			shift +=
				shift + pattern.length < text.length
					? pattern.length - badCharTable[text[pattern.length + shift].charCodeAt(0)]
					: 1;
		} else {
			//look up currChar and increment shift by it.
			shift += Math.max(1, currChar - badCharTable[text[currChar + shift].charCodeAt(0)]);
		}
	}

	return results.length ? results : -1;
};
