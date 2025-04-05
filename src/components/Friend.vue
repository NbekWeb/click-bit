<script setup>
import ProfileIcon from "@/components/icons/profile.vue";
</script>

<template>
  <div
    class="rounded-md bg-dark-200 h-14 text-base font-nova flex items-center justify-between px-3"
  >
    <div class="flex items-center gap-4">
      <profile-icon class="text-2xl" />
      <span class="font-semibold">@JononTon</span>
    </div>
    <span class="flex py-1.5 px-4 btn-orange"> 1.000.000</span>
  </div>
</template>
