import { Client, Collection, Intents, Interaction } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import ICommand from './app/interfaces/ICommand';

dotenv.config();

class App {
    public discord: Client;
    public commands: Collection<string, ICommand>;
    constructor(){
        this.discord = new Client({intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES, 
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILDS]});
        this.deployCommands();
        this.start();
    }
    public async deployCommands(): Promise<void> {
        this.commands = new Collection();
        const commandFiles = 
        fs.readdirSync(path.join(process.cwd(), '/app/commands/'), {withFileTypes: true}).filter(file => !file.isDirectory()).map(file => file.name);
        for (const file of commandFiles) {
            const commandName = file.split('.')[0];
            const command = require(`./app/commands/${file}`);
            this.commands.set(command[commandName].data.name, command[commandName]);
            const restBody = this.commands.map(command => command.data.toJSON());
            try{
                const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
                await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), { body: restBody });
                console.log(`Successfully registered application command [${commandName}].`);
            }catch(e){
                console.error(e);
            }
        }
        this.discord.on('interactionCreate', async (interaction: Interaction) => {
            //Interaction types 
            if (!interaction.isCommand()) return;
            const command = this.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction, this.discord);
            } catch (error) {
                console.error(error);
                return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
    }
    public start(): void{
        this.discord.once('ready', () => {
            console.log('Discord bot initializated');
        });
        this.discord.login(process.env.BOT_TOKEN);
    }
}

new App();