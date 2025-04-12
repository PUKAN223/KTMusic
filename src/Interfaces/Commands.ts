import type { CommandInteraction, Interaction } from "discord.js";

export default interface Command {
    exec: (interaction: CommandInteraction) => void;
    name: string;
    description: string;
}