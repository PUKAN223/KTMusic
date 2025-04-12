import type { ButtonInteraction, CommandInteraction, Interaction } from "discord.js";

export default interface Button {
    exec: (interaction: ButtonInteraction) => void;
    id: string
}