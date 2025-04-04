import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";
import { message } from "ant-design-vue";

const useLevel = defineStore("level", {
  state: () => ({
    levels: [],
  }),
  actions: {
    getLevels() {
      const core = useCore();
      core.loadingUrl.add("all/levels/");
      api({
        url: "all/levels/",
        method: "GET",
      })
        .then(({ data }) => {
          this.levels = data;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("all/levels/");
        });
    },
    buyLevel(data, callback) {
      const core = useCore();
      core.loadingUrl.add("buy/level/");
      api({
        url: "buy/level/",
        method: "POST",
        data,
      })
        .then(() => {
          callback();
          message.success("Level purchased successfully!");
        })
        .catch(() => {
          message.error("Something went wrong, please try again.");
        })
        .finally(() => {
          core.loadingUrl.delete("buy/level/");
        });
    },
  },
});

export default useLevel;
