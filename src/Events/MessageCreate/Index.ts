import { client } from "../../Index";
import DB from "../../Configs/DB/Index"
import play from "../../Interactions/Message/play";

client.on("messageCreate", (msg) => {
    if (msg.author.bot) return;
    const targetChannelId = DB.getChannelId(msg.guildId as string);
    if (msg.channelId == targetChannelId) {
        play.callback(msg);
    }
})