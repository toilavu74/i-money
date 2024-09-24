<template>
  <div class="bg-white">
    <div class="container mx-auto px-8">
      <div class="row py-5">
        <form @submit.prevent="updateCat">
          <div class="form-row">
            <label for="nameCat" class="flex flex-col gap-3">
              <span>Name</span>
              <input
                v-model="nameCat"
                class="outline-none border-b pl-2 border-gray-200"
                type="text"
                name="nameCat"
                id="nameCat"
                placeholder="nameC"
              />
            </label>
            <span class="text-red mt-2 block">{{ nameError }}</span>
          </div>
          <div class="form-row flex items-center gap-3">
            <div class="f-left w-1/2">
              <button
                @click="onCat"
                class="py-2 w-full mt-4 text-center bg-primary text-white text-lg rounded-md"
              >
                Category
              </button>
            </div>
            <div class="f-right w-1/2">
              <button
                v-if="!isPending"
                type="submit"
                class="py-2 w-full mt-4 text-center bg-primary text-white text-lg rounded-md"
              >
                Update
              </button>
              <button
                v-else
                type="submit"
                class="py-2 mt-4 w-full text-center bg-gray-500 text-white text-lg rounded-md"
              >
                Updating...
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import useCategory from "@/composables/useCategory";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yub from "yup";
export default {
  setup() {
    const { editCategory, updateCategory, isPending } = useCategory();
    const cats = ref({});
    const route = useRoute();
    const router = useRouter();
    const catID = computed(() => route.params.id);
    async function fetchCategory(id) {
      const data = await editCategory(id);
      if (data) {
        cats.value = data;
        nameCat.value = data.nameCat;
      }
    }
    onMounted(() => {
      //console.log(route);
      fetchCategory(catID.value);
    });

    const schema = yub.object({
      nameCat: yub
        .string()
        .required("Name cannot be left blank")
        .min(2, "Name must be at least 2characters long"),
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    const { value: nameCat, errorMessage: nameError } = useField("nameCat");
    const updateCat = handleSubmit(async () => {
      const updatedData = { ...cats.value, nameCat: nameCat.value };
      await updateCategory(catID.value, updatedData);
    });
    function onCat() {
      router.push({ name: "Category", params: {} });
    }
    return { cats, updateCat, isPending, nameError, nameCat, onCat };
  },
};
</script>
