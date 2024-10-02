const { Telegraf } = require("telegraf");
const { BOT_API_KEY, FEEDBACK_ID, UGOKI_ROOT, RATE_TIMEFRAME, RATE_LIMIT } = process.env;
const fs = require("fs").promises;
const commands = require("./commands");
const axios = require("axios");
const roleplay = require("./static/roleplay.json");
const { limit } = require("@grammyjs/ratelimiter");

const bot = new Telegraf(BOT_API_KEY);
bot.catch((err) => console.log(err));
bot.use(limit({
	// default config: 1 message per 1 second
	timeFrame: RATE_TIMEFRAME ?? 1000,
	limit: RATE_LIMIT ?? 1,
	keyGenerator: (ctx) => ctx.chat?.id.toString() ?? ctx.from?.id.toString(),
}))

const data = [
	"questions",
	"kys",
	"insults",
	"commands_list",
	"words"
].map(file =>
	fs.readFile("static/" + file + ".txt", "utf-8")
		.then(list =>
			list.split("\n")));

Promise.all(data)
	.then(data =>
		commands(bot, [...data, roleplay], FEEDBACK_ID, BOT_API_KEY, UGOKI_ROOT, axios));

bot.launch();
