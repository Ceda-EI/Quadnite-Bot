function absurdify(text) {

	const text_array = text.split("");
	return text_array.map((character) =>
		Math.random() > 0.5 ? character.toLowerCase(): character.toUpperCase())
		.join("");

}

module.exports = () => (ctx) => {

	const message = ctx.message.text.replace(/^[^ ]+/, "");
	if (message) {

		return absurdify(message);

	} else {

		if (ctx.message.reply_to_message && !ctx.message.reply_to_message.is_topic_message)
			return absurdify(ctx.message.reply_to_message.text);
		else
			return "Need text to absurdify. Send /absurdify text or reply to a"
			+ "message with /absurdify";

	}

};
