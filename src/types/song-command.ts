import { CacheType, CommandInteraction, GuildMember, VoiceBasedChannel } from "discord.js";
import Command from "./command";
import CustomClient from "./custom-client";
import SlashCommand from "./slash-command";

abstract class SongCommand implements Command {
    abstract data: SlashCommand
    
    async execute(interaction: CommandInteraction<CacheType>, client: CustomClient): Promise<void> {
        const voiceChannel = this.getVoiceChannel(interaction)
        if (voiceChannel === null) {
            await interaction.reply({ content: "You have to be in a voice channel to execute commands!" })
        } else {
            await this.executeSongCommand(interaction, voiceChannel, client);
        }
    }

    abstract executeSongCommand(interaction: CommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: CustomClient): Promise<void>

    getVoiceChannel(interaction: CommandInteraction<CacheType>): VoiceBasedChannel | null {
        const guildMember = interaction.member as GuildMember;
        return guildMember.voice.channel;
    }
}

export default SongCommand;