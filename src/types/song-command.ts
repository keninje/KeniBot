import { CacheType, ChatInputCommandInteraction, GuildMember, PermissionFlagsBits, VoiceBasedChannel } from "discord.js";
import { type Command } from "./command.ts";
import SlashCommand from "./slash-command.ts";

abstract class SongCommand implements Command {
    abstract data: SlashCommand

    async execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
        const voiceChannel = this.getVoiceChannel(interaction)
        if (voiceChannel === null) {
            await interaction.reply("You have to be in a voice channel to execute commands!")
        } else if (await this.checkBotPermissions(interaction, voiceChannel)) {
            await this.executeSongCommand(interaction, voiceChannel);
        }
    }

    abstract executeSongCommand(interaction: ChatInputCommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel): Promise<void>

    private getVoiceChannel(interaction: ChatInputCommandInteraction<CacheType>): VoiceBasedChannel | null {
        const guildMember = interaction.member as GuildMember;
        return guildMember.voice.channel;
    }

    private async checkBotPermissions(interaction: ChatInputCommandInteraction<CacheType>, voiceChannel: VoiceBasedChannel): Promise<boolean> {
        const permissions = voiceChannel.permissionsFor(interaction.client.user!)!
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
