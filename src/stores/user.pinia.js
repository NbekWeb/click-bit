import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useProfile = defineStore("profile", {
  state: () => ({
    profile: {},
  }),
  actions: {
    getProfile(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("profile/");
      api({
        url: "tasks/daily/",
        method: "GET",
      })
        .then(({ data }) => {
          this.profile = data;
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("profile/");
        });
    },
  },
});

export default useProfile;
