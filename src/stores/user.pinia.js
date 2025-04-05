import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";
import { message } from "ant-design-vue";

const useProfile = defineStore("profile", {
  state: () => ({
    profile: {},
    rate: {},
    sound: {},
    bonus: 0,
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
          this.rate = data?.[0];

          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("currency/rate/");
        });
    },
    getReferalAmount() {
      const core = useCore();
      core.loadingUrl.add("referral/bonus/");
      api({
        url: "referral/bonus/",
        method: "GET",
      })
        .then(({ data }) => {
          this.bonus = data?.[0]?.bonus_bit_amount;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("referral/bonus/");
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
        .catch((error) => {
          message.error(error?.response?.data?.error);
        })
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
