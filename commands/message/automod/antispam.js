module.exports = {
  name: 'antispam',
  aliases: ['anspam'],
  category: 'automod',
  description: 'enable/disable antispam module',
  args: false,
  usage: 'antispam <enable/disable>',
  userPerms: ['Administrator'],
  botPerms: ['Administrator'],
  owner: false,
  
  execute: async (client, message, args, prefix) => {

    const oxf = args[0]

    if (oxf === `enable` || oxf === `on`) {
      const value = await client.db.get(`antispam_${message.guild.id}`)

      if (value === true) {
        return message.channel.send(`Antispam is already enabled here`)
      }

      await client.db.set(`antispam_${message.guild.id}`, true)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Enabled Antispam for the server`).setTimestamp().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
    } else {
      
      if (oxf === `disable` || oxf === `off`) {
      const value = await client.db.get(`antispam_${message.guild.id}`)

      if (value === false || value === null) {
        return message.channel.send(`Antispam is already disabled here`)
      }

      await client.db.set(`antispam_${message.guild.id}`, false)
      return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} Disabled Antispam for the server`).setTimestamp().setAuthor({name: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})]})
     } else {

        message.channel.send({embeds: [new client.emb().addFields([{name: `\`${prefix}antispam\``, value: `\`${prefix}antispam enable\`\nEnable antispam in the server\n\n\`${prefix}antispam disable\`\nDisable antispam in the server`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
        
     }
    }

  }
}
    