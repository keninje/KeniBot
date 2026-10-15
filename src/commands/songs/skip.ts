import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';
import SongCommand from '../../types/song-command.ts';

class SkipCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current song')

    async executeSongCommand(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        const queue = useQueue()
        if (!queue?.currentTrack) {
            await interaction.reply("No song to skip")
            return
        }
        // Skipping the last song empties the queue, which fires the EmptyQueue event
        queue.node.skip()
        await interaction.reply("Skipped current song");
    }
};

export default new SkipCommand();
