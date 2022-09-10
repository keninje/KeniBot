import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { Queue, Song } from "distube";
import { getCommandsMap } from "./common.js";
import { token } from './config.js'
import CustomClient from "./types/custom-client.js";
import { constructEmbedCurrentlyPlaying, constructEmbedEmptyQueue } from "./utils/songs.js";

const client = new CustomClient(
    await getCommandsMap(`./commands`)
)

client.once('ready', () => {
    console.log('Ready')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const commandInterraction = interaction as ChatInputCommandInteraction<CacheType>

    const command = client.commands.get(interaction.commandName)

    try {
        await command!!.execute(commandInterraction, client)
    } catch (error) {
        console.error(error)
        await interaction.channel?.send({ content: `There was an error while processing the command` })
    }
})

client.distube.on('playSong', (queue: Queue, song: Song<unknown>) => {
    queue.textChannel?.send({ embeds: [constructEmbedCurrentlyPlaying(song, queue.currentTime)] })
})

client.distube.on("finish", (queue: Queue) => queue.textChannel?.send({ embeds: [constructEmbedEmptyQueue()] }));

client.login(token)