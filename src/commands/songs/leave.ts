import { CacheType, VoiceBasedChannel, SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import customClient from "../../types/custom-client.ts";
import SongCommand from "../../types/song-command.ts";

class LeaveCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave voice channel');

    async executeSongCommand(interaction: ChatInputCommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: customClient): Promise<void> {
        client.distube.voices.leave(interaction)
        await interaction.reply("Bye 👋")
    }
}

export default new LeaveCommand()