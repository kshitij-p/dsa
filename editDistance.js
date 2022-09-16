/*
	Space optimized solution.
	Unlike editDistanceDP, the row count is only 2 here, bringing down space complexity to O(str2.length).

	Logic:
		Like editDistanceDP, a 2x2 sliding matrix with curr el to fill being at the bottom/top-right is created and 
		its filled by finding the minimum of the rest of the values and incrementing it by.

	Implementation Details:
		We find which row to fill by i % 2 since that always returns 0 or 1.
		The index used for comparing last letter is swapped i.e. j for str1 instead of i for str1.
		The loop starts from i=1 coz we already filled the first row and goes upto str2.length because thats the number of passes required to get 
		out final value.
*/
const editDistance = (string1, string2) => {
	let dp = new Array(2);

	//initialize table but fill the fill the first row with j. So the first row is like 0,1,2,3,4...
	for (let i = 0; i < dp.length; i++) {
		dp[i] = new Array(string1.length + 1);
		for (let j = 0; j < string1.length + 1; j++) {
			if (i === 0) {
				dp[i][j] = j;
			} else {
				dp[i][j] = 0;
			}
		}
	}

	//We start here since 1st row is filled and iterate upto str2.length because thats the number of passes required.
	for (let i = 1; i < string2.length + 1; i++) {
		//upto str1.length because thats the no. of cols we have.
		for (let j = 0; j < string1.length + 1; j++) {
			if (j === 0) {
				dp[i % 2][j] = i;
			} else if (string1[j - 1] === string2[i - 1]) {
				dp[i % 2][j] = dp[(i - 1) % 2][j - 1];
			} else {
				dp[i % 2][j] = 1 + Math.min(dp[(i - 1) % 2][j], dp[i % 2][j - 1], dp[(i - 1) % 2][j - 1]);
			}
		}
	}

	return dp[string2.length % 2][string1.length];
};

//Optimized using DP tabulation
const editDistanceDP = (string1, string2) => {
	let dp = [];

	//initialize table
	for (let i = 0; i < string1.length + 1; i++) {
		dp.push([]);
		for (let j = 0; j < string2.length + 1; j++) {
			dp[i].push(0);
		}
	}

	/* 
		check naive solution for basic explaination.
		The tabulation works by checking the element above, to the left and to its upper left diagonal and taking their min 
		and incrementing it instead of calculating recursively.
		0, 1                   0, 1
		3, dp[i][j] becomes    3, 2     (since 1 is the smallest and we increment it by)
        --------------------------------

		Thus a sliding 2x2 matrix is created where the curr el to set is always at the bottom-right corner.

		The space optimized DP solution does the exact same thing as above but only uses two rows.
		This is possible because as seen above, we only require 1 row to be filled to calculate others.
	*/
	for (let i = 0; i < string1.length + 1; i++) {
		for (let j = 0; j < string2.length + 1; j++) {
			if (i === 0) {
				dp[i][j] = j;
			} else if (j === 0) {
				dp[i][j] = i;

				//check first character since we are going iteratively
			} else if (string1[i - 1] === string2[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
			}
		}
	}

	return dp[string1.length][string2.length];
};

/*
  Non optimized solution.
  Optimized solution is given above this function
  The above solution is suitable for processing strings under 2000 x 2000 size (over that array size limit is exceeded).
  Another simple way to optmize would be memoization but tabulation is more performant in this case and simpler as well.
  
  Calculated by comparing last letter of both strings and recursively solving other parts.
  Optimized solution has the exact same logic inside its for loop as inside this function, 
  except it uses an array to store and reference value instead of recursively solving.
 */
const editDistanceNaive = (string1, string2, m = string1.length, n = string2.length) => {
	//base case - if one of the strings is empty, only option is to dump the entire other string
	if (m === 0) {
		return n;
		//same as prev. base case
	} else if (n === 0) {
		return m;

		/*
		  If last char is same, we can subtract both strings equally without adding any distance.
		 */
	} else if (string1[m - 1] === string2[n - 1]) {
		return editDistanceNaive(string1, string2, m - 1, n - 1);
	} else {
		/*
		 * If last char is not same, solve for every possible operation and increment the minimum of them by 1.
		 */
		return (
			1 +
			Math.min(
				editDistanceNaive(string1, string2, m, n - 1), //delete operation
				editDistanceNaive(string1, string2, m - 1, n), //add operation, we are subtracting from m in add because subtracing from m is same as adding to n in terms of distance added
				editDistanceNaive(string1, string2, m - 1, n - 1)
				/* ^ replace operation - the only difference here 
				and in the prev. elif statement is that here we are incrementing the calc. value so distance is increased unlike in the former where dist is the same */
			)
		);
	}
};
