import { CommandOpts } from "../typings";
import { Constants, CreateApplicationCommandOptions, CommandInteraction, AnyTextChannel, Uncached } from "oceanic.js";
import { IClient } from "../structures/IClient";

export abstract class Command {
  public opt: CommandOpts;

  constructor() {
    this.opt = {
      description: "",
      cooldown: 1,
      category: "",
      ratelimit: 1
    };
  }

  public get commandOpts(): CreateApplicationCommandOptions {
    return {
      name: "",
      description: "",
      type: Constants.ApplicationCommandTypes.CHAT_INPUT
    };
  }
  public run(bot: IClient, interaction: CommandInteraction<AnyTextChannel | Uncached>): void {}
}
