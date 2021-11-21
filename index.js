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
})
    

//login to discord using the token referenced in config
client.login(token);