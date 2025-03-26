<script setup>
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div
    class="flex gap-2 items-center py-2.5 px-3.5 w-full rounded-lg bg-dark-200"
  >
    <img :src="data.icon" class="h-5" />
    <div class="flex flex-col">
      <span class="text-sm">{{ data.title }}</span>
      <span class="text-xs text-primary font-semibold font-nova"
        >+{{ data.count }} BITs
      </span>
    </div>
  </div>
</template>
