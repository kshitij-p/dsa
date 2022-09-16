
//Optimized using DP tabulation
const editDistance = (string1, string2) => {
	let dp = [];

	//initialize table
	for (let i = 0; i < string1.length + 1; i++) {
		dp.push([]);
		for (let j = 0; j < string2.length + 1; j++) {
			dp[i].push(0);
		}
	}
	
	//check naive solution for explaination
	for (let i = 0; i < string1.length + 1; i++) {
		for (let j = 0; j < string2.length + 1; j++) {

			if (i === 0) {
				dp[i][j] = j;
			} else if (j === 0) {
				dp[i][j] = i;
			} else if (string1[i - 1] === string2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
			}
		}
	}

	return dp[string1.length][string2.length];

};

/**
 * Non optimized solution.
 * Optimized solution is given above this function
 * Note: The optimized solution can be further optimized for space - but to keep it simple its not written.
 * The above solution is suitable for processing strings under 2000 x 2000 size (over that array size limit is exceeded).
 * Another simple way to optmize would be memoization but tabulation is more performant in this case and simpler as well.
 * 
 * Calculated by comparing last letter of both strings and recursively solving other parts.
 * Optimized solution has the exact same logic inside its for loop as inside this function, 
 * except it uses an array to store and reference value instead of recursively solving.
 */
const editDistanceNaive = (string1, string2, m, n) => {

	//base case - if one of the strings is empty, only option is to dump the entire other string
	if (m === 0) {
		return n;
		//same as prev. base case
	} else if (n === 0) {
		return m;

		/**
		 * If last char is same, we can subtract both strings equally without adding any distance.
		 */
	} else if (string1[m - 1] === string2[n - 1]) {
		return editDistanceNaive(string1, string2, m - 1, n - 1);
	} else {
		/**
		 * If last char is not same, solve for every possible operation and increment the minimum of them by 1.
		 */
		return (
			1 +
			Math.min(
				editDistanceNaive(string1, string2, m, n - 1), //delete operation
				editDistanceNaive(string1, string2, m - 1, n), //add operation, we are subtracting from m in add because subtracing from m is same as adding to n in terms of distance added
				editDistanceNaive(string1, string2, m - 1, n - 1) 
				/** ^ replace operation - the only difference here 
				and in the prev. elif statement is that here we are incrementing the calc. value so distance is increased unlike in the former where dist is the same **/
			)
		);
	}
};
