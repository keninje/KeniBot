import { CacheType, ChatInputCommandInteraction, VoiceBasedChannel } from "discord.js";
import { getCommandsMap } from "./common.ts";
import { token } from './config.ts'
import { constructEmbedCurrentlyPlaying, constructEmbedEmptyQueue } from "./utils/songs.ts";
import console from "node:console";
import { Client, GatewayIntentBits } from "discord.js";
import { Player, GuildQueueEvent, GuildQueue }  from 'discord-player';
import { DefaultExtractors } from '@discord-player/extractor';
import { YoutubeExtractor } from 'discord-player-youtubei';


const commands = await getCommandsMap(`./commands`)

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
    ]
});

const player = Player.create(client)

client.once('clientReady', async () => {
    await player.extractors.register(YoutubeExtractor, {});
    await player.extractors.loadMulti(DefaultExtractors);
    console.log('Ready')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const commandInterraction = interaction as ChatInputCommandInteraction<CacheType>

    const command = commands.get(interaction.commandName)

    const data = {
        guild: interaction.guild!, 
    }; 

    try {
        await player.context.provide(data, () => command!.execute(commandInterraction))
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: `There was an error while processing the command` })
    }
})

player.events.on(GuildQueueEvent.PlayerStart, async (queue, track) => {
    const { channel }: {channel: VoiceBasedChannel} = queue.metadata;
    await channel.send({ embeds: [constructEmbedCurrentlyPlaying(track, 0)] })
})

player.events.on(GuildQueueEvent.EmptyQueue, (queue: GuildQueue) => {
    const { channel }: {channel: VoiceBasedChannel} = queue.metadata;
    channel.send({ embeds: [constructEmbedEmptyQueue()] })
})

client.login(token)