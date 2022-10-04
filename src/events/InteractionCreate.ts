import { Event } from "../abstracts/Event";
import { IClient } from "../structures/IClient";
import { Constants, AnyInteractionGateway, CommandInteraction } from "oceanic.js";

export default class extends Event<"interactionCreate"> {
  constructor() {
    super();
    this.name = "interactionCreate";
  }

  public async run(bot: IClient, interaction: AnyInteractionGateway): Promise<void> {
    if (interaction instanceof CommandInteraction) {
      if (interaction.channel?.type !== 0) return;
      let commandName = interaction.data.name;
      let member = interaction.member;
      let cooldown = bot.cooldown;

      // Cooldown & Ratelimit command
      if (!cooldown.get(`${commandName}-${member?.user.id}`)) {
        cooldown.set(`${commandName}-${member?.user.id}`, { limit: 1, time: Date.now() });
      } else {
        let expireTime = cooldown.get(`${commandName}-${member?.user.id}`)!.time + bot.commands.get(commandName)!.opt.cooldown * 1000;
        let timeLeft = expireTime - Date.now();

        if (cooldown.get(`${commandName}-${member?.user.id}`)!.limit >= bot.commands.get(commandName)!.opt.ratelimit) {
          interaction.createMessage({
            content: `${member?.user.mention} you're being ratelimited, please wait **${timeLeft / 1000}s**`,
            flags: 64
          });
          return;
        }
        cooldown.get(`${commandName}-${member?.user.id}`)!.limit += 1;
      }
      setTimeout(() => {
        cooldown.delete(`${commandName}-${member?.user.id}`);
      }, bot.commands.get(commandName)!.opt.cooldown * 1000);

      try {
        const command = bot.commands.get(commandName);
        await command?.run(bot, interaction);
      } catch (err) {
        bot.log.error(err);
      }
    }
  }
}
