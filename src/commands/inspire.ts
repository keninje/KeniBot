import axios from 'axios';
import { CacheType, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import Command from '../types/command.js';

class InspireMeCommand implements Command {
    data =  new SlashCommandBuilder()
        .setName('inspireme')
        .setDescription('Generates an inspirational quote')

    async execute(interaction: CommandInteraction<CacheType>) {
        axios.get('http://inspirobot.me/api?generate=true')
            .then(async resp => {
                const embed = new EmbedBuilder()
                    .setColor('#A877C8')
                    .setImage(resp.data)
                await interaction.reply({ embeds: [embed] });
            })
            .catch(async err => {
                console.error(err)
                await interaction.reply({ content: `There was an error while processing this command: ${interaction.commandName}` })
            })
    }
}

export default new InspireMeCommand();
