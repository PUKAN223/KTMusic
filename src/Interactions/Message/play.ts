import { Message, OmitPartialGroupDMChannel } from "discord.js";
import Logger from "../../Utilities/Logger";
import { client } from "../../Index";
import { setEmbed } from "../../Utilities/HasSong";

const songRequestQueue: OmitPartialGroupDMChannel<Message<boolean>>[] = [];
let isProcessing = false;

async function processQueue() {
    if (isProcessing || songRequestQueue.length === 0) return;
    
    isProcessing = true;
    
    while (songRequestQueue.length > 0) {
        const msg = songRequestQueue.shift()!;
        try {
            if (msg.author.bot || !msg.member?.voice.channel) continue;
            
            await msg.delete().catch(() => {});

            const guildId = msg.guild?.id as string;
            let player = client.managers.getPlayer(guildId) || await client.managers.createPlayer({
                guildId,
                textId: msg.channel.id,
                voiceId: msg.member.voice.channel.id,
                volume: 100,
                deaf: true
            });

            const result = await client.managers.search(msg.content, { requester: msg.author });
            
            if (!result.tracks.length) continue;

            result.type === "PLAYLIST" ? player.queue.add(result.tracks) : player.queue.add(result.tracks[0]);

            if (!player.playing && !player.paused) {
                await player.play().catch(err => {
                    Logger.error(`Playback error: ${err}`);
                    player?.destroy();
                });
            }

            await setEmbed(msg.channel, guildId);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
        } catch (error) {
            Logger.error(`Play handler error: ${error}`);
        }
    }
    
    isProcessing = false;
}

async function play(msg: OmitPartialGroupDMChannel<Message<boolean>>) {
    songRequestQueue.push(msg);
    processQueue();
}

export default { callback: play };
