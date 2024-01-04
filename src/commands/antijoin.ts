import { Command } from '../core/interfaces';
import { configs } from "../core/module/data.ts";
import axios from "axios";

export const command: Command = {
  name: 'antijoin',
  aliases: ['aj'],
  description: "Cấm người mới tham gia box",
  groups: "All",
  permission: "admin",
  execute: async (api, event, Threads, Users) => {
    let name = await Users.getNameUser(event.senderID);
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some((item: any) => item.id == api.getCurrentUserID()))
        return api.sendMessage('𝙼𝚞𝚘̂́𝚗 𝚋𝚘𝚝 𝚝𝚑𝚞̛̣𝚣 𝚑𝚒𝚎̣̂𝚗 𝚕𝚎̣̂𝚗𝚑 𝚗𝚊̀𝚢, 𝚟𝚞𝚒 𝚕𝚘̀𝚗𝚐 𝚝𝚑𝚎̂𝚖 𝚋𝚘𝚝 𝚕𝚊̀𝚖 𝚚𝚝𝚟!!!', event.threadID, event.messageID);
    const data = (await Threads.getData(event.threadID)).data || {};
      if (typeof data.newMember == "undefined" || data.newMember == false) data.newMember = true;
        else data.newMember = false;

        await Threads.setData(event.threadID, { data });
        global.data.threadData.set(parseInt(event.threadID), data);

        return api.sendMessage(`=== 『 𝐒𝐮𝐜𝐜𝐞𝐬𝐬 』 ===\n▱▱▱▱▱▱▱▱▱▱▱▱▱\nNhận lệnh ${(data.newMember == true) ? "bật" : "tắt"} anti join từ ${name} thành công`, event.threadID, event.messageID);
      }
    };