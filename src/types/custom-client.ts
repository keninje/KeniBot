import { Client, Intents } from "discord.js";
import Command from "./command";
import { DisTube } from 'distube';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { MongoClient } from 'mongodb';

export default class CustomClient extends Client<boolean> {
    commands: Map<string, Command>;

    distube = new DisTube(this, {
        plugins: [
            new YtDlpPlugin()
        ],
        youtubeDL: false
    })

    dbClient: MongoClient;

    constructor(commands: Map<string, Command>, dbClient: MongoClient) {
        super({ intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
        ] })
        this.commands = commands
        this.dbClient = dbClient
    }
}