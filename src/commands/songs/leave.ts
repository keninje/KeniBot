import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { useQueue } from "discord-player";
import SongCommand from "../../types/song-command.ts";

class LeaveCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave voice channel');

    async executeSongCommand(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        const queue = useQueue()
        if (!queue) {
            await interaction.reply("I'm not in a voice channel")
            return
        }
        queue.delete()
        await interaction.reply("Bye 👋")
    }
}

export default new LeaveCommand()
