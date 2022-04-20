import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction, VoiceBasedChannel } from 'discord.js';
import customClient from '../../types/custom-client.js';
import SongCommand from '../../types/song-command.js';

class PlayCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays specified song')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('YouTube Song name/URL')
                .setRequired(true)
        );

    async executeSongCommand(interaction: CommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: customClient): Promise<void> {
        const song: string = interaction.options.get('song')?.value as string //parameter is set as required in the command builder
        await interaction.deferReply();
        //@ts-expect-error god javascript is so fucking garbage holy fucking shit
        await client.distube.play(voiceBasedChannel, song, {
            member: interaction.member,
            textChannel: interaction.channel
        }).then(async () => {
            await interaction.editReply("Song has been queued up");
        })
        .catch(async (err) => {
            console.log(err)
            await interaction.editReply("Something broke");
        })
    }
};

export default new PlayCommand();

