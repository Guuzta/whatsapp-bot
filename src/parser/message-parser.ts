export interface ParsedMessage {
  command: string;
  args: string[];
}

export function parseMessage(message: string): ParsedMessage {
  const parts = message.trim().split(" ");

  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  return {
    command,
    args,
  };
}
