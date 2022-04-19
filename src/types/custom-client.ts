import { Client, Intents } from "discord.js";
import Command from "./command";
import { DisTube } from 'distube';
import { YtDlpPlugin } from '@distube/yt-dlp';

export default class CustomClient extends Client<boolean> {
    commands: Map<string, Command>;

    distube = new DisTube(this, {
        plugins: [
            new YtDlpPlugin()
        ]
    })

    constructor(commands: Map<string, Command>) {
        super({ intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_VOICE_STATES
        ] })
        this.commands = commands
    }
}