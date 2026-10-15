import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder, VoiceBasedChannel } from "discord.js";
import { useMainPlayer } from "discord-player";
import SongCommand from "../../types/song-command.ts";

class JoinCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join voice channel');

    async executeSongCommand(interaction: ChatInputCommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel): Promise<void> {
        const queue = useMainPlayer().nodes.create(interaction.guild!, {
            metadata: { channel: interaction.channel },
        })
        if (!queue.connection) await queue.connect(voiceBasedChannel)
        await interaction.reply("Let's jam")
    }
}

export default new JoinCommand()
