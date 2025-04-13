import { queue } from "../Interactions/SelectionMenu/queue";
import type SelectMenu from "../Interfaces/SelectMenus";

const SelectMenuRegister: Array<SelectMenu> = [
    {
        id: "queueSelect",
        exec: (interaction) => queue(interaction)
    }
]

export default SelectMenuRegister;