import type { ButtonInteraction, CommandInteraction, Interaction, ModalSubmitInteraction, StringSelectMenuInteraction } from "discord.js";

export default interface SelectMenu {
    exec: (interaction: StringSelectMenuInteraction) => void;
    id: string
}