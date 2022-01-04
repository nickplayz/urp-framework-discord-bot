import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, MessageEmbed, TextBasedChannel } from 'discord.js';
import ICommand from '../interfaces/ICommand';

const reportbug: ICommand = {
    data: new SlashCommandBuilder()
        .setName('reportbug')
        .setDescription('Report a new bug!')
        .addStringOption(option =>
            option.setName('bug')
                .setDescription('Describe the bug')
                .setRequired(true))
    ,
    execute: async (interaction: CommandInteraction, client: Client): Promise<void> => { 
        const channel = await client.channels.fetch(process.env.BUG_REPORTS) as TextBasedChannel;
        const bugDescription = interaction.options.getString('bug', true);
        const embedReport = new MessageEmbed()
            .setColor('DARK_GOLD')
            .setTitle(`A new bug has been submited by ${interaction.user.username}#${interaction.user.discriminator}`)
            .setDescription(bugDescription);
        embedReport.author = {name: 'uRP Bugs', iconURL: 'https://avatars.githubusercontent.com/u/77180295'};
        channel.send({embeds: [embedReport]});
        const embedReply = new MessageEmbed()
            .setColor('DARK_GOLD')
            .setTitle('BUG CATCHER')
            .setDescription('Your bug has been submited to our team! Thank you!');
        embedReply.author = {name: 'uRP Bugs', iconURL: 'https://avatars.githubusercontent.com/u/77180295'};
        return interaction.reply({embeds: [embedReply]});
    },
};

export { reportbug };