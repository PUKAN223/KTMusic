import { Channel, TextChannel } from "discord.js";
import { client } from "../../Index";
import { setEmbed } from "../../Utilities/HasSong";
import { KazagumoTrack } from "kazagumo";

client.managers.on("playerClosed", (player) => {
    player.destroy();
});

client.managers.on("playerEmpty", async (player) => {
    const lastTrack = player.queue.previous[0];

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
    player.play();
    setEmbed(client.channels.cache.get(player.textId as string) as Channel, player.guildId);
});

client.managers.on("playerDestroy", (player) => {
    player.data.clear();
    player.queue.clear();
    setEmbed(client.channels.cache.get(player.textId as string) as Channel, player.guildId);
});