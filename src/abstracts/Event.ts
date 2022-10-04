import { IClient } from "../structures/IClient";
import { ClientEvents } from "oceanic.js";

export abstract class Event<K extends keyof ClientEvents> {
  public name: string;
  constructor() {
    this.name = "";
  }

  public run(bot: IClient, ...args: ClientEvents[K]): void {}

  //public run<Key extends keyof ClientEvents>(bot: IClient, eventName: Key, ...args: ClientEvents[Key]) {}
}
