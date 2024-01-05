import { Function } from "../core/interfaces/index.ts";
import { tool } from "../module/data.ts";
import { startSpamming } from "../module/nhay.ts";

export const functionFile: Function = {
  async execute(api) {
    let config = await tool.find({});
    api.global.nhay = new Map();

    config.forEach(async (data) => {
      // console.log(data);
      if (!data.nhay) return;
      startSpamming(api, data._id);
    });
  },
};
