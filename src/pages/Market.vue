<script setup>
import LevelCard from "@/components/LevelCard.vue";
import Buying from "@/components/Buying.vue";
import useLevel from "@/stores/level.pinia";
import { storeToRefs } from "pinia";
import { reactive, onMounted, ref } from "vue";

const levelPinia = useLevel();

const { levels } = storeToRefs(levelPinia);

const open = ref(true);

const openDrawer = () => {
  open.value = !open.value;
};

onMounted(() => {
  levelPinia.getLevels();
});
</script>
<template>
  <div>
    <span class="font-bold uppercase font-nova text-lg justify-center flex mb-5"
      >Level Up Your NFTs!</span
    >
    <div class="grid grid-cols-2 gap-3">
      <template v-for="i in 6" :key="i">
        <level-card :data="{ level: i }" @buy="openDrawer" />
      </template>
    </div>
    <a-drawer
      class="required"
      height="auto"
      title=""
      placement="bottom"
      :open="open"
      @close="openDrawer"
    >sa
      <Buying />
    </a-drawer>
  </div>
</template>
