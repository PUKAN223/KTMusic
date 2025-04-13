import ping from "../Interactions/Commands/ping/Index";
import setup from "../Interactions/Commands/setup/Index";
const CommandRegister = [
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
];
export default CommandRegister;
