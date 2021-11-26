const {Client, Collection, Intents} = require('discord.js');
const { token } = require('./config.json');
const mongoose = require('mongoose');
const testSchema = require('./test-schema');
const fs = require('fs');




//New Instance of the Discord Bot Client
const client = new Client ({ intents : [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file=>file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
}
//When the client is ready, run this code once
client.once('ready', ()=>{
    console.log('Ready!');
});

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
})

    client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } 
        
        catch(error)
    {
        console.error(error);
        return interaction.reply ({content:'Command Execution Error!', ephemeral:true});
    }
})
    
    //You can use this function to write to your database anywhere
    //Commented out because it writes everytime you type something
   /* await new testSchema({
        message:`${userInput}`,
    }).save()*/
  


    

    
    

//login to discord using the token referenced in config
client.login(token);