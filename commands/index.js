const random = require("./random");
const insults_fun = require("./insult");
const words_fun = require("./words");
const is = require("./is");
const weebify = require("./weebify");
const absurdify = require("./absurdify");
const feedback = require("./feedback");
const media_wiki = require("./media_wiki");
const info = require("./info");
const expand = require("./expand");
const roleplay = require("./roleplay");
const suggest = require("./suggest");
const dice = require("./dice");

module.exports = (bot, [ questions, kys, insults, commands_list, words, roleplay_data ], feedback_id, apiToken, ugokiRoot, axios) => {

	bot.command("question", (ctx) => ctx.reply(random(questions)()));
	bot.command("word", (ctx) => ctx.reply(random(words)()));
	bot.command("words", (ctx) => ctx.reply(words_fun(random, words)(ctx)));
	bot.telegram.getMe()
		.then(bot_user => {

			const default_text = (command, text) => `Do you want to ${text} `
				+ `yourself?\nIf no, reply to someone with /${command} to kill`
				+ ` them or run /${command} username/name.\nYou can suggest `
				+ `more /${command} replies using /feedback`;

			bot.command("insult", (ctx) => ctx.reply(insults_fun(random,
				insults, default_text("insult", "insult"), "Watch who you talk"
				+ " to.", ["@" + bot_user.username, bot_user.firstName])(ctx)));

			bot.command("kys", (ctx) => ctx.reply(insults_fun(random, kys,
				default_text("kys", "kill"), "I can't be killed.",
				["@" + bot_user.username, bot_user.firstName])(ctx)));

		});

	bot.command("commands", (ctx) => ctx.reply(commands_list.join("\n"), {parse_mode: "html"}));
	bot.command("is", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("are", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("can", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("will", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("shall", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("was", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("do", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("does", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("did", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("should", (ctx) => ctx.reply(is(random)(ctx)));
	bot.command("coin", (ctx) => ctx.reply(random(["Heads", "Tails"])()));
	bot.command("help", (ctx) => ctx.reply("You can either check /commands "
		+ "for a short overview or check the [Help Page]"
		+ "(https://t.me/quadnite/9).", {parse_mode: "Markdown"}));
	bot.command("rate", (ctx) => ctx.reply("[Vote for me on Telegram "
		+ "Directory!](https://t.me/tgdrbot?start=quadnite_bot)", {parse_mode:
			"Markdown"}));
	bot.command("weebify", (ctx) => ctx.reply(weebify()(ctx)));
	bot.command("absurdify", (ctx) => ctx.reply(absurdify()(ctx)));
	bot.command("feedback", (ctx) => ctx.reply(feedback(feedback_id)(ctx)));
	bot.command("wiki", (ctx) => media_wiki(axios,
		"https://en.wikipedia.org/w/api.php")(ctx).then(x => ctx.reply(x,
		{parse_mode: "HTML"})));
	bot.command("arch_wiki", (ctx) => media_wiki(axios,
		"https://wiki.archlinux.org/api.php")(ctx).then(x => ctx.reply(x,
		{parse_mode: "HTML"})));
	bot.command("info", (ctx) => ctx.reply(info()(ctx), {parse_mode: "Markdown"}));
	bot.command("expand", (ctx) => ctx.reply(expand(words)(ctx)));
	bot.command("start", (ctx) => ctx.reply("Hi, I am Quadnite. If you are "
		+ "chatting with me in private, you are most likely doing it wrong. "
		+ "Add me to a group for fun. To give feedback, use /feedback"));
	bot.command("donate", (ctx) => ctx.reply("Thanks for considering to donate."
		+ " To support the development and hosting of Quadnite Bot, you can "
		+ "donate here: https://liberapay.com/ceda_ei/"));
	bot.hears(/^\/?(\d*)d(\d+)(@\w+)?(\s*([-+])\s*(\d+))?$/i, dice());

	function getGetGif(command) {

		const alias = roleplay_data[command].alias;
		if (alias)
			return getGetGif(alias);

		return () => axios.get(
			`category/${command}/gif`,
			{
				baseURL: ugokiRoot
			}
		);

	}

	function getForms(name) {

		if (roleplay_data[name].forms)
			return roleplay_data[name].forms;
		return getForms(roleplay_data[name].alias);

	}

	// Add all roleplay commands
	Object.keys(roleplay_data).map(command =>
		bot.command(command,
			(ctx) => roleplay(getForms(command), getGetGif(command))(ctx)
		)
	);

	bot.command("suggest", (ctx) => suggest(axios, apiToken, ugokiRoot)(ctx));

};
