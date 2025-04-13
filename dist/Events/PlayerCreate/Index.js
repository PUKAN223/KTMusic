import { client } from "../../Index";
client.managers.on("playerCreate", (player) => {
    player.data.set("playedTracks", []);
    player.data.set("currentArtist", null);
    player.data.set("playedArtists", []);
    player.data.set("autoplay", false);
});
