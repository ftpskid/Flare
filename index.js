/** @format */
const { Flare } = require('./src/client');
const client = new Flare();
client.connect();
module.exports = client;
