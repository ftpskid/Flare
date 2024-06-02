/** @format */

'use strict';

const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  ActivityType
} = require('discord.js');
const fs = require('fs');
const { ClusterClient, getInfo } = require('discord-hybrid-sharding');
const { Database } = require("quickmongo");
const mongoose = require('mongoose');
const ms = require ('ms')
//const GiveawayManager = require("../assets/GwMan.js");
const { AutoPoster } = require("topgg-autoposter");


class Flare extends Client {
  constructor() {
    super({
      restTimeOffset: 0,
      setMaxListeners: 0,
      messageCacheMaxSize: 10,
      messageCacheLifetime: 60,
      restWsBridgetimeout: 100,

      fetchAllMembers: true,
      failIfNotExists: true,
      disableEveryone: true,

      shards: getInfo().SHARD_LIST,
      shardCount: getInfo().TOTAL_SHARDS,

      allowedMentions: {
        repliedUser: false,
        parse: [],
      },

      partials: [
        Partials.Channel,
        Partials.Guilds,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
      ],

      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
      ],
    });



    this.emb = require('../utils/plugins/embed.js');
    this.button = require('../utils/plugins/button.js');
    this.emoji = require('../assets/emojis.json');
    this.logger = require('../utils/plugins/logger.js');
    this.pagi = require('../utils/plugins/pagi.js');
    this.config = require('../configuration/config.js');

    this.token = this.config.token;
    this.prefix = this.config.prefix;
    this.owners = this.config.owners;
    this.web_cmd = "https://discord.com/api/webhooks/1131821908069994536/MTFktlQ6UQNr1yrZupLXlQycvsnQDqLeugj2YXnXBITEixOIMgQnt-MRzXOAVh_--Sbd";
    this.web_err = "";
    this.web_join = "https://discord.com/api/webhooks/1223199070525587476/X-13MAaQRsbWItpw_f3JVccqRsYlToFedikTOcEQeTZHLJvhY4qvMxrvizhUw2HaOPC0";
    this.web_leave = "https://discord.com/api/webhooks/1130529706643562677/seUmsHBJ4fHLVgT0V8r_qgFkXcqOrHN9pROfpaL_P8qGHdRSlRqu5kmG4gwUfMKatcU1";
    this.web_np = "https://discord.com/api/webhooks/1131827085736943626/PEDLxavqk8k5SLTW7yWQ2iXc-HmYE-gljhIlcBD-YXirtWsNHtj4VZGOhYSgbSnNPR05";
    this.web_bl = "";
    this.web_gban = "";
    
    this.color = this.config.embedColor;
    this.support = this.config.links.support;
    this.invite = this.config.links.invite;
    this.vote = this.config.links.vote;

    this.db = new Database(this.config.mongo);
   // this.giveawaysManager = new GiveawayManager(this);

    this.snipes = new Collection();
    this.events = new Collection();
    this.aliases = new Collection();
    this.commands = new Collection();
    this.cooldowns = new Collection();

    this.categories = fs.readdirSync('./commands/message');

    this.antiCrash = require('../utils/plugins/antiCrash.js')(this);

    this.sleep = (t) => {
      return new Promise((r) => setTimeout(r, t));
    };

    
    this.on('ready', async () => {
      let up = Math.round(process.uptime() - this.uptime) * 1000;

    this.logger.log(`${this.user.username} | Loaded in ${ms(up)}`, 'ready')

      this.user.setPresence({
        status: `dnd`,
        activities: [{
          name: `-help`,
          type: ActivityType.Watching,
      //url: 'https://www.twitch.tv/'
    }] });

      const poster = AutoPoster(process.env.topgg, this)
        poster.on("posted", () => {
  this.logger.log("Posted stats to Top.gg!", 'vote')
}); 
      
      
    })

    this.db.connect()
      mongoose.connect(this.config.mongo, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
this.logger.log("Databse Connected", "mongo")


    this.formatBytes = (a, b = 2) => {
      if (!+a) return '0 Bytes';
      const c = 0 > b ? 0 : b,
        d = Math.floor(Math.log(a) / Math.log(1024));
      return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
        ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
      }`;
    };

    this.fetch = (...args) =>
      import('node-fetch').then(({ default: fetch }) => fetch(...args));

    this.cluster = new ClusterClient(this);

    this.rest.on('rateLimited', (info) => {
      this.logger.log(info, 'error');
    });

    let handlers = fs.readdirSync('./handlers');
    handlers.forEach((handler) => {
      require(`../handlers/${handler}`)(this);
    });
  }
  connect = () => {
    return super.login(this.token);
  };
}

module.exports = { Flare };
