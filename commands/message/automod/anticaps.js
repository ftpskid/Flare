module.exports = {
  name: 'anticaps',
  aliases: ['ancaps', 'antilines'],
  category: 'automod',
  description: 'enable/disable anticaps module',
  args: false,
  usage: 'anticaps <enable/disable>',
  userPerms: ['Administrator'],
  botPerms: ['Administrator'],
  owner: false,
  
  execute: async (client, message, args, prefix) => {


    const oxf = args[0]

    if (oxf === `enable` || oxf === `on`) {
      const value = await client.db.get(`anticap_${message.guild.id}`)

      if (value === true) {
        return message.channel.send(`Anticaps is already enabled here`)
      }

      await client.db.set(`anticap_${message.guild.id}`, true)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Enabled Anticaps for the server`).setTimestamp().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
    } else {
      
      if (oxf === `disable` || oxf === `off`) {
      const value = await client.db.get(`anticap_${message.guild.id}`)

      if (value === false || value === null) {
        return message.channel.send(`Anticaps is already disabled here`)
      }

      await client.db.set(`anticap_${message.guild.id}`, false)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Disabled Anticaps for the server`).setTimestamp().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
     } else {

        message.channel.send({embeds: [new client.emb().addFields([{name: `\`${prefix}anticaps\``, value: `\`${prefix}anticaps enable\`\nEnable anticaps in the server\n\n\`${prefix}anticaps disable\`\nDisable anticaps in the server`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
        
     }
    }




  }
}
