module.exports = (bot, feedback_id) => (ctx) => {

	const message = ctx.message.text.replace(/^[^ ]+/, "");
	if (message) {

		const from = ctx.message.from;
		let contactable = "The developer might contact you regarding your feedback.";
		let message;
		if (from.username) {

			message = `Feedback from: @${from.username}`;

		} else {

			contactable = "The developer might not be able to contact you due to lack of your username.";
			message = `Feedback from User ${from.id}`;

		}
		bot.telegram.sendMessage(feedback_id, `${message} ${ctx.message.text}`).catch(console.log);
		return `Thanks for the feedback! ${contactable}`;

	} else {

		return "To send feedback type in /feedback followed by the feedback. Note that developers may contact you regarding the feedback.";

	}

};
