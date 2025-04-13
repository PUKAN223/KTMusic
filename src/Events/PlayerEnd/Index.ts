import { Channel } from "discord.js";
import { client } from "../../Index";
import { setEmbed } from "../../Utilities/Setup";
import Logger from "../../Utilities/Logger";

const updateEmbed = async (player: any) => {
    const channel = client.channels.cache.get(player.textId as string) as Channel;
    if (channel) await setEmbed(channel, player.guildId);
};

const handleAutoplay = async (player: any) => {
    const lastTrack = player.queue.previous[0];
    if (!lastTrack) return false;

    const searchResult = await player.search(
        `https://www.youtube.com/watch?v=${lastTrack.identifier}&list=RD${lastTrack.identifier}`,
        { source: 'youtube', requester: lastTrack.requester }
    );

    if (!searchResult?.tracks?.length) return false;

    player.queue.add(searchResult.tracks[1]);
    await player.play();
    return true;
};

client.managers.on("playerEmpty", async (player) => {
    try {
        if (player.queue.length > 0) {
            await player.play();
            await updateEmbed(player);
            return;
        }

        if (player.data.get("autoplay") && await handleAutoplay(player)) {
            await updateEmbed(player);
            return;
        }

        await updateEmbed(player);
    } catch (error) {
        Logger.error(`PlayerEmpty error: ${error}`);
        player.destroy();
    }
});

client.managers.on("playerDestroy", async (player) => {
    Logger.info("Player Destroy");
    const channel = client.channels.cache.get(player.textId as string) as Channel;
    if (!channel) return;

    player.data.clear();
    player.queue.clear();
    await setEmbed(channel, player.guildId);
});

client.managers.on("playerClosed", (player) => {
    Logger.info("Player Closed");
    player.destroy();
});

client.managers.on("playerException", async (player, error) => {
    Logger.error(`Player exception: ${error}`);
    await updateEmbed(player);
});