import { Event } from "../core/interfaces/index.ts";
import { configs } from "../core/module/data.ts";
import {readFileSync, writeFileSync} from "fs";
import resolve from "path";

export const event: Event = {
  name: ["event"],
  async execute(api, event, Users) {
      const { threadID } = event;
      const memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId);

      for (const idUser of memJoin) {
        const path = resolve(__dirname, '../commands', 'cache', 'antijoin.json');
        const { antijoin } = require(path);

        const dataJson = JSON.parse(readFileSync(path, "utf-8"));

        if (antijoin.hasOwnProperty(threadID) && antijoin[threadID] === true) {
          try {
            setTimeout(async () => {
              await api.removeUserFromGroup(idUser, event.threadID);
              api.sendMessage(`Done`, threadID);
            }, 1000);
          } catch (e) {
            api.sendMessage(`FAILE`, threadID);
          }
        }
      }
    }
}