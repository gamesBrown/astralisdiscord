const {Client, Intents } = require('discord.js');
const { token } = require('./config.json');


//New Instance of the Discord Bot Client
const client = new Client ({ intents : [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});


//When the client is ready, run this code once
client.once('ready', ()=>{
    console.log('Ready!');
})

client.on("messageCreate", message=>{
    if (message.author.bot) return false;
    console.log(`Message from ${message.author.username}: ${message.content}`);
    
    const guildId = '810590335557566504'
    const guild = client.guilds.cache.get(guildId)
    
    let commands
    if (guild) {
        commands = guild.commands
    }
    else {
        commands = client.application?.commands    
    }
     commands?.create({
        name: 'gping',
        description: 'replies with ping',

    })
})
client.on('interactionCreate', async (interaction)=>{
    if (!interaction.isCommand()){
        return
    }
    const {commandName, options} = interaction

    if (commandName=== 'gping'){
        interaction.reply({
            content:'gpong',
            ephemeral:true,

            
        })

        }
    

})
    

//login to discord using the token referenced in config
client.login(token);