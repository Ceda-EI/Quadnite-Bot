module.exports = (random, kys, default_text, bot_text, excluded_names) => (ctx) => {

	if (ctx.message.reply_to_message && !ctx.message.reply_to_message.is_topic_message) {

		const { from } = ctx.message.reply_to_message;
		const name = from.username ? "@" + from.username : from.first_name;
		if (name == excluded_names[0])
			return bot_text;
		return random(kys)().replace(/##name##/g, name);

	} else {

		const text_array = ctx.message.text.split(" ");
		if (text_array.length > 1) {

			const name = text_array.slice(1).reduce((i, j) => i + " " + j).trim();
			if (excluded_names.includes(name)
				|| excluded_names.includes("@" + name))
				return bot_text;

			return random(kys)().replace(/##name##/g, name);

		} else
			return default_text;

	}

};
