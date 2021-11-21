const {Client, Intents } = require('discord.js');
const { token } = require('./config.json');

//New Instance of the Discord Bot Client
const client = new Client ({ intents : [Intents.FLAGS.GUILDS]});


//When the client is ready, run this code once
client.once('ready', ()=>{
    console.log('Ready!');
})

client.on("message", msg=>{
    if (msg.content === "ping"){
        msg.reply("pong")
    }
})

//login to discord using the token referenced in config
client.login(token);