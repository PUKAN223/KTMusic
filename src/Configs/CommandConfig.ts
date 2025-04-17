import join from "../Interactions/Commands/join";
import ping from "../Interactions/Commands/ping/Index";
import setup from "../Interactions/Commands/setup/Index";
import type Command from "../Interfaces/Commands"

const CommandRegister: Array<Command> = [
    {
        name: "ping",
        description: "Use this for test commands!",
        exec: (interaction) => ping.callback(interaction)
    },
    {
        name: "setup",
        description: "Use this command to create music channels",
        exec: (interaction) => setup.callback(interaction)
    },
    {
        name: "join",
        description: "Use this command to join the voice channel",
        exec: (interaction) => join.callback(interaction)
    }
]

export default CommandRegister;