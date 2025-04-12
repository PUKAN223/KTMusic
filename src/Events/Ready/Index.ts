import DB from "../../Configs/DB/Index";
import { client, startedTime } from "../../Index";
import Logger from "../../Utilities/Logger";
import { registerCommands } from "../../Utilities/RegisterCommands";
import { setEmbed } from "../../Utilities/Setup";

client.once("ready", (client) => {
    Logger.start(`${client.user?.tag} is ${"online!".green}`);
    Logger.time(`${client.user?.tag} is ready in ${String(Date.now() - startedTime).green}${"ms".gray}`);
    registerCommands(client);
    const guildIds = DB.getChannelData()
    for (const guildId of Object.keys(guildIds)) {
        const channelId = DB.getChannelId(guildId);
        const channel = client.channels.cache.get(channelId as string);
        if (channel) {
            setEmbed(channel, guildId);
        } else {
            DB.deleteChannelData(guildId);
            Logger.warn(`Channel ${channelId} not found, deleted from DB.`);
        }
    }
})