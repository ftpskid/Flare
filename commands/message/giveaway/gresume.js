/** @format */

module.exports = {
  name: 'gresume',
  aliases: ['resumegw'],
  category: 'Giveaways',
  description: 'Resume a giveaway',
  args: false,
  usage: 'gresume <message id>',
  userPerms: ['ManageGuild'],
  botPerms: [],
  owner: false,
  execute: async (client, message, args, prefix) => {

    let messageId = args[0];
    if(!messageId){
      return message.channel.send({embeds: [new client.emb().desc(`\`${prefix}gresume <message id>\``)]})
    }
    const response = await resume(message.member, messageId);
    message.channel.send(response);
    
  }
}

async function resume(member, messageId){

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [new member.client.emb().desc(`${member.client.emoji.cross} ${member}: Giveaway with Id \`${messageId}\` not found`)]};

  if (giveaway.ended) return {embeds: [new member.client.emb().desc(`${member.client.emoji.cross} ${member}: The giveaway has already ended`)]};

  if (!giveaway.paused) return {embeds: [new member.client.emb().desc(`${member.client.emoji.cross} ${member}: The giveaway is not paused`)]};

  try {
    await giveaway.unpause();
    return {embeds: [ new member.client.emb().desc(`${member.client.emoji.tick} ${member}: Resumed the giveaway \`${messageId}\``)]};
  } catch (error) {
    console.log(error);
    return {embeds: [new member.client.emb().desc(`I was unable to resume the giveaway \`${messageId}\``)]};
  }
}
