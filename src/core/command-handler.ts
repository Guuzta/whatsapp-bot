import { Command } from "./command";
import { CommandContext } from "./context";

export class CommandHandler {
  private commands = new Map<string, Command>();

  register(command: Command) {
    this.commands.set(command.name, command);
  }

  getCommands() {
    return Array.from(this.commands.keys());
  }

  async execute(commandName: string, ctx: CommandContext) {
    const command = this.commands.get(commandName);

    if (!command) {
      await ctx.reply(`Comando "${commandName}" não encontrado`);
      return;
    }

    await command.execute(ctx);
  }
}
