import { ClientOpts } from "./config";
import { IClient } from "./structures/IClient";

const bot = new IClient(ClientOpts);

bot.start();
