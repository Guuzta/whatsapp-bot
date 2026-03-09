import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

import { CommandHandler } from "../core/command-handler";
import { parseMessage } from "../parser/message-parser";

export function startBot(commandHandler: CommandHandler): void {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.once("ready", () => {
    console.log("Client is ready!");
  });

  client.on("qr", (qr: string) => {
    console.log("QR RECEIVED");
    qrcode.generate(qr, { small: true });
  });

  client.on("message", async (message) => {
    const text = message.body;

    const parsed = parseMessage(text);

    await commandHandler.execute(parsed.command, {
      message,
      args: parsed.args,
      reply: async (text) => {
        message.reply(text);
      },
    });
  });

  client.initialize();
}
