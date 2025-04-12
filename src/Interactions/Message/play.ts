import { Message, MessageComponentInteraction, OmitPartialGroupDMChannel } from "discord.js";
import Logger from "../../Utilities/Logger";
import { client } from "../../Index";
import { setEmbed } from "../../Utilities/HasSong";

async function play(msg: OmitPartialGroupDMChannel<Message<boolean>>) {
    Logger.info(msg.content)
    let players = client.managers.getPlayer(msg.guild?.id as string)
    if (!players) {
        players = await client.managers.createPlayer({
            guildId: msg.guild?.id as string,
            textId: msg.channel.id,
            voiceId: msg.member?.voice.channel?.id as string,
            volume: 100,
            deaf: true
        })
    }

    const result = await client.managers.search(msg.content, { requester: msg.author })
    if (!result.tracks.length) return msg.reply("No results found!");
    if (result.type === "PLAYLIST") {
        players.queue.add(result.tracks);
    } else {
        players.queue.add(result.tracks[0])
    }
    if (!players.playing && !players.paused) {
        players.play()
    }
    setEmbed(msg.channel, msg.guild?.id as string)
    await msg.delete()
}

export default { callback: play };