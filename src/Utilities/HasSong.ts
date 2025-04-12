import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, TextBasedChannel, TextChannel, User, type Channel } from "discord.js";
import { deleteAllMessages } from "./DeleteAllMessage";
import DB from "../Configs/DB/Index"
import { client } from "../Index";
import { KazagumoTrack } from "kazagumo";

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
        const msgId = await uiChannels(channel as TextChannel, message.id);
        DB.saveChannelData(guildId, channel.id, msgId);
    } else {
        await deleteAllMessages(channel, [messageId]);
        await uiChannels(channel as TextChannel, messageId);
    }
}

async function uiChannels(channel: TextChannel, messageId: string) {
    const players = client.managers.getPlayer(channel.guild.id as string);
    const currentSong = players?.queue.current as KazagumoTrack;

    const pRSTYLE = players?.paused ? ButtonStyle.Primary : ButtonStyle.Success;
    const aTSTYLE = players?.data.get("autoplay") ? ButtonStyle.Success : ButtonStyle.Secondary;
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('previous')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1360666952082657593'),
            new ButtonBuilder()
                .setCustomId('pause')
                .setStyle(pRSTYLE)
                .setEmoji('1360666753776226425'),
            new ButtonBuilder()
                .setCustomId('skip')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1360666751364366477'),
            new ButtonBuilder()
                .setCustomId('stop')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('1360667414987014470'),
            new ButtonBuilder()
                .setCustomId('volume')
                .setEmoji('1360666746217955558')
                .setStyle(ButtonStyle.Secondary)
        )

    const row2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('loop')
                .setLabel('Loop')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1360666748558512390'),
            new ButtonBuilder()
                .setCustomId('autoplay')
                .setLabel('Autoplay')
                .setEmoji('1360666758733627573')
                .setStyle(aTSTYLE),
            new ButtonBuilder()
                .setCustomId('queue')
                .setLabel('Queue')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1360667784152875008')
        )

    const uiChannels = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setAuthor(
            {
                name: "Music Controller",
                iconURL: "https://cdn.discordapp.com/emojis/1360668061463609524.webp?size=44"
            }
        )
        .setColor(Colors.Blue)
        .setTitle('กำลังเล่นเพลง')
        .setDescription(currentSong.title as string)
        .addFields(
            { name: 'เวลา', value: "- " + new Date(currentSong.length as number).toISOString().slice(11, 19), inline: true },
            { name: 'เปิดเพลงโดย', value: "- " + `${!(currentSong.requester as User)?.id ? `<@${(currentSong.requester as User)?.id}>` : "Autoplay"}`, inline: true },
            { name: 'เเต่งโดย', value: "- " + currentSong.author || 'Unknown', inline: true },
            { name: `เพลงที่เหลือในคิว: ${"`" + players?.queue.length + "`"}`, value: ``, inline: false }
        )
        .setImage(currentSong.thumbnail as string)
        .setTimestamp();

    await channel.messages.cache.get(messageId)?.edit({ embeds: [uiChannels], components: [row, row2] });
    return messageId;
}
