const { Telegraf } = require("telegraf");
const { BOT_API_KEY, FEEDBACK_ID, UGOKI_ROOT } = process.env;
const fs = require("fs").promises;
const commands = require("./commands");
const axios = require("axios");
const roleplay = require("./static/roleplay.json");

const bot = new Telegraf(BOT_API_KEY);
bot.catch((err) => console.log(err));

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
