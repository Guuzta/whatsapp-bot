/*eslint-disable*/

export interface CommandContext {
  message: any;
  args: string[];
  reply: (text: string) => Promise<void>;
}
