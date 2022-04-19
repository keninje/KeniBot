import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, CacheType, VoiceBasedChannel } from "discord.js";
import customClient from "../../types/custom-client";
import SongCommand from "../../types/song-command.js";

class LeaveCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave voice channel');

    async executeSongCommand(interaction: CommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: customClient): Promise<void> {
        client.distube.voices.leave(interaction)
        await interaction.reply("Bye 👋")
    }
}

export default new LeaveCommand()