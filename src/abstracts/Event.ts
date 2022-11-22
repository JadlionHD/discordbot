import { IClient } from "../structures/IClient";
import { ClientEvents } from "oceanic.js";

export abstract class Event<K extends keyof ClientEvents> {
  public name: keyof ClientEvents | undefined;
  constructor() {
    this.name = undefined;
  }

  public run(bot: IClient, ...args: ClientEvents[K]): void {}
}
