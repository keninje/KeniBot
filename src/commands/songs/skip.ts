import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, VoiceBasedChannel } from 'discord.js';
import CustomClient from '../../types/custom-client.js';
import SongCommand from '../../types/song-command.js';

class SkipCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current song')

    async executeSongCommand(interaction: CommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: CustomClient): Promise<void> {
        const queueLength = client.distube.getQueue(interaction.guildId!!)?.songs?.length
        if (queueLength === undefined) {
            await interaction.reply("No song to skip")
        }
        else {
            if (queueLength == 1) {
                await interaction.reply("Cannot skip when there is only one song")
            } else {
                client.distube.skip(interaction)
                await interaction.reply("Skipped current song");
            }
        }
    }
};

export default new SkipCommand();

