import "colors";
const Logger = {
    info: (msg) => console.log(`${" Info ".bgGreen}${":".gray} ${msg.gray}`),
    warn: (msg) => console.log(`${" Warn ".bgYellow}${":".gray} ${msg.gray}`),
    error: (msg) => console.log(`${" Error ".bgRed}${":".gray} ${msg.gray}`),
    start: (msg) => console.log(`${" Start ".bgBlue}${":".gray} ${msg.gray}`),
    command: (msg) => console.log(`${" Command ".bgMagenta}${":".gray} ${msg.gray}`),
    time: (msg) => console.log(`${" Time ".bgCyan}${":".gray} ${msg.gray}`),
};
export default Logger;
