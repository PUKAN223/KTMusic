import { REST, Routes, SlashCommandBuilder, type Client } from "discord.js";
import { config } from "../Configs/DiscordConfig";
import CommandRegister from "../Configs/CommandConfig";
import Logger from "./Logger";

const commandsData = CommandRegister.map(x => {
    return new SlashCommandBuilder()
        .setName(x.name)
        .setDescription(x.description)
})

export async function registerCommands(client: Client) {
    const rest = new REST({ version: "9" }).setToken(config.DISCORD_TOKEN);

    await rest.put(Routes.applicationCommands(client.user?.id as string), { body: commandsData.map(x => x) })
        .then((res) => {
            for (const command of CommandRegister) {
                Logger.command(`${`/${command.name}`.cyan}` + `${" is registered.".gray}`)
            }
        })
}
