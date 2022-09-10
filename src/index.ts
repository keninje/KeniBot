import { Queue, Song } from "distube";
import { MongoClient } from "mongodb";
import { getCommandsMap } from "./common.js";
import { dbUrl, token } from './config.js'
import { registerEmoteHandlers } from "./emotes/handlers.js";
import CustomClient from "./types/custom-client.js";
import { constructEmbedCurrentlyPlaying, constructEmbedEmptyQueue } from "./utils/songs.js";

const dbClient = await new MongoClient(dbUrl).connect();

const client = new CustomClient(
    await getCommandsMap(`./commands`),
    dbClient
)

client.once('ready', () => {
    console.log('Ready')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName)

    try {
        await command!!.execute(interaction, client)
    } catch (error) {
        console.error(error)
        await interaction.channel?.send({ content: `There was an error while processing the command` })
    }
})

client.distube.on('playSong', (queue: Queue, song: Song<unknown>) => {
    queue.textChannel?.send({ embeds: [constructEmbedCurrentlyPlaying(song, queue.currentTime)] })
})

client.distube.on("finish", (queue: Queue) => queue.textChannel?.send({ embeds: [constructEmbedEmptyQueue()] }));

registerEmoteHandlers(client)

client.login(token)

const serverCleanup = () => {
    client.dbClient.close()
}

['exit', `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, serverCleanup);
})