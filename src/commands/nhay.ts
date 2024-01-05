import { Command } from "../core/interfaces";
import { tool } from "../module/data";
import { startSpamming } from "../module/nhay";

export const command: Command = {
  name: "nhay",
  aliases: [],
  description: "nhây vĩnh viễn",
  groups: "Groups",
  permission: "everyone",
  execute: async (api, event, args) => {
    const { threadID, messageID } = event;
    const input = args.join("");
    if (!api.global.nhay) api.global.nhay = new Map();

    const config = await tool.findById(event.threadID);
    if (input == "win") {
      api.global.nhay.set(event.threadID, {
        win: true,
      });
      if (!config || !config.nhay)
        return api.sendMessage("Chức năng này chưa bật", threadID, messageID);
      await tool.findByIdAndUpdate(event.threadID, { nhay: false });
      api.sendMessage("Win", threadID, messageID);
    } else {
      api.global.nhay.set(event.threadID, {
        win: false,
      });
      if (!config)
        new tool({
          _id: threadID,
          nhay: true,
        }).save();
      else await tool.findByIdAndUpdate(threadID, { nhay: true });
      startSpamming(api, threadID);
    }
  },
};
