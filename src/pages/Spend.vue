<script setup>
import { SearchOutlined } from "@ant-design/icons-vue";
import { RouterLink } from "vue-router";
</script>
<template>
  <div>
    <div
      class="border rounded-lg h-10 border-gray-200/20 relative pl-11 pr-3 flex items-center"
    >
      <SearchOutlined class="text-lg absolute left-3.5" />
      <input
        type="search"
        class="text-lg w-full border-none outline-none font-nova"
        placeholder="Search our digital gift cards "
      />
    </div>
    <div class="mt-4 grid grid-cols-2 gap-2.5">
      <template v-for="i in 6" :key="i">
        <router-link :to="{ name: 'CardOne', params: { id: i } }">
          <img src="@/assets/img/amazon.png" />
        </router-link>
      </template>
    </div>
  </div>
</template>
