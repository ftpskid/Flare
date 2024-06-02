module.exports = {
  name: 'greroll',
  aliases: ['rerollgw'],
  category: 'Giveaways',
  description: 'Reroll a giveaway',
  args: false,
  usage: 'greroll <message id>',
  userPerms: ['ManageGuild'],
  botPerms: [],
  owner: false,

  execute: async (client, message, args, prefix) => {


    let messageId = args[0];
    if(!messageId){
      return message.channel.send({embeds: [new client.emb().desc(`\`${prefix}greroll <message id>\``)]})
    }
    const response = await reroll(message.member, messageId);
    message.channel.send(response);
    
  }
}

async function reroll(member, messageId){

  const giveaway = member.client.giveawaysManager.giveaways.find(
    (g) => g.messageId === messageId && g.guildId === member.guild.id
  );

  if (!giveaway) return {embeds: [new member.client.emb().desc(`${member.client.emoji.cross} ${member}: Giveaway with Id \`${messageId}\` not found`)]};

  if (!giveaway.ended) return {embeds: [new member.client.emb().desc(`${member.client.emoji.cross} ${member}: The giveaway has not ended`)]};

  try {
    await giveaway.reroll();
    return {embeds: [ new client.emb().desc(`${member.client.emoji.tick} ${member}: Rerolled the giveaway \`${messageId}\``)]};
  } catch (error) {
    console.log(error);
    return {embeds: [new client.emb().desc(`I was unable to reroll the giveaway \`${messageId}\``)]};
  }
}

