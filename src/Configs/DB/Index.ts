import * as fs from "fs"
import { config } from "../DiscordConfig";
import type ChannelData from "../../Interfaces/ChannelData";

class DB {
    private dbPath: string;
    constructor(path: string) {
        this.dbPath = path;
    }

    public getChannelData(): ChannelData {
        const data = fs.readFileSync(this.dbPath, "utf-8");
        return JSON.parse(data);
    }

    public saveChannelData(guildId: string, channelId: string, messageId: string) {
        const data = this.getChannelData();
        data[guildId] = {
            channelId,
            messageId
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(data));
    }

    public deleteChannelData(guildId: string) {
        const data = this.getChannelData();
        delete data[guildId];
        fs.writeFileSync(this.dbPath, JSON.stringify(data));
    }

    public getChannelId(guildId: string) {
        const data = this.getChannelData();
        return data[guildId]?.channelId;
    }

    public getMessageId(guildId: string) {
        const data = this.getChannelData();
        return data[guildId]?.messageId;
    }

    public hasChannel(guildId: string) {
        const data = this.getChannelData();
        return data[guildId] !== undefined;
    }
}

export default new DB(config.CHANNEL_DATA_PATH);