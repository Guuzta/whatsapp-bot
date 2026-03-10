import path from "path";
import sharp from "sharp";
import fs from "fs/promises";
import { MessageMedia } from "whatsapp-web.js";

import { Command } from "../core/command";
import { CommandContext } from "../core/context";

import { saveTempFile } from "../services/fileService";

export class StickerCommand implements Command {
  name = "sticker";

  async execute(ctx: CommandContext): Promise<void> {
    if (!ctx.message.hasMedia) {
      await ctx.reply("Envie uma imagem junto com o comando.");
      return;
    }

    const media = await ctx.message.downloadMedia();
    const buffer = Buffer.from(media.data, "base64");

    const inputPath = await saveTempFile(buffer, "jpg");

    const extension = path.extname(inputPath);
    const base = path.basename(inputPath, extension);
    const dir = path.dirname(inputPath);
    const outputPath = path.join(dir, base + ".webp");

    await sharp(inputPath)
      .resize(512, 512, { fit: "cover" })
      .webp({ quality: 100, lossless: true })
      .toFile(outputPath);

    const webpBuffer = await fs.readFile(outputPath);
    const sticker = new MessageMedia(
      "image/webp",
      webpBuffer.toString("base64"),
      "sticker.webp",
    );

    try {
      await ctx.client?.sendMessage(ctx.message.from, sticker, {
        sendMediaAsSticker: true,
      });
    } catch (error) {
      console.log(error);
      ctx.reply("❌ Erro ao processar imagem");
    }
  }
}
