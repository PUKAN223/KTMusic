import { Channel } from "diagnostics_channel";
import { client } from "../../Index";
import { TextChannel } from "discord.js";
import * as HasSong from "../../Utilities/HasSong";
import * as SetUp from "../../Utilities/Setup";
import DB from "../../Configs/DB/Index";
import Logger from "../../Utilities/Logger";

client.managers.on("playerCreate", (player) => {
    player.data.set("playedTracks", []);
    player.data.set("currentArtist", null);
    player.data.set("playedArtists", []);
    player.data.set("autoplay", false);
});

setInterval(async () => {
    if (!client.isReady()) return;
    const guildIds = DB.getChannelData();
    for (const guildId of Object.keys(guildIds)) {
        const channelId = DB.getChannelId(guildId);
        const channel = client.channels.cache.get(channelId as string) as TextChannel;
        if (channel) {
            const player = client.managers.getPlayer(guildId);
            if (!player) return;
            if (player.playing || player.paused) {
                await HasSong.setEmbed(channel, guildId);
            } else {
                await SetUp.setEmbed(channel, guildId);
            }
        } else {
            DB.deleteChannelData(guildId);
        }
    }
}, 1000);