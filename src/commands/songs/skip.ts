import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder, VoiceBasedChannel } from 'discord.js';
import customClient from '../../types/custom-client.ts';
import SongCommand from '../../types/song-command.ts';

class SkipCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current song')

    async executeSongCommand(interaction: ChatInputCommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: customClient): Promise<void> {
        const queueLength = client.distube.getQueue(interaction.guildId!)?.songs?.length
        if (queueLength === undefined) {
            await interaction.reply("No song to skip")
        }
        else {
            if (queueLength == 1) {
                client.distube.stop(interaction)
            } else {
                client.distube.skip(interaction)
            }
            await interaction.reply("Skipped current song");
        }
    }
};

export default new SkipCommand();

