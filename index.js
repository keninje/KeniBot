import { Client, Intents } from "discord.js";
import dotenv from 'dotenv';
import { getCommandsMap } from "./common.js";
dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = await getCommandsMap('./commands')

client.once('ready', () => {
    console.log('Ready')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return ;

    const command = client.commands.get(interaction.commandName)

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: `There was an error while processing this command: ${interaction.commandName}`, ephemeral: true })
    }
})

client.login(process.env.DISCORD_TOKEN)