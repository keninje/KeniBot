import { CacheType, ChatInputCommandInteraction, SlashCommandBuilder, VoiceBasedChannel } from 'discord.js';
import { useMainPlayer } from 'discord-player';
import SongCommand from '../../types/song-command.ts';
import { constructEmbedQueuedUp } from '../../utils/songs.ts';

class PlayCommand extends SongCommand {
    data = new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays specified song')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('YouTube Song name/URL')
                .setRequired(true)
        );

    async executeSongCommand(interaction: ChatInputCommandInteraction<CacheType>, voiceBasedChannel: VoiceBasedChannel): Promise<void> {
        const song = interaction.options.getString('song', true) //parameter is set as required in the command builder
        await interaction.deferReply();
        try {
            const { track, queue } = await useMainPlayer().play(voiceBasedChannel, song, {
                requestedBy: interaction.user,
                nodeOptions: { metadata: { channel: interaction.channel } },
            })

            const upcoming = queue.tracks.toArray()
            const index = upcoming.indexOf(track)
            if (index === -1) {
                // Nothing else was queued, so it's already playing (PlayerStart sends the "Now playing" embed)
                await interaction.editReply(`🎶 Starting **${track.title}**`)
                return
            }

            const current = queue.currentTrack
            const currentRemaining = current ? current.durationMS - (queue.node.getTimestamp()?.current.value ?? 0) : 0
            const msUntil = upcoming.slice(0, index).reduce((acc, t) => acc + t.durationMS, currentRemaining)

            // position 1 = next up, matching constructEmbedQueuedUp
            const embed = constructEmbedQueuedUp(track, index + 1, msUntil)
            await interaction.editReply({ embeds: [embed] })
        } catch (err) {
            console.error(err)
            await interaction.editReply("Something broke");
        }
    }
};

export default new PlayCommand();
