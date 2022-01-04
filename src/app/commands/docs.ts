import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import ICommand from '../interfaces/ICommand';

const docs: ICommand = {
    data: new SlashCommandBuilder()
        .setName('docs')
        .setDescription('Replies with the link to our docs (under development)!')
    ,
    execute: async (interaction: CommandInteraction,  _: Client): Promise<void> => { 
        return interaction.reply(`You can find our basic docs in https://underground-roleplay.github.io/framework/`);
    },
};

export { docs };