/** @format */

require('dotenv').config();
const yaml = require('js-yaml');
const fs = require('fs');

const doc = yaml.load(fs.readFileSync('./config.yml', 'utf8'));

module.exports = {
  token: process.env.TOKEN ?? doc.bot?.TOKEN ?? 'MTE4NDcwNDYyNjk1MjUxMTUzOA.GKlbTm.dy-4WHGULf-OS03FKwPFlGw9RJfXGya7JEzjzc',
  owners: process.env.OWNERS ?? doc.bot?.OWNERS ?? ['OWNER_1', 'OWNER_2'],
  prefix: process.env.PREFIX ?? doc.bot?.PREFIX ?? 'YOUR_PREFIX',
  clientID: process.env.CLIENT_ID ?? doc.bot?.ID ?? 'YOUR_CLIENT_ID',
  embedColor: process.env.COLOR ?? doc.bot?.EMBED_COLOR ?? 'HEX_COLOR',
  mongo: process.env.MONGO ?? doc.bot?.MONGO ?? 'MONGOURL',

  links: {
    invite: process.env.INVITE ?? doc.links?.INVITE ?? 'YOUR_WEBSITE',
    support: process.env.SUPPORT ?? doc.links?.SUPPORT ?? 'YOUR_SUPPORT',
    vote: process.env.VOTE ?? doc.links?.VOTE ?? 'YOUR_topgg',
  },
};
