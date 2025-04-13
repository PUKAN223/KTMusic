import { client } from "../../Index";
import { setEmbed } from "../../Utilities/Setup";
import Logger from "../../Utilities/Logger";
client.managers.on("playerEmpty", async (player) => {
    Logger.info("Player Empty");
    const channel = client.channels.cache.get(player.textId);
    if (!channel)
        return;
    if (!player.data.get("autoplay")) {
        await setEmbed(channel, player.guildId);
        return;
    }
    try {
        const lastTrack = player.queue.previous[0];
        if (!lastTrack) {
            player.destroy();
            return;
        }
        const searchResult = await player.search(`https://www.youtube.com/watch?v=${lastTrack.identifier}&list=RD${lastTrack.identifier}`, {
            source: 'youtube',
            requester: lastTrack.requester
        });
        if (!searchResult || !searchResult.tracks.length) {
            player.destroy();
            return;
        }
        const nextTrack = searchResult.tracks[1];
        player.queue.add(nextTrack);
        await player.play();
        await setEmbed(channel, player.guildId);
    }
    catch (error) {
        Logger.error("Error in playerEmpty handler: " + error);
        player.destroy();
    }
});
client.managers.on("playerDestroy", async (player) => {
    Logger.info("Player Destroy");
    const channel = client.channels.cache.get(player.textId);
    if (!channel)
        return;
    player.data.clear();
    player.queue.clear();
    await setEmbed(channel, player.guildId);
});
client.managers.on("playerClosed", (player) => {
    Logger.info("Player Closed");
    player.destroy();
});
