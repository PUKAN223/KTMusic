import type { CommandInteraction } from "discord.js";

function ping(interaction: CommandInteraction) {
    interaction.reply("Pong!");
}

export default { callback: ping }