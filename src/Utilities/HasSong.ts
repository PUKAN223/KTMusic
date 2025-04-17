import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextBasedChannel, TextChannel, User, type Channel } from "discord.js";
import { deleteAllMessages } from "./DeleteAllMessage";
import DB from "../Configs/DB/Index"
import { client } from "../Index";
import { KazagumoTrack } from "kazagumo";
import Logger from "./Logger";
import { SelectMenuCreater } from "./SelectMenuCreater";

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
        return msgId;
    } else {
        await deleteAllMessages(channel, [messageId]);
        return await uiChannels(channel as TextChannel, messageId);
    }
}

async function uiChannels(channel: TextChannel, messageId: string) {
    const players = client.managers.getPlayer(channel.guild.id as string);
    const currentSong = players?.queue.current as KazagumoTrack;

    Logger.info(`${players?.paused}`)
    const pRSTYLE = players?.paused ? ButtonStyle.Primary : ButtonStyle.Secondary;
    const aTSTYLE = players?.data.get("autoplay") ? ButtonStyle.Success : ButtonStyle.Secondary;
    const qESTYLE = players?.data.get("qShow") ? ButtonStyle.Primary : ButtonStyle.Secondary;
    const lPSTYLE = players?.loop === "queue" ? ButtonStyle.Success : ButtonStyle.Secondary;
    const pText = players?.paused ? "1360666753776226425" : "1360666756036952325";
    const pvDisabled = players?.queue.previous[0] == undefined;
    const skDisabled = players?.queue.length === 0;
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('stop')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('1360667414987014470'),
            new ButtonBuilder()
                .setCustomId('previous')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1360666952082657593')
                .setDisabled(pvDisabled),
            new ButtonBuilder()
                .setCustomId('pause')
                .setStyle(pRSTYLE)
                .setEmoji(pText),
            new ButtonBuilder()
                .setCustomId('skip')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1360666751364366477')
                .setDisabled(skDisabled),
            new ButtonBuilder()
                .setCustomId('volume')
                .setLabel(`${players?.volume}`)
                .setEmoji('1360666746217955558')
                .setStyle(ButtonStyle.Secondary)
        )

    const row2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('queue')
                .setStyle(qESTYLE)
                .setEmoji('1360667784152875008'),
            new ButtonBuilder()
                .setCustomId('loop')
                .setLabel('Loop')
                .setStyle(lPSTYLE)
                .setEmoji('1360666748558512390'),
            new ButtonBuilder()
                .setCustomId('autoplay')
                .setLabel('Auto')
                .setEmoji('1360666758733627573')
                .setDisabled(true)
                .setStyle(aTSTYLE),
            new ButtonBuilder()
                .setCustomId('replay')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('1360804699539902724')
        )

    let options = players?.queue.slice(0, 25).map((song, index) => 
        new StringSelectMenuOptionBuilder()
            .setLabel((song.title as string).slice(0, 100))
            .setValue(index.toString())
            .setDescription((song.author as string).slice(0, 100))
            .setEmoji("1360678355904630866")
    ) || [];

    if (options.length === 0) {
        options = [
            new StringSelectMenuOptionBuilder()
                .setLabel("No Song")
                .setValue("69")
                .setDescription("No Song")
                .setEmoji("1360678355904630866")
        ];
    }

    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId("queueSelect")
        .setPlaceholder("View or Select Song to play.")
        .addOptions(options)
        .setDisabled(players?.queue.length === 0);

    let compo: ActionRowBuilder<any>[] = [];
    compo = []
    if (players?.data.get("qShow")) {
        compo = [new SelectMenuCreater(selectMenu).getMenu(), row, row2]
    } else {
        compo = [row, row2]
    }

    const uiChannels = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setAuthor({
            name: "Music Controller",
            iconURL: "https://cdn.discordapp.com/emojis/1360668061463609524.webp?size=44"
        })
        .setColor(Colors.Blue)
        .setTitle('กำลังเล่นเพลง')
        .setDescription(currentSong.title as string || "No Title")
        .addFields(
            { name: 'เวลา', value: "- " + new Date(currentSong.length as number).toISOString().slice(11, 19), inline: true },
            { name: 'เปิดเพลงโดย', value: "- " + `${(currentSong.requester as User)?.id ? `<@${(currentSong.requester as User)?.id}>` : "Autoplay"}`, inline: true },
            { name: 'ศิลปิน', value: "- " + currentSong.author || 'Unknown', inline: true },
            { name: `คิวเพลง: ${"`" + players?.queue.length + "`"}`, value: ``, inline: false }
        )
        .setImage(`https://img.youtube.com/vi/${currentSong.identifier}/maxresdefault.jpg`)
        .setTimestamp();

    await channel.messages.cache.get(messageId)?.edit({ embeds: [uiChannels], components: compo });
    return messageId;
}
