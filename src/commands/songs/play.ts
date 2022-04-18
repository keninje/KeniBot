import { SlashCommandBuilder } from '@discordjs/builders';
import Command from '../../types/command.js';

export default <Command>{
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Generates an inspirational quote')
		.addStringOption(option =>
			option.setName('song')
				.setDescription('YouTube Song URL')
				.setRequired(true)
		),
	async execute(interaction) {
		console.log(interaction.options.get('song'))
		await interaction.reply({ content: "KEK DABL YOU", ephemeral: true });
	},
};

