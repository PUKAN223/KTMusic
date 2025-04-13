import { client } from "../../Index";
import { setEmbed } from "../../Utilities/HasSong";
import Logger from "../../Utilities/Logger";
client.managers.on("queueUpdate", async (player) => {
    Logger.info("Queue Update");
    const channel = client.channels.cache.get(player.textId);
    if (!channel)
        return;
    // Add small delay to ensure queue state is updated
    await new Promise(resolve => setTimeout(resolve, 100));
    await setEmbed(channel, player.guildId);
});
client.managers.on("playerUpdate", async (player) => {
    if (!player || player.queue.current == undefined)
        return;
    const channel = client.channels.cache.get(player.textId);
    if (!channel)
        return;
    await setEmbed(channel, player.guildId);
});
