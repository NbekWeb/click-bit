import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useBrand = defineStore("brand", {
  state: () => ({
    brands: [],
    brand: {},
  }),
  actions: {
    getBrands(search = "") {
      const core = useCore();
      core.loadingUrl.add("brands/");
      api({
        url: "brands/",
        method: "GET",
        params: { search },
      })
        .then(({ data }) => {
          this.brands = data;
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
          this.brand = data;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("brand/");
        });
    },
  },
});

export default useBrand;
