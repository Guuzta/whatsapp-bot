/*eslint-disable*/

import { Client } from "whatsapp-web.js";

export interface CommandContext {
  message: any;
  args: string[];
  client?: Client;
  reply: (text: string) => Promise<void>;
}
