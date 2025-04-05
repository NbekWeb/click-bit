<script setup>
import { ref } from "vue";
import useVideo from "@/stores/video.pinia";
import useCore from "@/stores/core.pinia";
import useProfile from "@/stores/user.pinia";
import { storeToRefs } from "pinia";
import { message } from "ant-design-vue";

const placement = ref("bottom");
const videoRef = ref(null);
const videoPinia = useVideo();
const corePinia = useCore();
const profilePinia = useProfile();

const { loadingUrl } = storeToRefs(corePinia);
const { video, click } = storeToRefs(videoPinia);

const open = ref(false);
const modal = ref(false);
const countdown = ref(5); // Starting countdown from 5 seconds
const isButtonVisible = ref(false); // Button visibility flag
const isButtonDisabled = ref(true); // Initially disabled

const showDrawer = () => {
  open.value = true;
  videoPinia.getVideo(() => {});
};
const onClose = () => {
  open.value = false;
};

const openModal = () => {
  modal.value = !modal.value;
};

const cancel = () => {
  onClose();
  videoRef.value?.pause();
  video.value = {};
};

defineExpose({ showDrawer });

const startCountdown = () => {
  videoRef.value?.play();
  isButtonVisible.value = true;
  isButtonDisabled.value = true;

  const interval = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value -= 1;
    } else {
      clearInterval(interval);
      isButtonDisabled.value = false;
    }
  }, 1000);
};

const confirmAction = () => {
  isButtonVisible.value = false;
  countdown.value = 5;
  videoRef.value?.pause();
  video.value = {};
  videoPinia.postClick(() => {
    message.success(`${click.value} Bits added!`);
    profilePinia.getProfile(() => {
      videoPinia.getVideo(() => {
        isButtonVisible.value = false;
      });
    });
  });
};
</script>

<template>
  <div>
    <a-drawer
      class="required"
      height="auto"
      title=""
      :placement="placement"
      :open="open"
      @close="onClose"
    >
      <a-spin :spinning="loadingUrl.has('videos/')">
        <div
          class="text-white relative h-[90vh] max-h-[90vh] flex flex-col gap-2 justify-between"
        >
          <span
            @click="onClose"
            class="flex hover:cursor-pointer min-h-1.5 w-16 bg-dark-300 rounded justify-center mx-auto"
          ></span>
          <video
            ref="videoRef"
            v-if="video?.files"
            class="w-full h-[85%] object-cover rounded"
            :src="video.files"
          >
            Your browser does not support the video tag.
          </video>
          <div class="flex gap-4 items-center">
            <button class="btn-orange rounded-md w-full h-12.5" @click="cancel">
              <span class="text-base font-semibold font-nova"> Cancel </span>
            </button>

            <button
              v-if="isButtonVisible"
              class="btn-primary rounded-md w-full h-12.5"
              :class="isButtonDisabled && 'opacity-50'"
              :disabled="isButtonDisabled"
              @click="confirmAction"
            >
              <span class="text-base font-semibold font-nova">
                Confirm {{ isButtonDisabled ? `${countdown}s` : "" }}
              </span>
            </button>
            <button
              v-else
              class="btn-primary rounded-md w-full h-12.5"
              @click="startCountdown"
            >
              <span class="text-base font-semibold font-nova"> Start </span>
            </button>
          </div>
        </div>
      </a-spin>
    </a-drawer>
  </div>
</template>

<style scoped></style>
