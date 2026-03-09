import { Command } from "../core/command";
import { CommandContext } from "../core/context";

export class PingCommand implements Command {
  name = "ping";

  async execute(ctx: CommandContext): Promise<void> {
    await ctx.reply("Pong!");
  }
}
