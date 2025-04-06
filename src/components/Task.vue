<script setup>
import { ref } from "vue";

const clickedType = ref(0);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

function goToChannel() {
  if (props.data?.channel) {
    clickedType.value = 1;
    window.open(props.data.channel, "_blank");
  }
}

function confirm(){
  
}
</script>
<template>
  <div
    @click="goToChannel"
    class="flex justify-between items-center py-2.5 px-3.5 w-full rounded-lg bg-dark-200"
  >
    <div class="flex gap-2 items-center">
      <img :src="data.icon" class="h-7" />
      <div class="flex flex-col">
        <span class="text-base font-semibold">{{ data.task }}</span>
        <span class="text-xs text-primary font-semibold font-nova"
          >+10 BITs
        </span>
      </div>
    </div>
    <button
    @click="confirm"
      v-if="clickedType == 1"
      class="btn-primary px-2.5 hover:opacity-80 h-8 rounded-md"
    >
      Confirm
    </button>
  </div>
</template>
