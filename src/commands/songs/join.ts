import { CommandInteraction, CacheType, VoiceBasedChannel, SlashCommandBuilder } from "discord.js";
import customClient from "../../types/custom-client";
import SongCommand from "../../types/song-command.js";

class JoinCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join voice channel');

    async executeSongCommand(interaction: CommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: customClient): Promise<void> {
        await client.distube.voices.join(voiceBasedChannel)
            .then(async () => await interaction.reply("Let's jam"))
    }
}

export default new JoinCommand()