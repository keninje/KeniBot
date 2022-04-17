import { SlashCommandBuilder } from '@discordjs/builders';

export default {
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
        await interaction.reply({ content: "KEK" , ephemeral: true });
	},
};

