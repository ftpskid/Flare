module.exports = {
  name: 'antiinvite',
  aliases: ['aninvite', 'antiinvites'],
  category: 'automod',
  description: 'enable/disable antiinvite module',
  args: false,
  usage: 'antiinvite <enable/disable>',
  userPerms: ['Administrator'],
  botPerms: ['Administrator'],
  owner: false,
  
  execute: async (client, message, args, prefix) => {


    const oxf = args[0]

    if (oxf === `enable` || oxf === `on`) {
      const value = await client.db.get(`antiinv_${message.guild.id}`)

      if (value === true) {
        return message.channel.send(`Antiinvite is already enabled here`)
      }

      await client.db.set(`antiinv_${message.guild.id}`, true)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Enabled Antiinvite for the server`).setTimestamp().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
    } else {
      
      if (oxf === `disable` || oxf === `off`) {
      const value = await client.db.get(`antiinv_${message.guild.id}`)

      if (value === false || value === null) {
        return message.channel.send(`Antiinvite is already disabled here`)
      }

      await client.db.set(`antiinv_${message.guild.id}`, false)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Disabled Antiinvite for the server`).setTimestamp().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
     } else {

        message.channel.send({embeds: [new client.emb().addFields([{name: `\`${prefix}antiinvite\``, value: `\`${prefix}antiinvite enable\`\nEnable antiinvite in the server\n\n\`${prefix}antiinvite disable\`\nDisable antiinvite in the server`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
        
     }
        }



  }
}
