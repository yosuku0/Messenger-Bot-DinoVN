import { Event } from "../core/interfaces/index.ts";
import { tool } from "../module/data.ts";

export const event: Event = {
  name: ["event"],
  async execute(api, event) {
      const { threadID } = event;
      const memJoin = event.logMessageData.addedParticipants.map((info: any) => info.userFbId);
    const data = await tool.findById(event.threadID)

      for (const idUser of memJoin) {
        if (data && data.antijoin) {
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