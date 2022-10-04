import { IClient } from "../structures/IClient";
import { ClientEvents } from "oceanic.js";

export abstract class Event {
  public name: string;
  constructor() {
    this.name = "";
  }

  public run(bot: IClient, ...args: unknown[]): void {}

  //public run<Key extends keyof ClientEvents>(bot: IClient, eventName: Key, ...args: ClientEvents[Key]) {}
}
