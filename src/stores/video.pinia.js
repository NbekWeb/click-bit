import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useVideo = defineStore("videos", {
  state: () => ({
    video: {},
    click: 0,
  }),
  actions: {
    getVideo(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("videos/");
      api({
        url: "videos/",
        method: "GET",
      })
        .then(({ data }) => {
          this.video = data;
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("videos/");
        });
    },
    postClick(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("click/");
      api({
        url: "click/",
        method: "POST",
      })
        .then(({ data }) => {
          this.click = data?.new_balance - data?.old_balance;
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("click/");
        });
    },
  },
});

export default useVideo;
