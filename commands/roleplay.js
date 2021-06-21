function joinUsers(users) {

	if (users.length == 1)
		return users[0];
	return users.slice(0, users.length - 1).join(", ")
		+ ` and ${users[users.length - 1]}`;

}


module.exports = (forms, gifs) => (ctx) => {

	const gif = gifs[Math.floor(Math.random() * gifs.length)];
	const message = ctx.message.text.replace(/^[^ ]+\s*/, "")
		.match(/^((@\w+(\s+|$))*)(.*)/);
	const users = message[1].trim().split(" ").filter(i => i.length);
	const reason = message[4];
	let reply = "";
	const from = ctx.message.from;
	const user = from.username ? "@" + from.username : from.first_name;
	if (users.length > 0 && reason.length > 0)
		reply = forms.both
			.replace("{}", user)
			.replace("{}", joinUsers(users))
			.replace("{}", reason);
	else if (users.length > 0)
		reply = forms.others
			.replace("{}", user)
			.replace("{}", joinUsers(users));
	else if (reason.length > 0)
		reply = forms.reason
			.replace("{}", user)
			.replace("{}", reason);
	else
		reply = forms.none
			.replace("{}", user);

	ctx.replyWithAnimation(gif, {caption: reply});

};
