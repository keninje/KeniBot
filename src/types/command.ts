import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import CustomClient from './custom-client.ts';
import SlashCommand from './slash-command.ts';

interface Command {
    data: SlashCommand,
    execute: (interaction: ChatInputCommandInteraction<CacheType>, client: CustomClient) => Promise<void>
}

export { type Command };