<script setup>
import LevelCard from "@/components/LevelCard.vue";
</script>
<template>
  <div>
    <span class="font-bold uppercase font-nova text-lg justify-center flex mb-5"
      >Level Up Your NFTs!</span
    >
    <div class="grid grid-cols-2 gap-3">
      <template v-for="i in 6" :key="i">
        <level-card :data="{ level: i }" />
      </template>
    </div>
  </div>
</template>
