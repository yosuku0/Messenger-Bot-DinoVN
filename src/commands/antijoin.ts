import { Command } from '../core/interfaces';
import axios from "axios";
import { tool } from '../module/data.ts';

export const command: Command = {
  name: 'antijoin',
  aliases: ['aj'],
  description: "Cấm người mới tham gia box",
  groups: "All",
  permission: "admin",
  execute: async (api, event) => {
    const info = await api.getThreadInfo(event.threadID);
    if (!info.adminIDs.some((item: any) => item == api.getCurrentUserID()))
        return api.sendMessage('𝙼𝚞𝚘̂́𝚗 𝚋𝚘𝚝 𝚝𝚑𝚞̛̣𝚣 𝚑𝚒𝚎̣̂𝚗 𝚕𝚎̣̂𝚗𝚑 𝚗𝚊̀𝚢, 𝚟𝚞𝚒 𝚕𝚘̀𝚗𝚐 𝚝𝚑𝚎̂𝚖 𝚋𝚘𝚝 𝚕𝚊̀𝚖 𝚚𝚝𝚟!!!', event.threadID, event.messageID);
    const data = await tool.findById(event.threadID)
      if (!data) new tool({
        _id: event.threadID,
        antijoin: true,
      }).save();
      if (data && !data.antijoin) await tool.findByIdAndUpdate(event.threadID, { antijoin: true });
      else await tool.findByIdAndUpdate(event.threadID, { antijoin: false });


      api.sendMessage(`=== 『 𝐒𝐮𝐜𝐜𝐞𝐬𝐬 』 ===\n▱▱▱▱▱▱▱▱▱▱▱▱▱\nNhận lệnh ${(!data || !data.antijoin) ? "bật" : "tắt"} anti join thành công`, event.threadID, event.messageID);
      }
    };