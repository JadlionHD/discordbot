import { Event } from "../abstracts/Event";
import { IClient } from "../structures/IClient";
import { Message, Uncached, AnyTextChannel, TextChannel } from "oceanic.js";

export default class extends Event<"messageCreate"> {
  constructor() {
    super();
    this.name = "messageCreate";
  }

  public async run(bot: IClient, msg: Message<Uncached | AnyTextChannel>): Promise<void> {
    if (msg.channel?.type !== 0) return;
    if (!msg.member?.permissions.has("SEND_MESSAGES")) return;
    bot.log.debug(`Message: `, msg.id);
  }
}
