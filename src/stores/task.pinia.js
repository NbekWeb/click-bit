import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useTask = defineStore("task", {
  state: () => ({
    channels: [],
    dailyTasks: [],
    friends: [],
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
          this.channels = data;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("get/channels/");
        });
    },
    getTasksDaily(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("tasks/daily/");
      api({
        url: "tasks/daily/",
        method: "GET",
      })
        .then(({ data }) => {
          this.dailyTasks = data;
          callback(data);
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("tasks/daily/");
        });
    },
    getFriends(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("profile/referral/user/");
      api({
        url: "profile/referral/user/",
        method: "GET",
      })
        .then(({ data }) => {
          this.friends = data?.referrals;
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("profile/referral/user/");
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
    checkTask(platform, id, callback) {
      const core = useCore();
      core.loadingUrl.add("complete/task/");
      api({
        url: `complete/task/${platform}/${id}/`,
        method: "GET",
      })
        .then(({ data }) => {
          callback(data?.awarded_channels?.[0]?.message);
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("complete/task/");
        });
    },
  },
});

export default useTask;
