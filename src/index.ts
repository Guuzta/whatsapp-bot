import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

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
  const text = message.body;

  if (text === "!ping") {
    await message.reply("pong");
  }
});

client.initialize();
