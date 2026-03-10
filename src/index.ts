import { CommandHandler } from "./core/command-handler";
import { startBot } from "./bot/client";

import { PingCommand } from "./commands/ping";
import { StickerCommand } from "./commands/sticker";
import { HelpCommand } from "./commands/help";

const commandHandler = new CommandHandler();

commandHandler.register(new PingCommand());
commandHandler.register(new StickerCommand());
commandHandler.register(new HelpCommand(commandHandler));

startBot(commandHandler);
