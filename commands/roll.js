const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll the dice!'),
    async execute(interaction){
        {
            var dice = {
                sides: 6,
                roll: function (){
                    var randomNumber = Math.floor(Math.random() * this.sides) +1;
                    return randomNumber;
                }
                
            }
            rollResult = dice.roll();
            return interaction.reply({
                content:`You rolled a ${rollResult}!`,
                ephemeral:false,
            })
        }
}}