import { CacheType, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import Command from '../types/command.js';

class InspireMeCommand implements Command {
    data =  new SlashCommandBuilder()
        .setName('inspireme')
        .setDescription('Generates an inspirational quote')

    async execute(interaction: CommandInteraction<CacheType>) {
        fetch('http://inspirobot.me/api?generate=true')
            .then(async resp => resp.text())
            .then(async text => {
                const embed = new EmbedBuilder()
                    .setColor('#A877C8')
                    .setImage(text)
                await interaction.reply({ embeds: [embed] });
            })
            .catch(async err => {
                console.error(err)
                await interaction.reply({ content: `There was an error while processing this command: ${interaction.commandName}` })
            })
    }
}

export default new InspireMeCommand();
