<script setup>
import { ref } from "vue";
import useTask from "@/stores/task.pinia";
import useProfile from "@/stores/user.pinia";
import { message } from "ant-design-vue";

const emit = defineEmits(["confirmed"]);
const taskPinia = useTask();
const profilePinia = useProfile();

const clickedType = ref(0);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

function goToChannel() {
  if (props.data?.channel && clickedType.value !== 1) {
    clickedType.value = 1;
    window.open(props.data.channel, "_blank");
  }
}

function confirm() {
  taskPinia.checkTask(props.data.platform, props.data.channel_id, (data) => {
    profilePinia.getProfile();
    message.success(data);
    clickedType.value = 0;
    emit("confirmed");
  });
}
</script>
<template>
  <div
    @click="goToChannel"
    class="flex gap-2 justify-between items-center py-2.5 px-3.5 w-full rounded-lg bg-dark-200"
  >
    <div
      class="flex gap-2 items-center"
      :class="clickedType == 1 && ' max-w-[calc(100%-90px)]'"
    >
      <img :src="data.icon" class="h-7" />
      <div class="flex flex-col overflow-hidden">
        <span class="text-base font-semibold truncate">{{ data.task }}</span>
        <span class="text-xs text-primary font-semibold font-nova"
          >+10 BITs
        </span>
      </div>
    </div>
    <button
      @click="confirm"
      v-if="clickedType == 1"
      class="btn-primary min-w-max px-2.5 hover:opacity-80 h-8 rounded-md"
    >
      Confirm
    </button>
  </div>
</template>
