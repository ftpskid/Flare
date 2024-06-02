/** @format */

module.exports = {
  name: 'gpause',
  aliases: ['pausegw'],
  category: 'Giveaways',
  description: 'Pause a giveaway',
  args: false,
  usage: 'gpause <message id>',
  userPerms: ['ManageGuild'],
  botPerms: [],
  owner: false,
  execute: async (client, message, args, prefix) => {

    let messageId = args[0];
    if(!messageId){
      return message.channel.send({embeds: [new client.emb().desc(`\`${prefix}gpause <message id>\``)]})
    }
    const response = await pause(message.member, messageId);
    message.channel.send(response);
    
  }
}


async function pause(member, messageId){

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [new member.client.emb().desc(`${member.client.emoji.cross} ${member}: Giveaway with Id \`${messageId}\` not found`)]};

  if (giveaway.ended) return {embeds: [new member.client.emb().desc(`${member.client.emoji.cross} ${member}: The giveaway has already ended`)]};

  if (giveaway.paused) return {embeds: [new member.client.emb().desc(`${member.client.emoji.cross} ${member}: The giveaway is already paused`)]};

  try {
    await giveaway.pause();
    return {embeds: [ new member.client.emb().desc(`${member.client.emoji.tick} ${member}: Paused the giveaway \`${messageId}\``)]};
  } catch (error) {
    console.log(error);
    return {embeds: [new member.client.emb().desc(`I was unable to pause the giveaway \`${messageId}\``)]};
  }
      }