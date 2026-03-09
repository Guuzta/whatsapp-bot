import { CommandHandler } from "./core/command-handler";
import { startBot } from "./bot/client";

import { PingCommand } from "./commands/ping";

const commandHandler = new CommandHandler();

commandHandler.register(new PingCommand());

startBot(commandHandler);
