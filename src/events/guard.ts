import { Event } from "../core/interfaces/index.ts";
import { configs } from "../core/module/data.ts";

export const event: Event = {
  name: ["event"],
  async execute(api, event) {
    const { logMessageType, logMessageData, senderID } = event;
    let data = await configs.findById(event.threadID);
    if (!data || !data.guard) return;
    if (data.guard) {
      switch (logMessageType) {
        case "log:thread-admins": {
          if (logMessageData.ADMIN_EVENT == "add_admin") {
            if (event.author == api.getCurrentUserID()) return;
            if (logMessageData.TARGET_ID == api.getCurrentUserID()) return;
            else {
              api.changeAdminStatus(
                event.threadID,
                event.author,
                false,
                editAdminsCallback,
              );
              api.changeAdminStatus(
                event.threadID,
                logMessageData.TARGET_ID,
                false,
              );
              function editAdminsCallback(err: any) {
                if (err)
                  return api.sendMessage(
                    "» Hihihihih! ",
                    event.threadID,
                    event.messageID,
                  );
                return api.sendMessage(
                  `» Kích hoạt chế độ chống cướp box`,
                  event.threadID,
                  event.messageID,
                );
              }
            }
          } else if (logMessageData.ADMIN_EVENT == "remove_admin") {
            if (event.author == api.getCurrentUserID()) return;
            if (logMessageData.TARGET_ID == api.getCurrentUserID()) return;
            else {
              api.changeAdminStatus(
                event.threadID,
                event.author,
                false,
                editAdminsCallback,
              );
              api.changeAdminStatus(
                event.threadID,
                logMessageData.TARGET_ID,
                true,
              );
              function editAdminsCallback(err: any) {
                if (err)
                  return api.sendMessage(
                    "» Hihihihih! ",
                    event.threadID,
                    event.messageID,
                  );
                return api.sendMessage(
                  `» Kích hoạt chế độ chống cướp box`,
                  event.threadID,
                  event.messageID,
                );
              }
            }
          }
        }
      }
    }
  },
};
