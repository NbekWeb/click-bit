import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useTask = defineStore("task", {
  state: () => ({
    channels: [],
    dailyTasks: [],
    brand: {},
  }),
  actions: {
    getChannels() {
      const core = useCore();
      core.loadingUrl.add("get/channels/");
      api({
        url: "get/channels/",
        method: "GET",
      })
        .then(({ data }) => {
          console.log(data);
          this.channels = data;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("get/channels/");
        });
    },
    getTasksDaily() {
      const core = useCore();
      core.loadingUrl.add("tasks/daily/");
      api({
        url: "tasks/daily/",
        method: "GET",
      })
        .then(({ data }) => {
          console.log(data);
          this.dailyTasks = data;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("tasks/daily/");
        });
    },
    getBrand(id) {
      const core = useCore();
      core.loadingUrl.add("brand/");
      api({
        url: `brand/${id}/`,
        method: "GET",
      })
        .then(({ data }) => {
          this.directory = data;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("brand/");
        });
    },
  },
});

export default useTask;
