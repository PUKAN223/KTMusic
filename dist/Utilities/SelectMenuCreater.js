import { ActionRowBuilder } from "discord.js";
export class SelectMenuCreater {
    constructor(menus) {
        let actionrows = new ActionRowBuilder();
        actionrows.setComponents(menus);
        this.ActionRow = actionrows;
    }
    getMenu() {
        return this.ActionRow;
    }
}
