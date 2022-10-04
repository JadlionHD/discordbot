import { brotliCompressSync } from "zlib";
import { IClient } from "./IClient";

export function run(bot: IClient) {
  bot.log.info(`Total ${bot.commands.size} unregister commands`);

  if (bot.config.slash.global) {
    bot.client.application.getGlobalCommands().then((c) => {
      if (c.length >= 1) {
        c.forEach((e) => {
          if (!bot.commands.has(e.name)) {
            bot.log.warn(`Deleting unused global command: ${e.name}`);
            bot.client.application.deleteGlobalCommand(e.id);
          }
        });

        bot.client.application.bulkEditGlobalCommands(bot.commands.map((c) => c.commandOpts)).then((v) => {
          v.forEach((vv) => {
            bot.log.update(`Updating "${vv.name}" [${vv.id}] global command`);
          });
          bot.log.info(`Updated ${v.length} global commands!`);
        });
      } else {
        bot.commands.forEach(async (cmd) => {
          bot.client.application.createGlobalCommand(cmd.commandOpts).then((r) => bot.log.update(`Creating "${r.name}" [${r.id}] global command`));
        });
      }
    });
  } else {
    bot.client.application.getGuildCommands(bot.config.slash.guildID).then((c) => {
      if (c.length >= 1) {
        c.forEach((e) => {
          if (!bot.commands.has(e.name)) {
            bot.log.warn(`Deleting unused command: ${e.name}`);
            bot.client.application.deleteGuildCommand(bot.config.slash.guildID, e.id);
          }
        });

        bot.client.application
          .bulkEditGuildCommands(
            bot.config.slash.guildID,
            bot.commands.map((c) => c.commandOpts)
          )
          .then((v) => {
            v.forEach((vv) => {
              bot.log.update(`Updating "${vv.name}" [${vv.id}] command`);
            });
            bot.log.info(`Updated ${v.length} commands`);
          });
      } else {
        bot.commands.forEach(async (cmd) => {
          bot.client.application
            .createGuildCommand(bot.config.slash.guildID, cmd.commandOpts)
            .then((r) => bot.log.update(`Creating "${r.name}" [${r.id}] command`));
        });
      }
    });
  }
}
