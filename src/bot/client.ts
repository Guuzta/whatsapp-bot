import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

import { CommandHandler } from "../core/command-handler";
import { parseMessage } from "../parser/message-parser";

const allowedUsers = ["554187623989@c.us", "554187780396@c.us"];

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

  client.on("message_create", async (message) => {
    //Log das mensagens
    console.log({
      from: message.from,
      to: message.to,
    });

    if (!allowedUsers.includes(message.to)) return;
    if (!message.body.startsWith("!")) return;

    const text = message.body.slice(1); // remove o prefixo !

    const parsed = parseMessage(text);

    await commandHandler.execute(parsed.command, {
      client,
      message,
      args: parsed.args,
      reply: async (text) => {
        message.reply(text);
      },
    });
  });

  client.initialize();
}
