import { client } from "../../Index";
import ButtonRegister from "../../Configs/ButtonConfig";
import CommandRegister from "../../Configs/CommandConfig";
import ModalRegister from "../../Configs/ModalConfig";
import SelectMenuRegister from "../../Configs/SelectedMenuConfig";
client.on("interactionCreate", (interaction) => {
    if (interaction.isCommand()) {
        const { commandName } = interaction;
        if (CommandRegister.some(x => x.name == commandName)) {
            CommandRegister.find(x => x.name == commandName)?.exec(interaction);
        }
    }
    else if (interaction.isButton()) {
        const { customId: buttonId } = interaction;
        if (ButtonRegister.some(x => x.id == buttonId)) {
            ButtonRegister.find(x => x.id == buttonId)?.exec(interaction);
        }
    }
    else if (interaction.isModalSubmit()) {
        const { customId: modalId } = interaction;
        if (ModalRegister.some(x => x.id == modalId)) {
            ModalRegister.find(x => x.id == modalId)?.exec(interaction);
        }
    }
    else if (interaction.isStringSelectMenu()) {
        const { customId: selectId } = interaction;
        if (SelectMenuRegister.some(x => x.id == selectId)) {
            SelectMenuRegister.find(x => x.id == selectId)?.exec(interaction);
        }
    }
});
