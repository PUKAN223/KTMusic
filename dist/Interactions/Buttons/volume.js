import { ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { ModalCreater } from "../../Utilities/ModalCreater";
export async function volume(interaction) {
    const player = interaction.client.managers.getPlayer(interaction.guildId);
    if (!player)
        return;
    const volumeModal = new ModalCreater(new ModalBuilder()
        .setCustomId('volume')
        .setTitle('ปรับเสียง'), [
        new TextInputBuilder()
            .setCustomId('volume_input')
            .setLabel('ปรับเสียง')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMinLength(1)
            .setMaxLength(3)
            .setPlaceholder(`ความดังเสียงตอนนี้: ${player.volume}`)
    ]);
    volumeModal.showModal(interaction);
}
