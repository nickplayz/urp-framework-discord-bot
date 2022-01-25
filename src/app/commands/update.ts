/* eslint-disable quotes */
import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, MessageEmbed, TextBasedChannel } from 'discord.js';
import ICommand from '../interfaces/ICommand';

const update: ICommand = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('add a new update!')
        .addStringOption(option =>
            option.setName('commit')
                .setDescription('commit reference')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Insert title')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('link')
                .setDescription('Insert link')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Describe the update')
                .setRequired(true))
    ,
    execute: async (interaction: CommandInteraction, client: Client): Promise<void> => { 
        const channel = await client.channels.fetch(process.env.UPDATES) as TextBasedChannel;
        const title = interaction.options.getString('title', true);
        let description = interaction.options.getString('description', true);
        description =  description.replace(/n~/g,"\n")
        let commit = interaction.options.getString('commit', true);
        let link = interaction.options.getString('link', true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        if (commit === 'sem' || commit === '' || commit ===  null || commit === undefined ) commit = 'lastUpdate' ;
        if (link === 'sem' || link === '' || link ===  null || link === undefined ) link = '' ;
   

        const UpdateEmbed = new MessageEmbed()
            .setColor('#ffc130')
            .setTitle( `${title}`)
            .setURL(`${link}`)
            .setAuthor({ name: 'uRP Update', url: 'https://github.com/Underground-Roleplay/framework',  iconURL: 'https://avatars.githubusercontent.com/u/77180295' })
            .setDescription('```diff' + `\n${description}` + '```')
            .addFields(
                { name: 'commit', value:'```diff' + `\n${commit}` + "```"},
            )
            .setImage('https://i.stack.imgur.com/Fzh0w.png')
            .setTimestamp()
            .setFooter({ text: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL()}` });

        channel.send({ embeds: [UpdateEmbed] });
                
        const embedReply = new MessageEmbed()
            .setColor('DARK_GOLD')
            .setTitle('PUBLISHED UPDATE')
            .setDescription('Congratulations your update has been attached to the updates room!');
        embedReply.author = {name: 'uRP Updates', iconURL: 'https://avatars.githubusercontent.com/u/77180295'};
        return interaction.reply({embeds: [embedReply]});
    },
};

export { update };
