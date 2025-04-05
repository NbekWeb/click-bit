<script setup>
import LevelCard from "@/components/LevelCard.vue";
import Buying from "@/components/Buying.vue";
import useLevel from "@/stores/level.pinia";
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";
import { Empty } from "ant-design-vue";

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const levelPinia = useLevel();

const { levels } = storeToRefs(levelPinia);

const open = ref(false);

const openDrawer = () => {
  open.value = !open.value;
};


</script>
<template>
  <div>
    <span class="font-bold uppercase font-nova text-lg justify-center flex mb-5"
      >Level Up Your NFTs!</span
    >
    <div class="grid grid-cols-2 gap-3" v-if="levels?.length > 0">
      <template v-for="level in levels" :key="level?.id">
        <level-card :data="level" @buy="openDrawer" />
      </template>
    </div>

    <a-drawer
      class="required"
      height="auto"
      title=""
      placement="bottom"
      :open="open"
      @close="openDrawer"
    >
      <Buying />
    </a-drawer>
  </div>
</template>
