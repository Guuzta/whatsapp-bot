import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

const TEMP_FOLDER = path.join(process.cwd(), "src", "temp");

export async function ensureTempFolder() {
  await mkdir(TEMP_FOLDER, { recursive: true });
}

export async function saveTempFile(buffer: Buffer, extension: string) {
  await ensureTempFolder();

  const fileName = `image-${Date.now()}.${extension}`;
  const filePath = path.join(TEMP_FOLDER, fileName);

  await writeFile(filePath, buffer);

  return filePath;
}

export async function deleteFile(filePath: string) {
  await unlink(filePath);
}
