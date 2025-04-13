import * as fs from "fs";
import { config } from "../DiscordConfig";
class DB {
    constructor(path) {
        this.dbPath = path;
    }
    getChannelData() {
        const data = fs.readFileSync(this.dbPath, "utf-8");
        return JSON.parse(data);
    }
    saveChannelData(guildId, channelId, messageId) {
        const data = this.getChannelData();
        data[guildId] = {
            channelId,
            messageId
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(data));
    }
    deleteChannelData(guildId) {
        const data = this.getChannelData();
        delete data[guildId];
        fs.writeFileSync(this.dbPath, JSON.stringify(data));
    }
    getChannelId(guildId) {
        const data = this.getChannelData();
        return data[guildId]?.channelId;
    }
    getMessageId(guildId) {
        const data = this.getChannelData();
        return data[guildId]?.messageId;
    }
    hasChannel(guildId) {
        const data = this.getChannelData();
        return data[guildId] !== undefined;
    }
}
export default new DB(config.CHANNEL_DATA_PATH);
