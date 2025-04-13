import { ActionRowBuilder } from "@discordjs/builders";
export class ModalCreater {
    constructor(modal, input) {
        this.input = input;
        this.modal = modal;
        for (let Arow of this.input) {
            this.modal.addComponents(new ActionRowBuilder().addComponents(Arow));
        }
    }
    showModal(interaction) {
        if (interaction.isCommand()) {
            return interaction.showModal(this.modal);
        }
        if (interaction.isStringSelectMenu()) {
            return interaction.showModal(this.modal);
        }
        if (interaction.isButton()) {
            return interaction.showModal(this.modal);
        }
    }
}
