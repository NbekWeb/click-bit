<script setup>
import { SearchOutlined, CloseOutlined } from "@ant-design/icons-vue";
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

const clearSearch = () => {
  search.value = "";
};

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
      class="border rounded-lg h-10 border-gray-200/20 relative pl-11 pr-3 flex items-center"
    >
      <SearchOutlined class="text-lg absolute left-3.5" />
      <input
        v-model="search"
        type="search"
        allow-clear
        class="text-lg w-full border-none outline-none font-nova"
        placeholder="Search our digital gift cards "
      />
      <CloseOutlined
        v-if="search"
        @click="clearSearch"
        class="text-sm !text-white/70 absolute right-2 cursor-pointer"
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
