import { CacheType, ChatInputCommandInteraction, GuildMember, GuildTextBasedChannel, SlashCommandBuilder, VoiceBasedChannel } from 'discord.js';
import CustomClient from '../../types/custom-client.js';
import SongCommand from '../../types/song-command.js';
import { constructEmbedQueuedUp } from '../../utils/songs.js';

class PlayCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays specified song')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('YouTube Song name/URL')
                .setRequired(true)
        );

    async executeSongCommand(interaction: ChatInputCommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel, client: CustomClient): Promise<void> {
        const song: string = interaction.options.getString('song') //parameter is set as required in the command builder
        await interaction.deferReply();
        await client.distube.play(voiceBasedChannel, song, {
            member: interaction.member,
            textChannel: interaction.channel ?? undefined,
            metadata: { interaction },
        }).then(async () => {
            const queue = client.distube.getQueue(interaction.guildId!!)!!
            const songs = queue.songs!!
            const position = songs.length - 1
            const queuedSong = songs.at(position)!! //song is guarranteed to be at the back of the queue since we just queued one
            const embed = constructEmbedQueuedUp(queuedSong, songs.length - 1, songs.reduce((acc, e) => acc + e.duration, -queuedSong.duration - queue.currentTime))
            await interaction.editReply({ embeds: [embed] })
        })
        .catch(async (err) => {
            console.log(err)
            await interaction.editReply("Something broke");
        })
    }
};

export default new PlayCommand();

