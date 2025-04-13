import { setEmbed } from "../../Utilities/HasSong";
export async function queue(interaction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId);
    if (!player)
        return;
    player.data.set("qShow", !player.data.get("qShow"));
    await setEmbed(interaction.channel, interaction.guildId);
    interaction.deferUpdate();
}
