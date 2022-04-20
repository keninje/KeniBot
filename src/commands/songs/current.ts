import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, CommandInteraction, VoiceBasedChannel } from "discord.js";
import CustomClient from "../../types/custom-client";
import SongCommand from "../../types/song-command.js";
import { constructEmbedCurrentlyPlaying, constructEmbedEmptyQueue } from "../../utils/songs.js";

class CurrentCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('current')
        .setDescription('Displays information about the currently played song');

    async executeSongCommand(interaction: CommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: CustomClient): Promise<void> {
        const queue = client.distube.getQueue(interaction.guildId!!)
        const elapsed = queue?.currentTime
        const currentSong = queue?.songs.at(0)

        const embed = currentSong !== undefined ? constructEmbedCurrentlyPlaying(currentSong, elapsed!!) : constructEmbedEmptyQueue()

        await interaction.reply({ embeds: [embed] })
    }
}

export default new CurrentCommand()