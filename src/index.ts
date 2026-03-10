import { CommandHandler } from "./core/command-handler";
import { startBot } from "./bot/client";

import { PingCommand } from "./commands/ping";
import { StickerCommand } from "./commands/sticker";

const commandHandler = new CommandHandler();

commandHandler.register(new PingCommand());
commandHandler.register(new StickerCommand());

startBot(commandHandler);
