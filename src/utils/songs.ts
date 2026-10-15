import { bold, Colors, EmbedBuilder, hyperlink } from "discord.js";
import { Track } from "discord-player";

const constructEmbedQueuedUp = (song: Track<unknown>, position: number, secondsUntil: number): EmbedBuilder => {
    return new EmbedBuilder()
        .setColor('#A877C8')
        .setTitle("New song queued up")
        .setDescription(bold(hyperlink(song.title ?? "Song", new URL(song.url!))))
        .addFields(
            { name: 'Duration', value: song.duration ?? 'where duration?' },
            { name: 'Position in queue', value: position == 1 ? 'Next' : (position + 1).toString() },
            { name: 'Estimated time until song is played', value: millisecondsToMinutes(secondsUntil)}
        )
        .setThumbnail(song.thumbnail ?? "https://images.pexels.com/photos/11733110/pexels-photo-11733110.jpeg")
}

const constructEmbedCurrentlyPlaying = (song: Track<unknown>, elapsed: number): EmbedBuilder =>
    new EmbedBuilder()
        .setColor('#A877C8')
        .setDescription(`Now playing: ${bold(hyperlink(song.title!, new URL(song.url!)))}`)
        .addFields(
            { name: "Time remaining", value: millisecondsToMinutes(song.durationMS - elapsed) }
        )
        .setThumbnail(song.thumbnail ?? "https://images.pexels.com/photos/11733110/pexels-photo-11733110.jpeg")

const constructEmbedEmptyQueue = (): EmbedBuilder =>
    new EmbedBuilder()
        .setColor(Colors.Red)
        .setDescription('There are no songs in the queue')

const millisecondsToMinutes = (ms: number): string => {
    const seconds = ms / 1000
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds - minutes * 60);
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes - hours * 60
    return `${hours > 0 ? hours.toString() + ':' : ''}${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
}

export { constructEmbedCurrentlyPlaying, constructEmbedQueuedUp, millisecondsToMinutes, constructEmbedEmptyQueue }