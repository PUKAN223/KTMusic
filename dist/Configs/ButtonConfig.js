import { skip } from "../Interactions/Buttons/skip";
import { previous } from "../Interactions/Buttons/previous";
import { stop } from "../Interactions/Buttons/stop";
import { pause } from "../Interactions/Buttons/pause";
import { volume } from "../Interactions/Buttons/volume";
import { queue } from "../Interactions/Buttons/queue";
const ButtonRegister = [
    {
        id: "stop",
        exec: (interaction) => stop(interaction)
    },
    {
        id: "previous",
        exec: (interaction) => previous(interaction)
    },
    {
        id: "pause",
        exec: (interaction) => pause(interaction)
    },
    {
        id: "skip",
        exec: (interaction) => skip(interaction)
    },
    {
        id: "volume",
        exec: (interaction) => volume(interaction)
    },
    {
        id: "queue",
        exec: (interaction) => queue(interaction)
    },
    {
        id: "loop",
        exec: (interaction) => { }
    },
    {
        id: "autoplay",
        exec: (interaction) => { }
    },
    {
        id: "replay",
        exec: (interaction) => { }
    }
];
export default ButtonRegister;
