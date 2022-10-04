import { Client, ClientOptions, Collection } from "oceanic.js";
import { Logger } from "./Logger";
import fs from "fs";
import { Config } from "../config";
import { Command } from "../abstracts/Command";
import { Cooldown } from "../typings";

export class IClient {
  public client: Client;
  public log: Logger;
  public commands: Collection<string, Command>;
  public cooldown: Map<string, Cooldown>;
  public config;

  constructor(opts: ClientOptions) {
    if (!opts) throw new Error("Options must be required!");

    this.config = Config;
    this.client = new Client(opts);
    this.log = new Logger();
    this.commands = new Collection();
    this.cooldown = new Map();
  }

  public start() {
    this.log.info("Starting bot...");
    this._loadCommands();
    this._loadEvents();
    this.client.connect();
    setTimeout(async () => {
      (await import("./Slash")).run(this);
    }, 5000);
  }

  private _loadCommands(): void {
    fs.readdirSync(`${__dirname}/../commands`).forEach(async (fileName) => {
      let file = (await import(`../commands/${fileName}`)).default;
      let initFile = new file();
      this.commands.set(initFile.commandOpts.name, initFile);
    });
  }

  private _loadEvents(): void {
    fs.readdirSync(`${__dirname}/../events`).forEach(async (event) => {
      let file = (await import(`../events/${event}`)).default;
      let initFile = new file();
      this.client.on(initFile.name, (...args) => initFile.run(this, ...args));
    });
  }
}
