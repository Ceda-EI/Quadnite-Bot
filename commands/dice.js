function diceRoll(side) {

	return Math.ceil(Math.random() * side);

}
module.exports = () => async (ctx) => {

	const numDice = parseInt(ctx.match[1] || "1");
	const diceSides = parseInt(ctx.match[2]);
	const rolls = Array(numDice)
		.fill(0)
		.map(() => diceRoll(diceSides));
	const total = rolls.reduce((acc, curr) => acc + curr, 0);
	const message = rolls
		.map((i) => `_You roll a_ *D${diceSides}* _and get a_ *${i}*`)
		.join("\n");
	let totalMessage = "";
	if (numDice > 1 || ctx.match[3])
		totalMessage = `*Total:* ${total}`;

	if (ctx.match[3]) {

		const modifier = parseInt(ctx.match[5]);
		const sign = ctx.match[4];
		if (sign === "+") totalMessage += ` + ${modifier} = ${total + modifier}`;
		else totalMessage += ` - ${modifier} = ${total - modifier}`;

	}
	ctx.reply(message + "\n\n" + totalMessage, { parse_mode: "Markdown" });

};
