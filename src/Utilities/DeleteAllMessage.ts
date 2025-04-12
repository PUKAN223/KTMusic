import { type Channel } from "discord.js";
import Logger from "./Logger";

export async function deleteAllMessages(channel: Channel, except?: string[]) {
    if (!channel?.isTextBased() || channel.isDMBased()) {
        throw new Error('This function can only be used in guild text channels or threads.');
    }

    try {
        const messages = (await channel.messages.fetch({ limit: 100 })).filter(x => !except?.some(a => x.id == a));

        if (messages.size === 0) return;

        try {
            await channel.bulkDelete(messages, true);
        } catch (error) {
            for (const msg of messages.values()) {
                try {
                    if (msg) {
                        await msg.delete();
                    }
                } catch (err) {
                }
            }
        }
    } catch (error) {
        Logger.error(error as string);
        process.exit(1);
    }
}