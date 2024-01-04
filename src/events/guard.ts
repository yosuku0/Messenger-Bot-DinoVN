import { Event } from "../core/interfaces/index.ts";

export const event: Event = {
  name: ["logMessageType", "logMessageBody", "logMessageData"],
  async execute(api, event) {
    const { logMessageType, logMessageData, senderID } = event;
    let data = (await Threads.getData(event.threadID)).data;
    if (data.guard == false) return;
    if (data.guard == true) {
      switch (logMessageType) {
        case "log:thread-admins": {
          if (logMessageData.ADMIN_EVENT == "add_admin") {
            if (event.author == api.getCurrentUserID()) return;
            if (logMessageData.TARGET_ID == api.getCurrentUserID()) return;
            else {
              api.changeAdminStatus(event.threadID, event.author, false, editAdminsCallback);
              api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, false);
              function editAdminsCallback(err) {
                if (err) return api.sendMessage("» Hihihihih! ", event.threadID, event.messageID);
                return api.sendMessage(`» Kích hoạt chế độ chống cướp box`, event.threadID, event.messageID);
              }
            }
          } else if (logMessageData.ADMIN_EVENT == "remove_admin") {
            if (event.author == api.getCurrentUserID()) return;
            if (logMessageData.TARGET_ID == api.getCurrentUserID()) return;
            else {
              api.changeAdminStatus(event.threadID, event.author, false, editAdminsCallback);
              api.changeAdminStatus(event.threadID, logMessageData.TARGET_ID, true);
              function editAdminsCallback(err) {
                if (err) return api.sendMessage("» Hihihihih! ", event.threadID, event.messageID);
                return api.sendMessage(`» Kích hoạt chế độ chống cướp box`, event.threadID, event.messageID);
              }
            }
          }
        }
      }
    }
  }
};