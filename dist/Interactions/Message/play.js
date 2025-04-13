import Logger from "../../Utilities/Logger";
import { client } from "../../Index";
import { setEmbed } from "../../Utilities/HasSong";
const listSong = [];
async function play(msg) {
    Logger.info(msg.content);
    if (msg.author.bot)
        return;
    if (msg) {
        msg.delete();
    }
    listSong.push(msg);
}
setInterval(async () => {
    if (listSong.length == 0)
        return;
    const msg = listSong.shift();
    await new Promise(resolve => setTimeout(resolve, 1000));
    let players = client.managers.getPlayer(msg.guild?.id);
    if (!players) {
        players = await client.managers.createPlayer({
            guildId: msg.guild?.id,
            textId: msg.channel.id,
            voiceId: msg.member?.voice.channel?.id,
            volume: 100,
            deaf: true
        });
    }
    const result = await client.managers.search(msg.content, { requester: msg.author });
    if (!result.tracks.length)
        return;
    if (result.type === "PLAYLIST") {
        players.queue.add(result.tracks);
    }
    else {
        players.queue.add(result.tracks[0]);
    }
    if (!players.playing && !players.paused) {
        await players.play();
    }
    setEmbed(msg.channel, msg.guild?.id);
}, 1000);
export default { callback: play };
