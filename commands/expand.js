function expand(words, text) {

	const letters = text.trim().toLowerCase().split("");
	// Build a dictionary with lowercase letters as keys
	const dict = {};
	words.forEach(word => {

		if (word == "")
			return;
		const initial = word.split("")[0].toLowerCase();
		if (initial in dict)
			dict[initial].push(word);
		else
			dict[initial] = [word];

	});
	return letters.map((letter) => {

		if (!(letter.toLowerCase() in dict))
			return letter;
		const wordsWithLetter = dict[letter.toLowerCase()];
		const word = wordsWithLetter[Math.floor(Math.random() * wordsWithLetter.length)];
		return word;

	}).reduce((acc, cur) => acc + " " + cur).replace(/\s{2,}/g, " ");

}


module.exports = (words = []) => (ctx) => {

	words = words.filter(i => ! i.match(/'s$/));
	const message = ctx.message.text.replace(/^[^ ]+/, "");
	if (message) {

		return expand(words, message);

	} else {

		if (ctx.message.reply_to_message && !ctx.message.reply_to_message.is_topic_message)
			return expand(words, ctx.message.reply_to_message.text);
		else
			return "Need text to expand. Send /expand text or reply to a "
			+ "message with /expand";

	}

};
