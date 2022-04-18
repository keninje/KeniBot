import { Client, Intents } from "discord.js";
import Command from "./types/command";
import { getCommandsMap } from "./common.js";
import { token } from './config.js'

class KeniClient extends Client<boolean> {
    commands: Map<string, Command>;

    constructor(commands: Map<string, Command>) {
        super({ intents: [Intents.FLAGS.GUILDS] })
        this.commands = commands;
    }
}

const client = new KeniClient(await getCommandsMap(`./commands`))

client.once('ready', () => {
    console.log('Ready')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName)

    try {
        await command!!.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: `There was an error while processing this command: ${interaction.commandName}`, ephemeral: true })
    }
})

client.login(token)