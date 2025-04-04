import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useVideo = defineStore("videos", {
  state: () => ({
    video: {},
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
          this.profile = data;
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("videos/");
        });
    },
  },
});

export default useVideo;
