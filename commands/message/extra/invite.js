const { EmbedBuilder, ActionRowBuilder } = require('discord.js');


module.exports = {
  name: 'invite',
  aliases: ['inv', 'support', 'vote', 'supp'],
  category: 'Extra',
  description: "Get a invite link of the bot",
  args: false,
  usage: '',
  botPerms: [],
  userPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {

    const e = new EmbedBuilder()
      .setDescription(`• [Invite Flare To Your Server](${client.invite})\n• [Join Flare's Support Server](${client.support})\n• [Vote For Flare](${client.vote})`)
    .setTitle(`<:LinkAdd:1122921615349526589> Here You Go!`)
    .setColor(client.color)
    let inv = new client.button().link(`Invite`, client.invite)
    let sup = new client.button().link(`Support`, client.support)
    let vo = new client.button().link(`Vote`, client.vote)
    let row = new ActionRowBuilder()
    .addComponents(inv, sup, vo)

    message.channel.send({embeds: [e], components: [row]})
    
  }
}