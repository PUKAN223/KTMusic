import dotenv from "dotenv";
import Logger from "../Utilities/Logger";
dotenv.config();
const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
    Logger.error(`Missing Token or Client ID`);
    process.exit(1);
}
const CHANNEL_DATA_PATH = "./src/Configs/DB/ChannelData.json";
export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    CHANNEL_DATA_PATH
};
