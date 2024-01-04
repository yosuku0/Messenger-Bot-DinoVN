import { Command } from '../core/interfaces';
import { configs } from "../core/module/data.ts";

export const command: Command = {
  name: 'guard',
  aliases: ['g'],
  description: "chống cướp box",
  groups: "All",
  permission: "admin",

  execute: async (api, event, Threads) => {
    const info = await api.getThreadInfo(event.threadID);

    if (!info.adminIDs.some(item => item === api.getCurrentUserID())) {
      return api.sendMessage('» Cần quyền quản trị viên nhóm, vui lòng thêm và thử lại!', event.threadID, event.messageID);
    }

    const config = await configs.findById(event.threadID); // Tìm kiếm config của id đã chọn trước đó

    if(!config) new configs({
      _id: event.threadID,
      guard: true
    }).save();
    else await configs.findByIdAndUpdate(event.threadID, {guard: (config.guard === true) ? false : true});

    return api.sendMessage(`» Đã ${(!config || config.guard === true) ? "bật" : "tắt"} thành công guard!`, event.threadID, event.messageID);
  }
}