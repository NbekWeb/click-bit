import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useProfile = defineStore("profile", {
  state: () => ({
    profile: {},
    rate: 1,
    sound: {},
  }),
  actions: {
    getProfile(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("profile/");
      api({
        url: "profile/",
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
    getSounds(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("sounds/");
      api({
        url: "sounds/",
        method: "GET",
      })
        .then(({ data }) => {
          this.sound = data?.[0];
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("sounds/");
        });
    },
    getCurrency(callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("currency/rate/");
      api({
        url: "currency/rate/",
        method: "GET",
      })
        .then(({ data }) => {
          const { click_to_bit_ratio, bit_to_click_ratio } = data?.[0];
          this.rate =
            click_to_bit_ratio === 0 || bit_to_click_ratio === 0
              ? 1
              : click_to_bit_ratio / bit_to_click_ratio;

          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("currency/rate/");
        });
    },
    changeNotification(data, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("profile/notification/");
      api({
        url: "profile/notification/",
        method: "PATCH",
        data,
      })
        .then(({ data }) => {
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("profile/notification/");
        });
    },
    changeSound(data, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("profile/sound/");
      api({
        url: "profile/sound/",
        method: "PATCH",
        data,
      })
        .then(() => {
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("profile/sound/");
        });
    },

    postSwap(data, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("profile/sound/");
      api({
        url: "swap/bits/clicks/",
        method: "POST",
        data,
      })
        .then(() => {
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("profile/sound/");
        });
    },

    deleteProfile() {
      const core = useCore();
      core.loadingUrl.add("profile/");
      api({
        url: "profile/",
        method: "DELETE",
      })
        .then(() => {
          if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.close();
          }
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("profile/");
        });
    },
  },
});

export default useProfile;
