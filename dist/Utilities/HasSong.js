import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { deleteAllMessages } from "./DeleteAllMessage";
import DB from "../Configs/DB/Index";
import { client } from "../Index";
import { SelectMenuCreater } from "./SelectMenuCreater";
export async function setEmbed(channel, guildId) {
    if (!channel)
        return;
    const messageId = DB.getMessageId(guildId);
    if (!messageId) {
        const loadingEmbeds = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setDescription("Loading...")
            .setTimestamp();
        const message = await channel.send({ embeds: [loadingEmbeds] });
        await deleteAllMessages(channel, [message.id]);
        const msgId = await uiChannels(channel, message.id);
        DB.saveChannelData(guildId, channel.id, msgId);
        return msgId;
    }
    else {
        await deleteAllMessages(channel, [messageId]);
        return await uiChannels(channel, messageId);
    }
}
async function uiChannels(channel, messageId) {
    const players = client.managers.getPlayer(channel.guild.id);
    if (!players) {
        const defaultEmbed = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setDescription("No music playing")
            .setTimestamp();
        await channel.messages.cache.get(messageId)?.edit({ embeds: [defaultEmbed], components: [] });
        return messageId;
    }
    const currentSong = players.queue.current;
    if (!currentSong) {
        const defaultEmbed = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setDescription("No music playing")
            .setTimestamp();
        await channel.messages.cache.get(messageId)?.edit({ embeds: [defaultEmbed], components: [] });
        return messageId;
    }
    const row = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
        .setCustomId('stop')
        .setStyle(ButtonStyle.Danger)
        .setEmoji('1360667414987014470'), new ButtonBuilder()
        .setCustomId('previous')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('1360666952082657593')
        .setDisabled(!players.queue.previous[0]), new ButtonBuilder()
        .setCustomId('pause')
        .setStyle(players.paused ? ButtonStyle.Primary : ButtonStyle.Secondary)
        .setEmoji(players.paused ? "1360666753776226425" : "1360666756036952325"), new ButtonBuilder()
        .setCustomId('skip')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('1360666751364366477')
        .setDisabled(!players.queue.length), new ButtonBuilder()
        .setCustomId('volume')
        .setLabel(`${players.volume}`)
        .setEmoji('1360666746217955558')
        .setStyle(ButtonStyle.Secondary));
    const row2 = new ActionRowBuilder()
        .addComponents(new ButtonBuilder()
        .setCustomId('queue')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('1360667784152875008'), new ButtonBuilder()
        .setCustomId('loop')
        .setLabel('Loop')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('1360666748558512390'), new ButtonBuilder()
        .setCustomId('autoplay')
        .setLabel('Auto')
        .setEmoji('1360666758733627573')
        .setDisabled(true)
        .setStyle(players.data.get("autoplay") ? ButtonStyle.Success : ButtonStyle.Secondary), new ButtonBuilder()
        .setCustomId('replay')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji('1360804699539902724'));
    const compo = [row, row2];
    if (players.data.get("qShow") && players.queue.length > 0) {
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("queueSelect")
            .setPlaceholder("View or Select Song to play.")
            .addOptions(players.queue.slice(0, 25).map((song, index) => new StringSelectMenuOptionBuilder()
            .setLabel(song.title?.slice(0, 100))
            .setValue(index.toString())
            .setDescription(song.author?.slice(0, 100))
            .setEmoji("1360678355904630866")));
        compo.unshift(new SelectMenuCreater(selectMenu).getMenu());
    }
    const uiChannels = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setAuthor({
        name: "Music Controller",
        iconURL: "https://cdn.discordapp.com/emojis/1360668061463609524.webp?size=44"
    })
        .setTitle('กำลังล่นเพลง')
        .setDescription(currentSong.title)
        .addFields({ name: 'เวลา', value: "- " + new Date(currentSong.length).toISOString().slice(11, 19), inline: true }, { name: 'เปิดเพลงโดย', value: "- " + `${currentSong.requester?.id ? `<@${currentSong.requester?.id}>` : "Autoplay"}`, inline: true }, { name: 'ศิลปิน', value: "- " + (currentSong.author || 'Unknown'), inline: true }, { name: `คิวเพลง: ${"`" + players.queue.length + "`"}`, value: ``, inline: false })
        .setImage(currentSong.thumbnail)
        .setTimestamp();
    const message = channel.messages.cache.get(messageId);
    if (message) {
        await message.edit({ embeds: [uiChannels], components: compo });
    }
    return messageId;
}
