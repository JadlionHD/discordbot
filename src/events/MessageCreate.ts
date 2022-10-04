import { Event } from "../abstracts/Event";
import { IClient } from "../structures/IClient";
import { Message, Uncached, AnyTextChannel, TextChannel } from "oceanic.js";

export default class extends Event {
  constructor() {
    super();
    this.name = "messageCreate";
  }

  // Upload ke github & hapus ini nanti
  public run(bot: IClient, msg: Message<Uncached | AnyTextChannel>): void {
    if (msg.channel?.type !== 0) return;
    if (!msg.member?.permissions.has("SEND_MESSAGES")) return;
    bot.log.debug(`Message: `, msg.id);
  }
}
