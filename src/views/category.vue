<template>
  <div class="container mx-auto px-8">
    <ul class="flex flex-col gap-4" v-if="cats.length">
      <li
        class="bg-white py-3 px-5 rounded-lg"
        v-for="(cat, index) in cats"
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
  <div class="container mx-auto px-8 mt-4">
    <div class="flex items-center justify-between gap-4">
      <router-link
        class="text-center bg-primary text-white py-2 w-1/2 rounded-md"
        :to="{ name: 'Profile', params: {} }"
      >
        <span class="text-lg">Profile</span>
      </router-link>
      <router-link
        class="text-center bg-primary text-white py-2 w-1/2 rounded-md"
        :to="{ name: 'NewCategory', params: {} }"
      >
        <span>Add new category</span>
      </router-link>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
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
    return { cats, handleDelete };
  },
};
</script>
