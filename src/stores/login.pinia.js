import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useLogin = defineStore("blog", {
  state: () => ({}),
  actions: {
    postLogin(data, callback) {
      const core = useCore();
      core.loadingUrl.add("telegram/auth/");
      api({
        url: "telegram/auth/",
        method: "POST",
        data,
      })
        .then(({ data }) => {
          localStorage.setItem("access_token", data.access_token);
          console.log("data", data);
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("telegram/auth/");
        });
    },
  },
});

export default useLogin;
