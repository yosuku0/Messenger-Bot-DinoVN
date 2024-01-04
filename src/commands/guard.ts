import { Command } from '../core/interfaces';

export const command: Command = {
  name: 'guard',
  aliases: ['g'],
  description: "chống cướp box",
  groups: "All",
  permission: "admin",

  execute: async (api, event, Threads) => {
    const info = await api.getThreadInfo(event.threadID);

    if (!info.adminIDs.some(item => item.id === api.getCurrentUserID())) {
      return api.sendMessage('» Cần quyền quản trị viên nhóm, vui lòng thêm và thử lại!', event.threadID, event.messageID);
    }

    const data = (await Threads.getData(event.threadID)).data || {};

    if (typeof data["guard"] === "guard" || data["guard"] === false) {
      data["guard"] = true;
    } else {
      data["guard"] = false;
    }

    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);

    return api.sendMessage(`» Đã ${(data["guard"] === true) ? "bật" : "tắt"} thành công guard!`, event.threadID, event.messageID);
  }
}