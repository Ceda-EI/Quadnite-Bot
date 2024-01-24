function weebify(text) {

	const dict = {
		a : "卂",
		b : "乃",
		c : "匚",
		d : "刀",
		e : "乇",
		f : "下",
		g : "厶",
		h : "卄",
		i : "工",
		j : "丁",
		k : "长",
		l : "乚",
		m : "从",
		n : "𠘨",
		o : "口",
		p : "尸",
		q : "㔿",
		r : "尺",
		s : "丂",
		t : "丅",
		u : "凵",
		v : "リ",
		w : "山",
		x : "乂",
		y : "丫",
		z : "乙"
	};
	const text_array = text.toLowerCase().split("");
	return text_array.map((character) =>
		dict[character] ? dict[character] : character)
		.join("");

}

module.exports = () => (ctx) => {

	const message = ctx.message.text.replace(/^[^ ]+/, "");
	if (message) {

		return weebify(message);

	} else {

		if (ctx.message.reply_to_message && !ctx.message.reply_to_message.is_topic_message)
			return weebify(ctx.message.reply_to_message.text);
		else
			return "Need text to weebify. Send /weebify text or reply to a "
			+ "message with /weebify";

	}

};
