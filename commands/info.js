module.exports = () => (ctx) => {

	let text = "";
	const msg = ctx.message;
	text += `Message ID: \`${msg.message_id}\`\n`;
	text += `Chat ID: \`${msg.chat.id}\`\n`;
	text += `User ID: \`${msg.from.id}\`\n`;
	if (ctx.message.reply_to_message && !ctx.message.reply_to_message.is_topic_message) {

		const reply = msg.reply_to_message;
		text += "\n*Reply to*\n";
		text += `Message ID: \`${reply.message_id}\`\n`;
		text += `Chat ID: \`${reply.chat.id}\`\n`;
		text += `User ID: \`${reply.from.id}\`\n`;

		if (reply.forward_from || reply.forward_from_chat) {

			const forward = reply.forward_from ? reply.forward_from
				:reply.forward_from_chat;
			text += "\n*Forward from*\n";
			if (reply.forward_from)
				text += "User ID: ";
			else
				text += "Channel ID: ";
			text += `\`${forward.id}\`\n`;
			text += "Message Date: `";
			const date = new Date(reply.forward_date*1000);
			text += date.toUTCString();
			text += "`";

		}

	}
	return text;

};
