import { ActionRowBuilder, ButtonBuilder, Colors, EmbedBuilder, TextBasedChannel, TextChannel, type Channel } from "discord.js";
import { deleteAllMessages } from "./DeleteAllMessage";
import DB from "../Configs/DB/Index"

export async function setEmbed(channel: Channel, guildId: string) {
    if (!channel) return;
    const messageId = DB.getMessageId(guildId);
    if (!messageId) {
        const loadingEmbeds = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setDescription("Loading...")
            .setTimestamp();
        const message = await (channel as TextChannel).send({ embeds: [loadingEmbeds] });
        await deleteAllMessages(channel, [message.id]);
        const msgId = await uiChannels(channel as TextBasedChannel, message.id);
        DB.saveChannelData(guildId, channel.id, msgId);
    } else {
        await deleteAllMessages(channel, [messageId]);
        await uiChannels(channel as TextBasedChannel, messageId);
    }
}

async function uiChannels(channel: TextBasedChannel, messageId: string) {
    const uiChannels = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setAuthor(
            {
                name: "Music Controller",
                iconURL: "https://cdn.discordapp.com/emojis/1360668061463609524.webp?size=44"
            }
        )
        .addFields(
            {
                name: "",
                value: "Type the song name in this channel to play the song"
            },
            {
                name: "",
                value: "พิมชื่อเพลงลงในช่องนี้เพื่อเล่นเพลง"
            }
        )
        .setImage("https://cdn.discordapp.com/attachments/989165681608105994/1360482647092101160/image.png?ex=67fb47b3&is=67f9f633&hm=1044f0eeedcf48d4de86d5b479fe46b4234aca136fa578bd66249935a6634d52&")
        .setTimestamp();

    await channel.messages.cache.get(messageId)?.edit({ embeds: [uiChannels], components: [] });
    return messageId;
}