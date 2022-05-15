const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Token, ClientId }  = require("./priv.json")
const Global = require("./GlobalSlash.json")

const rest = new REST({ version: '9' }).setToken(Token);

(async () => {
	try {
		console.log('Starting....');

        /*await rest.put(
			Routes.applicationGuildCommands(ClientId, guildId),
			{ body: Server.data },
		);*/ //uncomment to add a server

		await rest.put(
			Routes.applicationCommands(ClientId),
			{ body: Global.data },
		);

        console.log("Finished")
	}
    catch (error) {
		console.error(error);
	}
})();

class Client extends AkairoClient {
    constructor() {
        super(
            {
                ownerID: ['714973277457743983'],
            },
            {
                intents: [
                    Intents.FLAGS.GUILDS, 
                    Intents.FLAGS.GUILD_MEMBERS, 
                    Intents.FLAGS.GUILD_BANS, 
                    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, 
                    Intents.FLAGS.GUILD_INTEGRATIONS, 
                    Intents.FLAGS.GUILD_WEBHOOKS, 
                    Intents.FLAGS.GUILD_INVITES, 
                    Intents.FLAGS.GUILD_MESSAGES, 
                    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
                    Intents.FLAGS.GUILD_MESSAGE_TYPING, 
                    Intents.FLAGS.DIRECT_MESSAGES, 
                    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, 
                    Intents.FLAGS.DIRECT_MESSAGE_TYPING
                ],
            },
        );

        //Change below when adding new folders or working with manual commands
        /*this.commandHandler = new CommandHandler(this, {
            directory: './main/commands/',
            prefix: 'dk.',
            automateCategories: true,
        });*/
        this.listenerHandler = new ListenerHandler(this, {
            directory: './main/events/',
        });
        this.listenerHandler.setEmitters({
            //commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process: process,
        });
        //this.commandHandler.useListenerHandler(this.listenerHandler);
        //this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }
}
const client = new Client();
client.login(Token);