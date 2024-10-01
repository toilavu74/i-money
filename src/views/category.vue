<template>
  <div class="container mx-auto px-8 mb-4">
    <div class="flex items-center justify-between gap-4">
      <router-link
        class="text-center bg-primary text-white py-2 w-1/2 rounded-md"
        :to="{ name: 'Profile', params: {} }"
      >
        <span>Profile</span>
      </router-link>
      <router-link
        class="text-center bg-primary text-white py-2 w-1/2 rounded-md"
        :to="{ name: 'NewCategory', params: {} }"
      >
        <span>Add new category</span>
      </router-link>
    </div>
  </div>
  <div class="container mx-auto px-8">
    <ul class="flex flex-col gap-4" v-if="paginatedData.length">
      <li
        class="bg-white py-3 px-5 rounded-lg"
        v-for="(cat, index) in paginatedData"
        :key="cat.userID"
      >
        <div class="item flex justify-between">
          <div class="item-left">
            <router-link
              :to="{ name: 'EditCategory', params: { id: cat.id } }"
              class="py-2 hover:text-primary"
            >
              {{ cat.nameCat }}
            </router-link>
          </div>
          <div class="item-right flex items-center gap-3">
            <router-link :to="{ name: 'EditCategory', params: { id: cat.id } }">
              <span class="text-primary text-sm">Edit</span>
            </router-link>
            <button
              class="text-red text-sm"
              @click="handleDelete(cat.id, index)"
            >
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="pagination-controls mt-5 flex justify-center items-center gap-1">
    <button
      @click="goToPreviousPage"
      :disabled="currentPage === 1"
      class="rotate-180"
      :class="{ 'cursor-not-allowed': currentPage === 1 }"
    >
      <i class="t2ico-arrow-right"></i>
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>
    <button
      @click="goToNextPage"
      :disabled="currentPage === totalPages"
      :class="{ 'cursor-not-allowed': currentPage === totalPages }"
    >
      <i class="t2ico-arrow-right"></i>
    </button>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import useCategory from "@/composables/useCategory.js";
export default {
  setup() {
    const cats = ref([]);
    const error = ref(null);
    const { getCollectionCategory, deleteCategory } = useCategory();
    async function fectCategory() {
      try {
        cats.value = await getCollectionCategory();
      } catch (err) {
        console.log(err);
        error.value = err.message;
      }
    }
    onMounted(() => {
      fectCategory();
    });
    async function handleDelete(id, index) {
      error.value = null;
      try {
        await deleteCategory(id);
        cats.value.splice(index, 1);
      } catch (err) {
        console.log(err);
        error.value = err.message;
      }
    }

    const itemsPerPage = ref(6);
    const currentPage = ref(1);

    const totalPages = computed(() => {
      return Math.ceil(cats.value.length / itemsPerPage.value);
    });

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return cats.value.slice(start, end);
    });

    const goToPreviousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const goToNextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };

    return {
      cats,
      handleDelete,
      paginatedData,
      goToPreviousPage,
      goToNextPage,
      goToPage,
      totalPages,
      currentPage,
    };
  },
};
</script>
