export default interface ChannelData {
    [guildId: string]: {
        channelId: string,
        messageId: string
    }
}
