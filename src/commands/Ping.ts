import { Command } from "../abstracts/Command";
import { AnyTextChannel, CommandInteraction, Constants, CreateApplicationCommandOptions, Uncached } from "oceanic.js";
import { IClient } from "../structures/IClient";

export default class extends Command {
  constructor() {
    super();
    this.opt = {
      description: "ping pong test",
      cooldown: 5,
      category: "Utility",
      ratelimit: 2
    };
  }

  public get commandOpts(): CreateApplicationCommandOptions {
    return {
      name: "ping",
      description: this.opt.description,
      type: Constants.ApplicationCommandTypes.CHAT_INPUT
    };
  }

  public run(bot: IClient, interaction: CommandInteraction<AnyTextChannel | Uncached>): void {
    interaction.createMessage({ content: "Hello world" });
  }
}
