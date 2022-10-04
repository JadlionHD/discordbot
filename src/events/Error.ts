import { Event } from "../abstracts/Event";
import { IClient } from "../structures/IClient";

export default class extends Event<"error"> {
  constructor() {
    super();
    this.name = "error";
  }

  public run(bot: IClient, info: string | Error, shard?: number | undefined): void {
    bot.log.error(`SHARD (${shard}) ERR:`, info);
  }
}
