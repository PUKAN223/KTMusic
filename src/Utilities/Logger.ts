import "colors"

const Logger = {
    info: (msg: string) => console.log(`${" Info ".bgGreen}${":".gray} ${msg.gray}`),
    warn: (msg: string) => console.log(`${" Warn ".bgYellow}${":".gray} ${msg.gray}`),
    error: (msg: string) => console.log(`${" Error ".bgRed}${":".gray} ${msg.gray}`),
    start: (msg: string) => console.log(`${" Start ".bgBlue}${":".gray} ${msg.gray}`),
    command: (msg: string) => console.log(`${" Command ".bgMagenta}${":".gray} ${msg.gray}`),
    time: (msg: string) => console.log(`${" Time ".bgCyan}${":".gray} ${msg.gray}`),
}

export default Logger;