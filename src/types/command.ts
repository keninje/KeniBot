import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import CustomClient from './custom-client.js';
import SlashCommand from './slash-command.js';

interface Command {
    data: SlashCommand,
    execute: (interaction: ChatInputCommandInteraction<CacheType>, client: CustomClient) => Promise<void>
}

export default Command;