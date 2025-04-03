import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useBrand = defineStore("blog", {
  state: () => ({
    brands: [],
    brand: {},
  }),
  actions: {
    getBrands() {
      const core = useCore();
      core.loadingUrl.add("brands/");
      api({
        url: "brands/",
        method: "GET",
      })
        .then(({ data }) => {
          console.log(data);
          this.levels = data;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("brands/");
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

export default useBrand;
