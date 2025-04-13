import { ButtonInteraction } from "discord.js";
import { setEmbed } from "../../Utilities/HasSong";

export async function queue(interaction: ButtonInteraction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId as string);
    if (!player) return;
    player.data.set("qShow", !player.data.get("qShow"));
    await setEmbed(interaction.channel as any, interaction.guildId as string);
    interaction.deferUpdate();
}