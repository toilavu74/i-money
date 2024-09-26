<template>
  <form @submit.prevent="onUpdate">
    <!-- Start: Total -->
    <div class="row py-4 bg-white">
      <div class="container mx-auto px-8">
        <div class="row">
          <div class="group flex items-top gap-4">
            <div class="item-left w-1/6 text-right">
              <span
                class="text-xs py-0.5 px-1 rounded-md border border-black mt-4 inline-block"
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
                v-model.number="total"
              />
              <span class="block mt-2 text-red" v-if="totalError">{{
                totalError
              }}</span>
            </div>
          </div>
          <div class="group flex items-center gap-4">
            <div class="item-left w-1/6 text-right">
              <span
                class="bg-yellow-500 py-0.5 px-1 rounded-full inline-block w-8 h-8"
              ></span>
            </div>
            <div class="item-right w-5/6 border-b border-gray-100 py-3">
              <select
                name="category"
                class="w-full outline-none text-black"
                id="category"
                v-if="cats.length"
                v-model="category"
              >
                <option v-for="cat in cats" :key="cat.id" :value="cat.nameCat">
                  {{ cat.nameCat }}
                </option>
              </select>
              <span class="block mt-2 text-red" v-if="categoryError">{{
                categoryError
              }}</span>
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
                v-model="note"
              />
              <span class="block mt-2 text-red" v-if="noteError">{{
                noteError
              }}</span>
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

    <!-- Start: Avanced -->
    <div class="avanced">
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
                v-model="location"
              />
              <span class="block mt-2 text-red" v-if="locationError">{{
                locationError
              }}</span>
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
                v-model="person"
              />
              <span class="block mt-2 text-red" v-if="personError">{{
                personError
              }}</span>
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
            <div class="item-right w-5/6 py-3">
              <label for="file">
                <input
                  type="file"
                  id="file"
                  class="outline-none text-sm text-black w-0 h-0 overflow-hidden absolute"
                />
                <div class="text-primary">Upload photos</div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Start: Error -->
    <div class="container mx-auto px-8 mt-2">
      <span class="text-red"></span>
    </div>
    <!-- Start: Button submit -->
    <div class="row mt-6">
      <div class="container px-8 mx-auto">
        <button
          v-if="!isPending"
          type="submit"
          class="py-2 w-full text-center bg-primary text-white text-lg rounded-md"
        >
          Update
        </button>
        <button
          v-else
          type="submit"
          class="py-2 w-full text-center bg-gray-500 text-white text-lg rounded-md"
        >
          Updating...
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import useTransactions from "@/composables/useTransaction";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import useCategory from "@/composables/useCategory";
export default {
  setup() {
    const transactions = ref([]);
    const { editTransaction, updateTransactions, isPending } =
      useTransactions();
    const route = useRoute();
    const transactionId = computed(() => route.params.id);
    //console.log(transactionId);
    const { getCollectionCategory } = useCategory();
    const cats = ref([]);
    const schema = yup.object({
      total: yup.number().required(),
      category: yup.string().required(),
      note: yup.string().required(),
      location: yup.string().required(),
      person: yup.string().required(),
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });

    const { value: total, errorMessage: totalError } = useField("total");
    const { value: category, errorMessage: categoryError } =
      useField("category");
    const { value: note, errorMessage: noteError } = useField("note");
    const { value: location, errorMessage: locationError } =
      useField("location");
    const { value: person, errorMessage: personError } = useField("person");

    async function fectCategory() {
      try {
        cats.value = await getCollectionCategory();
        // console.log(cats.value);
      } catch (err) {
        console.log(err);
        // error.value = err.message;
      }
    }

    async function fetchTransactions(id) {
      const data = await editTransaction(id);
      if (data) {
        transactions.value = data;
        console.log(transactions.value);
        total.value = data.total;
        category.value = data.category;
        note.value = data.note;
        location.value = data.location;
        person.value = data.person;
      }
    }
    onMounted(() => {
      fetchTransactions(transactionId.value);
      fectCategory();
    });

    const onUpdate = handleSubmit(async () => {
      const updatedData = {
        ...transactions.value,
        total: total.value,
        category: category.value,
        note: note.value,
        location: location.value,
        person: person.value,
      };
      await updateTransactions(transactionId.value, updatedData);
    });
    return {
      onUpdate,
      total,
      category,
      note,
      location,
      person,
      totalError,
      categoryError,
      noteError,
      locationError,
      personError,
      isPending,
      cats,
    };
  },
};
</script>
