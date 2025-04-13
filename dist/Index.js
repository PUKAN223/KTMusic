import { Client, GatewayIntentBits } from "discord.js";
import { Kazagumo, Plugins } from "kazagumo";
import { Connectors } from "shoukaku";
import { config } from "./Configs/DiscordConfig";
import EventRegister from "./Events/Index";
export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageTyping
    ]
});
export const startedTime = Date.now();
client.managers = new Kazagumo({
    defaultSearchEngine: "youtube",
    plugins: [new Plugins.PlayerMoved(client)],
    send: (guildId, payload) => {
        const guild = client.guilds.cache.get(guildId);
        if (guild)
            guild.shard.send(payload);
    }
}, new Connectors.DiscordJS(client), [
    {
        "name": "ChalresNaig Node",
        "auth": "NAIGLAVA-dash.techbyte.host",
        "url": "lavahatry4.techbyte.host:3000",
        "secure": false
    }
]);
client.login(config.DISCORD_TOKEN).finally(() => {
    client.user?.setPresence({
        activities: [{ name: "Music Player", type: 0 }],
        status: "online"
    });
    EventRegister.Ready;
    EventRegister.Interaction;
    EventRegister.MessageCreate;
    EventRegister.PlayerCreate;
    EventRegister.PlayerEnd;
    EventRegister.QueueUpdate;
});
