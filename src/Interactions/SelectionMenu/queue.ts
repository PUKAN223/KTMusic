import type { StringSelectMenuInteraction } from "discord.js";
import { setEmbed } from "../../Utilities/HasSong";
import Logger from "../../Utilities/Logger";

export async function queue(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.deferUpdate().catch(() => { });

        const player = interaction.client.managers.getPlayer(interaction.guildId as string);
        if (!player) return;
        if (interaction.values[0] === "69") return;

        const selectedIndex = parseInt(interaction.values[0]);
        const selectedTrack = player.queue[selectedIndex];

        if (!selectedTrack) {
            Logger.error("Selected track not found in queue");
            return;
        }

        const track = player.queue[parseInt(interaction.values[0])];
        player.queue.remove(parseInt(interaction.values[0]));
        await player.play(track);
        player.data.set("qShow", false);
        await setEmbed(interaction.channel as any, interaction.guildId as string);

    } catch (error) {
        Logger.error(`Queue selection error: ${error}`);
    }
}
