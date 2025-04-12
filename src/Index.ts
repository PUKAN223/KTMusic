import { Client, GatewayIntentBits } from "discord.js"
import { Kazagumo, Plugins } from "kazagumo"
import { Connectors } from "shoukaku"
import { config } from "./Configs/DiscordConfig"
import EventRegister from "./Events/Index"

declare module 'discord.js' {
    interface Client {
        managers: Kazagumo
    }
}

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageTyping
    ]
})
export const startedTime = Date.now()

client.managers = new Kazagumo({
    defaultSearchEngine: "spotify",
    plugins: [new Plugins.PlayerMoved(client)],
    send: (guildId, payload) => {
        const guild = client.guilds.cache.get(guildId);
        if (guild) guild.shard.send(payload);
    }
}, new Connectors.DiscordJS(client), [
    {
        name: "Node",
        url: "lava.inzeworld.com:3128",
        auth: "saher.inzeworld.com",
        secure: false
    }
])

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
})