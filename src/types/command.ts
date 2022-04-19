import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';
import CustomClient from './custom-client.js';
import SlashCommand from './slash-command.js';

interface Command {
    data: SlashCommand,
    execute: (interaction: CommandInteraction<CacheType>, client: CustomClient) => Promise<void>
}

export default Command;