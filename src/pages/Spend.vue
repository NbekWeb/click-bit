<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { RouterLink, useRouter, useRoute } from "vue-router";
import useBrand from "@/stores/brand.pinia.js";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch, computed } from "vue";

const search = ref("");
const debounceTimer = ref(null);

const router = useRouter();
const route = useRoute();
const brandPinia = useBrand();

const { brands } = storeToRefs(brandPinia);

watch(
  search,
  (val) => {
    if (debounceTimer.value) clearTimeout(debounceTimer.value);
    debounceTimer.value = setTimeout(() => {
      router.push({
        path: route.path,
        query: {
          ...route.query,
          search: val || undefined,
        },
      });
      brandPinia.getBrands(val);
    }, 300);
  },
  { immediate: true }
);
</script>
<template>
  <div>
    <div
      class="border custom-search rounded-lg h-10 border-gray-200/20 relative pl-11 pr-3 flex items-center"
    >
      <SearchOutlined class="text-lg absolute left-3.5" />
      <a-input
        v-model:value="search"
        type="search"
        allow-clear
        class="text-lg w-full border-none outline-none font-nova"
        placeholder="Search our digital gift cards "
      />
    </div>
    <div class="mt-4 grid grid-cols-2 gap-2.5">
      <template v-for="brand in brands" :key="brand.id">
        <router-link :to="{ name: 'CardOne', params: { id: brand.id } }">
          <img :src="brand?.image" class="w-full" />
        </router-link>
      </template>
    </div>
  </div>
</template>
<style>
.custom-search .ant-input-affix-wrapper {
  background: transparent;
  border: none;
  padding: 0;
  border-radius: 0;
  color: #fff;
}
.custom-search .ant-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
.custom-search .ant-input {
  background: transparent;
  color: #fff;
}
.custom-search .ant-input-affix-wrapper:focus,
:where(.css-dev-only-do-not-override-rv9zoc).ant-input-affix-wrapper-focused {
  box-shadow: none;
}
.custom-search .ant-input-affix-wrapper .ant-input-clear-icon {
  font-size: 16px;
}
</style>
