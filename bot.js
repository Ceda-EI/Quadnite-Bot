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
    // default config: 5 messages per 5 seconds
    timeFrame: RATE_TIMEFRAME ?? 5000,
    limit: RATE_LIMIT ?? 5,

    onLimitExceeded: (ctx, next) => ctx.reply('Too many requests!'),
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
