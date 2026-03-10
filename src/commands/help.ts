import { Command } from "../core/command";
import { CommandContext } from "../core/context";

import { CommandHandler } from "../core/command-handler";

export class HelpCommand implements Command {
  name = "help";

  constructor(private handler: CommandHandler) {}

  async execute(ctx: CommandContext): Promise<void> {
    const commandNames = this.handler.getCommands();
    console.log(commandNames);
    const message = commandNames.length
      ? `📜 Comandos disponíveis:\n- ${commandNames.join("\n- ")}`
      : "Nenhum comando disponível.";

    await ctx.reply(message);
  }
}
