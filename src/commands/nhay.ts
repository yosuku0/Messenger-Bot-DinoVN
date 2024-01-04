import { Command } from "../core/interfaces";
import { tool } from "../module/data";

export const command: Command = {
  name: "nhay",
  aliases: [],
  description: "Trả lời lại pong",
  groups: "Groups",
  permission: "everyone",
  execute: async (api, event, args) => {
    const { threadID, messageID } = event;
    const input = args.join("");

    const config = await tool.findById(event.threadID);
    if (input == "win") {
      if (!config || !config.nhay)
        return api.sendMessage("Chức năng này chưa bật", threadID, messageID);
      tool.findByIdAndUpdate(event.threadID, { nhay: false });
      api.sendMessage("Win", threadID, messageID);
    } else {
      if (!config)
        new tool({
          _id: threadID,
          nhay: true,
        }).save();
      else await configs.findByIdAndUpdate(threadID, { nhay: true });
      
    }
  },
};
