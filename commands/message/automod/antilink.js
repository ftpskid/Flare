module.exports = {
  name: 'antilink',
  aliases: ['anlink', 'antilinks'],
  category: 'automod',
  description: 'enable/disable antilink module',
  args: false,
  usage: 'antilink <enable/disable>',
  userPerms: ['Administrator'],
  botPerms: ['Administrator'],
  owner: false,
  
  execute: async (client, message, args, prefix) => {

    const oxf = args[0]

    if (oxf === `enable` || oxf === `on`) {
      const value = await client.db.get(`antilink_${message.guild.id}`)

      if (value === true) {
        return message.channel.send(`Antilink is already enabled here`)
      }

      await client.db.set(`antilink_${message.guild.id}`, true)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Enabled Antilink for the server`).setTimestamp().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
    } else {
      
      if (oxf === `disable` || oxf === `off`) {
      const value = await client.db.get(`antilink_${message.guild.id}`)

      if (value === false || value === null) {
        return message.channel.send(`Antilink is already disabled here`)
      }

      await client.db.set(`antilink_${message.guild.id}`, false)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Disabled Antilink for the server`).setTimestamp().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
     } else {

        message.channel.send({embeds: [new client.emb().addFields([{name: `\`${prefix}antilink\``, value: `\`${prefix}antilink enable\`\nEnable antilink in the server\n\n\`${prefix}antilink disable\`\nDisable antilink in the server`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
        
     }
    }



  }
}
