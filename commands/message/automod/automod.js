/** @format */

const { EmbedBuilder, ActionRowBuilder } = require(`discord.js`);

module.exports = {
  name: 'automod',
  aliases: ['am', 'automoderation'],
  category: 'automod',
  description: 'enable/disable automod modules',
  args: false,
  usage: 'automod [config/log/whitelist]',
  userPerms: ['Administrator'],
  botPerms: ['Administrator'],
  owner: false,
  
  execute: async (client, message, args, prefix) => {
    // Code

        let antispam = await client.db.get(`antispam_${message.guild.id}`) ? client.emoji.tick : client.emoji.cross
      
      let antilink = await client.db.get(`antilink_${message.guild.id}`) ? client.emoji.tick : client.emoji.cross

      let antiinv = await client.db.get(`antiinv_${message.guild.id}`) ? client.emoji.tick : client.emoji.cross

      let anticap = await client.db.get(`anticap_${message.guild.id}`) ? client.emoji.tick : client.emoji.cross  

    let subcmd = args[0]


    if (subcmd === `config`) {

      let logs = await client.db.get(`amLogs_${message.guild.id}`)
      
      
     let emb = new client.emb()
       .desc(`**Anti Spam                       -               ${antispam}\nAnti Links                        -               ${antilink}\nAnti Invite                       -               ${antiinv}\nAnti Mass Caps & Lines    -        ${anticap}**`)
       .addFields({name: `${client.emoji.loading} Settings`, value: `Ignore Admins - \`True\`\nIgnore Moderators - \`True\`\nLogging Enabled? - \`${logs ? `Yes` : `No`}\` <#${logs}>\nCaps Filter - \`75%\``, inline: true})
       .setAuthor({name: `Automod Config`, iconURL: message.guild.iconURL({dynamic: true})})
       .setThumbnail(message.guild.iconURL({dynamic: true}))
      .setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})

     amod = await message.channel.send({embeds: [emb]})
      
    } else {
      if (subcmd === `log` || subcmd === `logs` || subcmd === `logging`) {

        let ch = message.mentions.channels.first()?.id ||
      args[0]?.replace(/[^0-9]/g, '')

        if (!ch) {

          return message.reply(`You didn't mention a channel`)        
        }

        await client.db.set(`amLogs_${message.guild.id}`, ch)
        return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: Set the Automod Logging channel to <#${ch}>`)]})
        
      } else {
        if (subcmd === `whitelist` || subcmd === `wl`) {

          let wl = await client.db.get(`wlAm_${message.guild.id}`) ? await client.db.get(`wlAm_${message.guild.id}`) : []

          
      let type = args[1]


          if (type === `show` || type === `list`) {

          let users = []
for(i=0; i< wl.length; i++){
let user = await client.users.fetch(wl[i])
users.push(`\`[${i}]\` | \`${user.username} [Id: ${user.id}]\``)
}        

    const mapping = (require("lodash")).chunk(users, 9);    
      
    const descriptions = mapping.map((s) => s.join("\n"))    

    var pages = [];

    for (let i = 0; i < descriptions.length; i++) {
      
      const embed = new EmbedBuilder()      
        .setDescription(descriptions[i])
        .setColor(client.color)
        .setFooter({text: `Page • 1/${pages.length}`})
        .setTimestamp()
      .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
      .setTitle(`Automod Whitelisted Users:`);
      pages.push(embed);
             
    }

     if (pages.length === 1) {
      return message.channel.send({embeds: [pages[0].setFooter({text: `Page • 1/1`})]})
    } else {

     return pagi(message.channel, message.author, pages)
          }     
            
            
          }

          if (type === `reset` || type === `clear`) {

          let al_yes = new client.button().secondary(`al_yes`, `Yes`, client.emoji.tick)
              let al_no = new client.button().secondary(`al_no`, `No`, client.emoji.cross)

              let rst = new ActionRowBuilder().addComponents(al_yes, al_no)

          aml = await message.channel.send({embeds: [new client.emb().desc(`${message.author}: Do you really want to reset the automod whitelist databse?`)], components: [rst]})
            
          }

          if (type === `add`) {

                 let id = message.mentions.members.first()?.user.id || args[2]?.replace(/[^0-9]/g, '')
    
    let member = id

      ? await message.guild.members.fetch(id, { force: true }).catch((err) => {})

      : null

    if (!member) { 
        return client.emit(`invalidUser`, message);
        }

            wl.push(member.user.id)
            await client.db.set(`wlAm_${message.guild.id}`, wl)
            return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Added** ${member.user.username} to Automod Whitelist`)]})
      


          }  

          if (type === `remove`) {
                
            let id = message.mentions.members.first()?.user.id || args[2]?.replace(/[^0-9]/g, '')
    
    let member = id

      ? await message.guild.members.fetch(id, { force: true }).catch((err) => {})

      : null

    if (!member) { 
        return client.emit(`invalidUser`, message);
        }

           wl = wl.filter((x) => x !== member.user.id)
            await client.db.set(`wlAm_${message.guild.id}`, wl)
            return message.channel.send({embeds: [new client.emb().desc(`${client.emoji.tick} ${message.author}: **Removed** ${member.user.username} from Automod Whitelist`)]})

            
          }
          
        } else {

          message.channel.send({embeds: [new client.emb().addFields([{name: `\`${prefix}automod\``, value:`\`${prefix}automod config\`\nShows the current configurations for automod\n\n\`${prefix}automod log\`\nSet the logging channel for automod\n\n\`${prefix}automod whitelist\`\nWhitelist users from automod\n\n\`${prefix}automod whitelist add\`\nAdd a user to the automod whitelist\n\n\`${prefix}automod whitelist remove\`\nRemove a user from the automod whitelist\n\n\`${prefix}automod whitelist show\`\nShows the automod whitelisted users\n\n\`${prefix}automod whitelist reset\`\nReset the automod whitelist database`}]).setFooter({text: client.user.username + ` • Page 1/1`, iconURL: client.user.displayAvatarURL()})]})
          
        }
      }         
     }


    const collector = await aml.createMessageComponentCollector({
      filter: (interaction) => {
        if (message.author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${client.emoji.cross} Only **${message.author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: 100000,
      idle: 100000 / 2
    });


    collector.on('collect', async (interaction) => {

  if (interaction.isButton()) {

    if (interaction.customId === `al_yes`) {
      client.db.set(`wlAm_${message.guild.id}`, [])
     interaction.update({embeds: [new client.emb().desc(`${client.emoji.tick} Removed all whitelisted users`)], components: []})
          }
    
    if (interaction.customId === `al_no`) {
      return interaction.update({embeds: [new client.emb().desc(`**Operation Cancelled**`)], components: []})
    }
    
  }

})


     collector.on('end', async () => {
      if(aml) {
        aml.edit({components: []}).catch(() => { })
      }
     });

    

  }
}


async function pagi(channel, author, pages, timeout = 30000 * 5) {
    if (!channel || !pages || pages.length === 0) return;

  const r = new ActionRowBuilder().addComponents(
      new channel.client.button().secondary(`back`, ``, channel.client.emoji.backarr),
      new channel.client.button().success(`home`, ``, channel.client.emoji.home),
      new channel.client.button().secondary(`next`, ``, channel.client.emoji.arrow),
      new channel.client.button().danger(`end`, ``, channel.client.emoji.delete)
    );
    let page = 0;

    const curPage = await channel.send({ embeds: [pages[page].setFooter({text: `Page • 1/${pages.length}`})], components: [r]});
    
    const collector = curPage.createMessageComponentCollector({
        filter: (interaction) => {
        if (author.id === interaction.user.id) return true;
        else {
          interaction.reply({ content: `${channel.client.emoji.cross} Only **${author.tag}** Can Interact`, ephemeral: true })
        }
      },
      time: timeout,
      idle: timeout / 2
    });

    collector.on('collect', async(i) => {
              await i.deferUpdate();

      switch (i.customId) {
        case "home":
          page = 0
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case "back":
          page = page > 0 ? --page : pages.length - 1;
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case "next":
          page = page + 1 < pages.length ? ++page : 0;
          await curPage.edit({
            embeds: [
              pages[page].setFooter({
                text: `Page • ${page + 1}/${
                  pages.length
                }`,
              }),
            ],
          });
          break;

        case "end":
          await curPage.delete().catch(() => { });
          break;
      }
    });

    collector.on('end', () => curPage.edit({components: []}));
}

            
