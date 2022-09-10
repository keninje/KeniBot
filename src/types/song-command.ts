import { CacheType, CommandInteraction, GuildMember, PermissionFlagsBits, VoiceBasedChannel } from "discord.js";
import Command from "./command";
import CustomClient from "./custom-client";
import SlashCommand from "./slash-command";

abstract class SongCommand implements Command {
    abstract data: SlashCommand
    
    async execute(interaction: CommandInteraction<CacheType>, client: CustomClient): Promise<void> {
        const voiceChannel = this.getVoiceChannel(interaction)
        if (voiceChannel === null) {
            await interaction.reply("You have to be in a voice channel to execute commands!")
        } else if (await this.checkBotPermissions(interaction, voiceChannel)) {
            await this.executeSongCommand(interaction, voiceChannel, client);
        }
    }

    abstract executeSongCommand(interaction: CommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: CustomClient): Promise<void>

    private getVoiceChannel(interaction: CommandInteraction<CacheType>): VoiceBasedChannel | null {
        const guildMember = interaction.member as GuildMember;
        return guildMember.voice.channel;
    }

    private async checkBotPermissions(interaction: CommandInteraction<CacheType>, voiceChannel: VoiceBasedChannel): Promise<boolean> {
        const permissions = voiceChannel.permissionsFor(interaction.client.user!!)!!
        if (!permissions.has(PermissionFlagsBits.Connect)) {
            await interaction.reply("I do not have the permission to connect to the Voice Channel")
            return false;
        }
        else if (!permissions.has(PermissionFlagsBits.Speak)) {
            await interaction.reply("I do not have the permission to speak in the Voice Channel")
            return false
        }
        return true;
    }
}

export default SongCommand;