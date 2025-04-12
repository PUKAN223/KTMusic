import ping from "../Interactions/Commands/ping";
import setup from "../Interactions/Commands/setup";
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
    }
]

export default CommandRegister;