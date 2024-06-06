const { REST, Routes } =  require('discord.js');
require("dotenv").config();

// headers = {
//     'authorization' : 'Bot token_value',
// }

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' })
    .setToken(
        process.env.DISCORD_TOKEN
    );

//immediately invoked function

    try{
        console.log('Started refreshing application (/) commands.');
        //get client id from OAuth2 section
        rest.put(
            Routes.applicationCommands("1245947058553094206"), 
            { body: commands }
        );
        console.log('Successfully reloaded application (/) commands.');
    } 
    catch(error) {
        console.error(error);
    }

    process.on('unhandledRejection', error => {
        console.error('Unhandled promise rejection:', error);
    });

//register command using node command.js