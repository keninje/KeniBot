import { Client, GatewayIntentBits } from "discord.js";
import { type Command } from "./command.ts";
import { DisTube } from 'distube';
import { YtDlpPlugin } from '@distube/yt-dlp';

export default class CustomClient extends Client<true> {
    commands: Map<string, Command>;

    distube = new DisTube(this, {
        plugins: [
            new YtDlpPlugin({ update: true })
        ]
    })

    constructor(commands: Map<string, Command>) {
        super({ intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.MessageContent,
        ] })
        this.commands = commands
    }
}