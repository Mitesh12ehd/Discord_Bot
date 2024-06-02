const { REST, Routes } =  require('discord.js');

// headers = {
//     'authorization' : 'Bot MTI0NTk0NzA1ODU1MzA5NDIwNg.GOCCi3.e3RkMIzrnpWpPESVNCDD29H6IjXjDMhtf6tsi8',
// }

const commands = [
    {
      name: 'ping',
      description: 'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' })
    .setToken(
        "MTI0NTk0NzA1ODU1MzA5NDIwNg.GOCCi3.e3RkMIzrnpWpPESVNCDD29H6IjXjDMhtf6tsi8"
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