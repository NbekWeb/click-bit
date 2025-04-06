<script setup>
import ProfileIcon from "@/components/icons/profile.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

function formatNumber(value) {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
</script>

<template>
  <div
    class="rounded-md bg-dark-200 h-14 text-base font-nova flex items-center justify-between px-3"
  >
    <div class="flex items-center gap-4">
      
      <profile-icon class="text-2xl" />
      
      <span class="font-semibold">{{
        data?.username ? `@${data.username}` : data?.first_name
      }}</span>
    </div>
    <span class="flex py-1.5 px-4 btn-orange">
      {{ formatNumber(data.user_level?.[0]?.total_bit) }}</span
    >
  </div>
</template>
