import { ChannelType, Colors, EmbedBuilder, PermissionFlagsBits, type CommandInteraction, type GuildMember, TextChannel, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { client } from "../../../Index";
import DB from "../../../Configs/DB/Index";
import { setEmbed } from "../../../Utilities/Setup";

async function setup(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    if (!member.permissions.has(PermissionFlagsBits.Administrator)) {
        const noPermEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setDescription("You need to be a server administrator to use this command.")
            .setTimestamp()
            .setFooter({ iconURL: client.user?.avatarURL() as string, text: "KT Music" });
        await interaction.reply({ embeds: [noPermEmbed], flags: ["Ephemeral"] });
        return;
    }

    const guildId = interaction.guild?.id;
    if (!guildId) {
        await interaction.reply({ content: "This command can only be used in a server.", flags: ["Ephemeral"] });
        return;
    }

    if (DB.hasChannel(guildId)) {
        const channelId = DB.getChannelId(guildId);
        const existingChannel = interaction.guild?.channels.cache.get(channelId as string);
        if (existingChannel) {
            const existingEmbed = new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription(`Music channel already exists: <#${channelId}>`)
                .setTimestamp()
                .setFooter({ iconURL: interaction.user.avatarURL() as string, text: "KT Music" });
            await interaction.reply({ embeds: [existingEmbed], flags: ["Ephemeral"] });
            return;
        }
    }

    await interaction.guild?.channels.create({
        name: "🏙．ᴋᴛ ᴍᴜꜱɪᴄ",
        type: ChannelType.GuildText,
        permissionOverwrites: [
            {
                id: interaction.guild?.roles.everyone.id,
                deny: ["ViewChannel"]
            },
            {
                id: interaction.user.id,
                allow: ["ViewChannel"]
            }
        ]
    }).then(async (channel) => {
        const channelCreate = new EmbedBuilder()
            .setColor(Colors.Green)
            .setDescription(`Music channels created successfully. <#${channel.id}>`)
            .setTimestamp()
            .setFooter({ iconURL: interaction.user.avatarURL() as string, text: "KT Music" });
        await interaction.reply({ embeds: [channelCreate], flags: ["Ephemeral"] });
        setEmbed(channel, guildId);
    });
}


export default { callback: setup };