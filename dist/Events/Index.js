const EventRegister = {
    Ready: import("./Ready/Index"),
    Interaction: import("./Interaction/Index"),
    MessageCreate: import("./MessageCreate/Index"),
    PlayerCreate: import("./PlayerCreate/Index"),
    PlayerEnd: import("./PlayerEnd/Index"),
    QueueUpdate: import("./QueueUpdate/Index")
};
export default EventRegister;
