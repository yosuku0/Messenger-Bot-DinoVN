import { Command } from "../core/interfaces";
import fs from "fs";

export const command: Command = {
  name: "help",
  aliases: [],
  description: "Hiện tất cả các lệnh có thể sử dụng",
  groups: "All",
  permission: "everyone",
  execute: async (api, event, args) => {
    try {
      const ThreadInfo = await api.getThreadInfo(event.threadID);
      const commandFiles = fs
        .readdirSync("./src/commands/")
        .filter((file) => file.endsWith(".ts"));

      const commands = commandFiles.map(async (file) => {
        const { command } = await import(`./${file}`);
        if (
          (command && command.name) ||
          (command && command.run)
        ) {
          if (
            command.permission === "everyone" ||
            (command.permission === "admin" &&
              ThreadInfo.adminIDs.includes(event.senderID)) ||
            (command.permission === "owner" &&
              event.senderID === process.env.OWNER_ID)
          ) {
            return {
              name: command.name,
              aliases: command.aliases,
              description: command.description || "Không có mô tả.",
            };
          }
        }
        return null;
      });

      const validCommands = (await Promise.all(commands)).filter(
        (command) => command !== null
      );

      const totalCommands = commandFiles.length;
      const usableCommands = validCommands.length;

      const helpMessage = validCommands
        .map(
          (command) =>
            `🔸 *${process.env.BOT_PERFIX}${command.name}* ${
              command.aliases.length === 0
                ? ""
                : `[${command.aliases.join(", ")}]`
            }\n   ${command.description}`
        )
        .join("\n\n");

      const helpWithStats = `
╔════════════════════════════════╗
\n${helpMessage}\n
🚀 Số lệnh có thể sử dụng: ${usableCommands} / Tổng số lệnh gốc: ${totalCommands}\n
╚════════════════════════════════╝
`;

      let select: any = {};

      for (let com of validCommands) {
        select[`${command.name} ${
          com!.aliases.length === 0
            ? ""
            : `[${com!.aliases.join(", ")}]`
        }`] = false;
      }

      api.createPoll("Test", event.threadID, select, (err: any) => {
        if (err) return console.error(err);
      });

      api.setMessageReaction("✅", event.messageID, () => {}, true);
      api.sendMessage(helpWithStats, event.threadID);
    } catch (error) {
      console.error(error);
      api.sendMessage(
        "Bot không thể gửi tin nhắn cho bạn. Hãy kết bạn với bot!",
        event.threadID,
        event.messageID
      );
    }
  },
};