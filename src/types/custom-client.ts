import { Client, GatewayIntentBits, Partials } from "discord.js";
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
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates
        ] })
        this.commands = commands
    }
}