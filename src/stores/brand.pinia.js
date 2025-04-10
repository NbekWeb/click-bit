import { defineStore } from "pinia";
import { api } from "@/utils/api.js";
import useCore from "@/stores/core.pinia.js";

const useBrand = defineStore("brand", {
  state: () => ({
    brands: {},
    brand: {},
  }),
  actions: {
    getBrands(search = "") {
      const core = useCore();
      core.loadingUrl.add("brands/");
      api({
        url: "tillo/brands/",
        method: "GET",
        params: { search },
      })
        .then(({ data }) => {
          this.brands = data?.data?.brands;
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("brands/");
        });
    },
    getBrand(id, callback) {
      const core = useCore();
      core.loadingUrl.add("brands/");
      api({
        url: `issue/giftcard/`,
        method: "POST",
        data: { brand: id },
      })
        .then(({ data }) => {
          this.brand = data;
          callback(data);
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("brands/");
        });
    },
    buyBrand(data, id, callback = () => {}) {
      const core = useCore();
      core.loadingUrl.add("brand/");
      api({
        url: `brand/buy/${id}/`,
        method: "POST",
        data,
      })
        .then(() => {
          callback();
        })
        .catch(() => {})
        .finally(() => {
          core.loadingUrl.delete("brand/");
        });
    },
  },
});

export default useBrand;
