import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import ICommand from '../interfaces/ICommand';

const ping: ICommand = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with current API ping!')
    ,
    execute: async (interaction: CommandInteraction,  client: Client): Promise<void> => { 
        return interaction.reply(`Current API latency ${client.ws.ping} ms`);
    },
};

export { ping };