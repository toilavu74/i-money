<template>
  <div class="bg-white">
    <div class="container mx-auto px-8">
      <div class="row py-5">
        <form @submit.prevent="onSubmit">
          <div class="form-row">
            <label for="nameCat" class="flex flex-col gap-3">
              <span>Name</span>
              <input
                v-model="nameCat"
                class="outline-none border-b pl-2 border-gray-200"
                type="text"
                name="nameCat"
                id="nameCat"
                placeholder="Example"
              />
            </label>
            <span class="text-red mt-2 block">{{ nameError }}</span>
          </div>
          <div class="form-row">
            <button
              v-if="!isPending"
              type="submit"
              class="py-2 w-full mt-4 text-center bg-primary text-white text-lg rounded-md"
            >
              Add
            </button>
            <button
              v-else
              type="submit"
              class="py-2 mt-4 w-full text-center bg-gray-500 text-white text-lg rounded-md"
            >
              Adding...
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import useCollection from "@/composables/useCollection";
import { useForm, useField } from "vee-validate";
import { useUser } from "@/composables/useUser";
import * as yub from "yup";
export default {
  setup() {
    const { error, isPending, addRecord } = useCollection("category");
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
    const onSubmit = handleSubmit(async () => {
      const { getUser } = useUser();
      const { user } = getUser();
      const createdAt = new Date();
      const cats = {
        nameCat: nameCat.value,
        userID: user.value.uid,
        createdAt: createdAt,
        updatedAt: createdAt,
      };
      await addRecord(cats);
    });
    return { error, isPending, nameCat, onSubmit, nameError, addRecord };
  },
};
</script>
