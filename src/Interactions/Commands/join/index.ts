import { ChannelType, Colors, EmbedBuilder, PermissionFlagsBits, type CommandInteraction, type GuildMember, TextChannel, ActionRowBuilder, ButtonBuilder } from "discord.js";
import { client } from "../../../Index";
import DB from "../../../Configs/DB/Index";
import { setEmbed } from "../../../Utilities/Setup";
import { DiscordGatewayAdapterCreator, joinVoiceChannel } from "@discordjs/voice";

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
    joinVoiceChannel({
        channelId: member.voice.channelId as string,
        guildId: interaction.guildId as string,
        adapterCreator: interaction.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator
    });
    await interaction.deferReply({ flags: ["Ephemeral"] });
}


export default { callback: setup };