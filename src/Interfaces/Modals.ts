import type { ButtonInteraction, CommandInteraction, Interaction, ModalSubmitInteraction } from "discord.js";

export default interface Modal {
    exec: (interaction: ModalSubmitInteraction) => void;
    id: string
}