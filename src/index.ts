import { getCommandsMap } from "./common.js";
import { token } from './config.js'
import CustomClient from "./types/custom-client.js";

const client = new CustomClient(
    await getCommandsMap(`./commands`)
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
        await interaction.reply({ content: `There was an error while processing this command: ${interaction.commandName}`, ephemeral: true })
    }
})

client.login(token)