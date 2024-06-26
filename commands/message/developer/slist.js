
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const load = require('lodash');

module.exports = {
  name: 'slist',
  aliases: ['serverlist'],
  description: '',
  category: 'developer',
  args: true,
  usage: '',
  userPerms: [],
  botPerms: [],
  owner: true,

execute: async (client, message, args, prefix) => {
        const serverlist = client.guilds.cache.map((guild, i) => `\`\`\`\nServer Name: ${guild.name} [Id: ${guild.id}]\nMembers: ${guild.memberCount}\`\`\``);
        const mapping = load.chunk(serverlist, 10);
        const pages = mapping.map((s) => s.join("\n"));
        let page = 0;
        if (client.guilds.cache.size <= 10) {
            const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(pages[page])
            .setFooter({
                text: `Page ${page + 1}/${pages.length}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                }),
            })
            .setTitle(`${message.client.user.username} Server List`);
            return await message.channel.send({
                embeds: [embed]
            });
    
        } else {
        const embed2 = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(pages[page])
            .setFooter({
                text: `Page ${page + 1}/${pages.length}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                }),
            })
            .setTitle(`${message.client.user.username} Server List`);
        const but1 = new ButtonBuilder().setCustomId("server_list_next").setEmoji('1074372912255090840').setStyle(ButtonStyle.Primary);
        const but2 = new ButtonBuilder().setCustomId("server_list_previous").setEmoji('1074373035416625223').setStyle(ButtonStyle.Primary);
        const but3 = new ButtonBuilder().setCustomId("server_list_stop").setEmoji('1074372187454189609').setStyle(ButtonStyle.Danger);
        const disbut = new ButtonBuilder().setDisabled(true).setCustomId("disabled").setEmoji('1074729175132409896').setStyle(ButtonStyle.Primary); 

                  const disbut1 = new ButtonBuilder().setDisabled(true).setCustomId("disabled1").setEmoji('1074729179452555314').setStyle(ButtonStyle.Primary);
        const disbut2 = new ButtonBuilder().setDisabled(true).setCustomId("disabled2").setEmoji('1074666147640791081').setStyle(ButtonStyle.Danger);
        const row1 = new ActionRowBuilder().addComponents([but2, but3, but1]);
        const msg = await message.channel.send({
            embeds: [embed2],
            components: [row1],
        });
        const collector = message.channel.createMessageComponentCollector({
            filter: (b) => {
                if (b.user.id === message.author.id) return true;
                else {
                    b.reply({
                        ephemeral: true,
                        content: `Not Allowed`,
                    });
                    return false;
                }
            },
            time: 60000 * 5,
            idle: 60000 * 2
        });
        collector.on("collect", async (button) => {
            if (button.customId === "server_list_next") {
                await button.deferUpdate().catch(() => {});
                page = page + 1 < pages.length ? ++page : 0;
                const embed3 = new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(pages[page])
                    .setFooter({
                        text: `Page ${page + 1}/${pages.length}`,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setTitle(`${message.client.user.username} Server List`);
                await msg.edit({
                    embeds: [embed3],
                    components: [row1], 


                                  });
            } else if (button.customId === "server_list_previous") {
                await button.deferUpdate().catch(() => {});
                page = page > 0 ? --page : pages.length - 1;
                const embed4 = new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(pages[page])
                    .setFooter({
                        text: `Page ${page + 1}/${pages.length}`,
                        iconURL: message.author.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setTitle(`${message.client.user.username} Server List`);
                await msg
                    .edit({
                        embeds: [embed4],
                        components: [row1],
                    })
                    .catch(() => {});
            } else if (button.customId === "server_list_stop") {
                await button.deferUpdate().catch(() => {});
                collector.stop();
            } else return;
        });
        collector.on("end", async () => {
            await msg.edit({
                components: [
                    new ActionRowBuilder().addComponents([disbut1, disbut2, disbut]),
                  ],
            });
        });
        }
    } 
}