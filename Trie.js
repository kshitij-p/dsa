class TrieNode {
	constructor() {
		this.props = {
			isWord: false,
		};
	}
}

/**
 * Implemented using Object instead of array for ease of development and saving memory.
 */
class Trie {
	constructor() {
		this.root = {};
	}

	insert(word) {
		if (!word) {
			return;
		}

		let iterator = this.root;

		for (let i = 0; i < word.length; i++) {
			let currLtr = word[i];

			if (!iterator[currLtr]) {
				iterator[currLtr] = new TrieNode();
			}

			if (i === word.length - 1) {
				iterator[currLtr].props.isWord = true;
			}

			iterator = iterator[currLtr];
		}

		return this.root;
	}

	search(word) {
		if (!word.length) {
			return;
		}

		let iterator = this.root;

		for (let i = 0; i < word.length; i++) {
			let currLtr = word[i];

			if (!iterator[currLtr]) {
				return false;
			}

			if (i === word.length - 1 && !iterator[currLtr].props.isWord) {
				return false;
			}

			iterator = iterator[currLtr];
		}

		return true;
	}

	getKeys(node) {
		if (!Object.keys(node)?.length) {
			return [];
		}

		return Object.keys(node).filter((key) => key !== 'props');
	}

	/* DFS is used here */
	getAllWords(node = this.root, results = [], word = '') {
		let keys = this.getKeys(node);

		if (node !== this.root) {
			if (node.props.isWord) {
				results.push(word);
			}
		}

		for (let key of keys) {
			this.getAllWords(node[key], results, word + key);
		}

		return results;
	}

	allWithPrefix(prefix) {
		let iterator = this.root;

		for (let i = 0; i < prefix.length; i++) {
			let currLtr = prefix[i];

			if (!iterator[currLtr]) {
				return [];
			}

			if (i === prefix.length - 1) {
				return this.getAllWords(iterator[currLtr], [], prefix);
			}

			iterator = iterator[currLtr];
		}
	}
}

export default Trie;
