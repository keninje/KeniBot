import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { useQueue } from "discord-player";
import SongCommand from "../../types/song-command.ts";
import { constructEmbedCurrentlyPlaying, constructEmbedEmptyQueue } from "../../utils/songs.ts";

class CurrentCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('current')
        .setDescription('Displays information about the currently played song');

    async executeSongCommand(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        const queue = useQueue()
        const currentSong = queue?.currentTrack
        const elapsed = queue?.node.getTimestamp()?.current.value ?? 0

        const embed = currentSong ? constructEmbedCurrentlyPlaying(currentSong, elapsed) : constructEmbedEmptyQueue()

        await interaction.reply({ embeds: [embed] })
    }
}

export default new CurrentCommand()
