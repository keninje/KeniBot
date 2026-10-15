import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import SlashCommand from './slash-command.ts';

interface Command {
    data: SlashCommand,
    execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>
}

export { type Command };