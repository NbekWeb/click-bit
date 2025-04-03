import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useLevel = defineStore("blog", {
  state: () => ({
    levels: [],
    blog: {},
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
          console.log(data)
          this.levels = data;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("all/levels/");
        });
    },
    getBlog(id) {
      const core = useCore();
      core.loadingUrl.add("blogs/list/id");
      api({
        url: `blogs/list/${id}/`,
        method: "GET",
      })
        .then(({ data }) => {
          this.directory = data;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("blogs/list/id");
        });
    },
  },
});

export default useLevel;
