<script setup>
import LevelCard from "@/components/LevelCard.vue";
import Buying from "@/components/Buying.vue";
import useLevel from "@/stores/level.pinia";
import { storeToRefs } from "pinia";
import { reactive, ref, computed } from "vue";
import { Empty } from "ant-design-vue";

const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

const levelPinia = useLevel();

const { levels } = storeToRefs(levelPinia);

const open = ref(false);

const openDrawer = () => {
  open.value = !open.value;
};

const lastActiveLevel = computed(() => {
  const reversedIndex = [...levels.value]
    .reverse()
    .findIndex((item) => item.is_active);
  const originalIndex =
    reversedIndex !== -1 ? levels.value.length - 1 - reversedIndex : -1;
  return originalIndex;
});
</script>
<template>
  <div>
    <span class="font-bold uppercase font-nova text-lg justify-center flex mb-5"
      >Level Up Your NFTs!
    </span>
    <div class="grid grid-cols-2 gap-3" v-if="levels?.length > 0">
      <template v-for="(level, i) in levels" :key="level?.id">
        <level-card
          :data="level"
          @buy="openDrawer"
          :decoration="(i + 1) / (levels?.length > 0 ? levels.length : 1)"
          :buyying="lastActiveLevel + 1 < i"
        />
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
