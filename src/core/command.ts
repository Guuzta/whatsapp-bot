import { CommandContext } from "./context";

export interface Command {
  name: string;
  execute(ctx: CommandContext): Promise<void>;
}
