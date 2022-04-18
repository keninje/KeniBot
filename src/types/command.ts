import { SlashCommandBuilder } from '@discordjs/builders';

interface Command {
    data: SlashCommandBuilder,
    execute: (arg: any) => Promise<void>
}

export default Command;