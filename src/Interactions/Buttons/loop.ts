import { ButtonInteraction } from "discord.js";
import { setEmbed } from "../../Utilities/HasSong";

export async function loop(interaction: ButtonInteraction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId as string);
    if (!player) return;
    player.setLoop(player.loop === "none" ? "queue" : "none");
    await setEmbed(interaction.channel as any, interaction.guildId as string);
    interaction.deferUpdate();
}