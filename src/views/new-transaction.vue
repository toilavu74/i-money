<template>
  <form @submit.prevent="onSubmit">
    <!-- Start: Total -->
    <div class="row py-4 bg-white">
      <div class="container mx-auto px-8">
        <div class="row">
          <div class="group flex items-end gap-4">
            <div class="item-left w-1/6 text-right">
              <span
                class="text-xs py-0.5 px-1 rounded-md border border-black mb-4 inline-block"
                >USD</span
              >
            </div>
            <div class="item-right w-5/6 border-b border-gray-100 pb-2">
              <span class="text-sm">Total</span>
              <input
                type="text"
                placeholder="0"
                id="total"
                class="w-full outline-none text-2xl text-black"
              />
            </div>
          </div>
          <div class="group flex items-center gap-4">
            <div class="item-left w-1/6 text-right">
              <span
                class="bg-yellow-500 py-0.5 px-1 rounded-full inline-block w-8 h-8"
              ></span>
            </div>
            <div class="item-right w-5/6 border-b border-gray-100 py-3">
              <input
                type="text"
                placeholder="Select category"
                id="category"
                class="w-full outline-none text-xl text-black"
              />
            </div>
          </div>
          <div class="group flex items-center gap-4">
            <div class="item-left w-1/6 text-right">
              <i class="t2ico-document text-xl"></i>
            </div>
            <div class="item-right w-5/6 border-b border-gray-100 py-3">
              <input
                type="text"
                placeholder="Note"
                id="note"
                class="w-full outline-none text-sm text-black"
              />
            </div>
          </div>
          <div class="group flex items-center gap-4">
            <div class="item-left w-1/6 text-right">
              <i class="t2ico-calendar text-xl"></i>
            </div>
            <div class="item-right w-5/6 border-b border-gray-100 py-3">
              <div class="text-dark">Sun, 28 Dec 2021</div>
            </div>
          </div>
          <div class="group flex items-center gap-4">
            <div class="item-left w-1/6 text-right">
              <i class="t2ico-wallet text-xl"></i>
            </div>
            <div class="item-right w-5/6 pt-3 pb-2">
              <div class="text-dark">Wallet</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Start: More Details -->
    <div class="row mt-6 bg-white text-center" v-if="!isMoreDetail">
      <button
        @click="isMoreDetail = true"
        class="text-primary text-center py-3"
      >
        More Details
      </button>
    </div>
    <!-- Start: Avanced -->
    <div class="avanced" v-if="isMoreDetail">
      <div class="row mt-6 bg-white">
        <div class="container mx-auto px-8">
          <div class="group flex items-center gap-4">
            <div class="item-left w-1/6 text-right">
              <i class="t2ico-location text-xl"></i>
            </div>
            <div class="item-right w-5/6 border-b border-gray-100 py-3">
              <input
                type="text"
                placeholder="Select a location"
                id="location"
                class="w-full outline-none text-sm text-black"
              />
            </div>
          </div>
          <div class="group flex items-center gap-4">
            <div class="item-left w-1/6 text-right">
              <i class="t2ico-users text-xl"></i>
            </div>
            <div class="item-right w-5/6 py-3">
              <input
                type="text"
                placeholder="With person"
                id="person"
                class="w-full outline-none text-sm text-black"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-6 bg-white">
        <div class="container mx-auto px-8">
          <div class="group flex items-center gap-4">
            <div class="item-left w-1/6 text-right">
              <i class="t2ico-camera text-xl text-primary"></i>
            </div>
            <div class="item-right w-5/6 border-b border-gray-100 py-3">
              <div class="text-primary">Upload photos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const isMoreDetail = ref(false);
    function onSubmit() {}
    return {
      isMoreDetail,
      onSubmit,
    };
  },
};
</script>
