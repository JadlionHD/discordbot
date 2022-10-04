import { Event } from "../abstracts/Event";
import { IClient } from "../structures/IClient";
import { Constants } from "oceanic.js";

export default class extends Event {
  constructor() {
    super();
    this.name = "ready";
  }

  public run(bot: IClient): void {
    bot.client.editStatus("online", [{ type: Constants.ActivityTypes.GAME, name: "Hello world" }]);
    bot.log.ready(`${bot.client.user.username} Ready`);
  }
}
