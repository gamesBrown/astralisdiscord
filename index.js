const {Client, Intents } = require('discord.js');
const { token } = require('./config.json');
const mongoose = require('mongoose');
const testSchema = require('./test-schema')


//New Instance of the Discord Bot Client
const client = new Client ({ intents : [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});


//When the client is ready, run this code once
client.once('ready', ()=>{
    console.log('Ready!');
})

client.on('ready', async ()=>{
    await mongoose.connect(
        'mongodb+srv://db_adminPW:yFoDgcCFXftQbjmw@cluster0.hzhxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {}
    )
})

setTimeout(async ()=>{
    await new testSchema({
        message:'Goodbye World',
    }).save()
}, 1000)  


client.on("messageCreate", async message=>{
    if (message.author.bot) return false;
    
    const userInput = message.content

    console.log(`Message from ${message.author.username}: ${userInput}`);
    
    //You can use this function to write to your database anywhere
    await new testSchema({
        message:`${userInput}`,
    }).save()
    
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