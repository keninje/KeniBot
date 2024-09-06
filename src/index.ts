import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { Queue, Song, Events } from "distube";
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
    if (!interaction.isChatInputCommand()) return;

    const commandInterraction = interaction as ChatInputCommandInteraction<CacheType>

    const command = client.commands.get(interaction.commandName)

    try {
        await command!!.execute(commandInterraction, client)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: `There was an error while processing the command` })
    }
})

client.distube.on(Events.PLAY_SONG, (queue: Queue, song: Song<unknown>) => {
    queue.textChannel?.send({ embeds: [constructEmbedCurrentlyPlaying(song, queue.currentTime)] })
})

client.distube.on(Events.FINISH, (queue: Queue) => queue.textChannel?.send({ embeds: [constructEmbedEmptyQueue()] }));

client.login(token)