import axios from "axios";
import fs from "fs";
import cheerio from "cheerio";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const command: Command = {
  name: "code",
  aliases: [],
  description: "read/write/cre/edit/del/rename",
  groups: "All",
  permission: "owner",
  execute: async (api, event, args) => {
    if (args.length == 0) return api.sendMessage("Lỗi cú pháp", event.threadID);
    var path = __dirname + "/";
    if (args[0] == "edit") {
      var newCode = event.body.slice(
        8 + args[1].length + args[0].length,
        event.body.length,
      );
      console.log(newCode);
      fs.writeFile(
        `${__dirname}/${args[1]}.ts`,
        newCode,
        "utf-8",
        function (err) {
          if (err)
            return api.sendMessage(
              `Đã Đã xảy ra lỗi khi áp dụng code mới cho "${args[1]}.ts".`,
            );
          api.sendMessage(
            `Đã áp dụng code mới cho "${args[1]}.ts".`,
            event.threadID,
            event.messageID,
          );
        },
      );
    } else if (args[0] == "read") {
      var data = await fs.readFile(
        `${__dirname}/${args[1]}.ts`,
        "utf-8",
        (err, data) => {
          if (err)
            return api.sendMessage(
              `Đã xảy ra lỗi khi đọc lệnh "${args[1]}.ts".`,
              event.threadID,
              event.messageID,
            );
          api.sendMessage(data, event.threadID, event.messageID);
        },
      );
    } else if (args[0] == "-r") {
      var data = await fs.readFile(
        `${__dirname}/${args[1]}.ts`,
        "utf-8",
        (err, data) => {
          if (err)
            return api.sendMessage(
              `Đã xảy ra lỗi khi đọc lệnh "${args[1]}.ts".`,
              event.threadID,
              event.messageID,
            );
          api.sendMessage(data, event.threadID, event.messageID);
        },
      );
    } else if (args[0] == "cre") {
      if (args[1].length == 0)
        return api.sendMessage("Chưa đặt tên cho modules", event.threadID);
      if (fs.existsSync(`${__dirname}/${args[1]}.ts`))
        return api.sendMessage(
          `${args[1]}.ts đã tồn tại.`,
          event.threadID,
          event.messageID,
        );
      fs.copyFileSync(
        __dirname + "/ping.ts",
        __dirname + "/" + args[1] + ".ts",
      );
      return api.sendMessage(
        `Đã tạo thành công tệp "${args[1]}.ts".`,
        event.threadID,
        event.messageID,
      );
    } else if (args[0] == "del") {
      fs.unlinkSync(`${__dirname}/${args[1]}.ts`);
      return api.sendMessage(
        `Đã xoá file có tên "${args[1]}.ts".`,
        event.threadID,
        event.messageID,
      );
    } else if (args[0] == "rename") {
      fs.rename(
        `${__dirname}/${args[1]}.ts`,
        `${__dirname}/${args[2]}.ts`,
        function (err) {
          if (err) throw err;
          return api.sendMessage(
            `Đã đổi tên thành công tệp "${args[1]}.ts" thành "${args[2]}.ts".`,
            event.threadID,
            event.messageID,
          );
        },
      );
    }
  },
};
