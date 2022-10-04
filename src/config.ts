import dotenv from "dotenv";
import { ClientOptions } from "oceanic.js";
dotenv.config();

export const ClientOpts: ClientOptions = {
  auth: `Bot ${process.env.DISCORD_TOKEN}`,
  collectionLimits: {
    messages: 1
  },
  gateway: {
    maxShards: "auto",
    intents: ["MESSAGE_CONTENT", "GUILDS", "GUILD_MEMBERS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_VOICE_STATES", "GUILD_MESSAGES"]
  }
};

export const Config = {
  prefix: ["yp", "y2"],
  slash: {
    global: false,
    guildID: "617041217951236291"
  }
};
