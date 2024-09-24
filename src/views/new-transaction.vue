<template>
  <form @submit.prevent="onSubmit">
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
              <span class="block mt-2 text-red" v-if="notelError">{{
                notelError
              }}</span>
            </div>
          </div>
          <div class="group flex items-center gap-4">
            <div class="item-left w-1/6 text-right">
              <i class="t2ico-calendar text-xl"></i>
            </div>
            <div class="item-right w-5/6 border-b border-gray-100 py-3">
              <div class="text-dark">{{ time }}</div>
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
                  @change="onChangeFile"
                />
                <div class="text-gray-700" v-if="file">{{ file.name }}</div>
                <div class="text-primary" v-else>Upload photos</div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Start: Error -->
    <div class="container mx-auto px-8 mt-2" v-if="errorFile">
      <span class="text-red">{{ errorFile }}</span>
    </div>
    <!-- Start: Button submit -->
    <div class="row mt-6">
      <div class="container px-8 mx-auto">
        <button
          v-if="!isPending"
          type="submit"
          class="py-2 w-full text-center bg-primary text-white text-lg rounded-md"
        >
          Add
        </button>
        <button
          v-else
          type="submit"
          class="py-2 w-full text-center bg-gray-500 text-white text-lg rounded-md"
        >
          Adding...
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { ref, onMounted } from "vue";
import { useUser } from "@/composables/useUser";
import useCollection from "@/composables/useCollection";
import useStorage from "@/composables/useStorage";
import { useField, useForm } from "vee-validate";
import * as yub from "yup";
import useCategory from "@/composables/useCategory";
export default {
  setup() {
    const isMoreDetail = ref(false);
    //const total = ref(0);
    // const category = ref("");
    //const note = ref("");
    const time = ref(new Date());
    //const person = ref("");
    //const location = ref("");
    const { getUser } = useUser();
    const { user } = getUser();
    const { url, uploadFile } = useStorage("transactions");
    const { error, isPending, addRecord } = useCollection("transactions");
    const file = ref(null);
    const errorFile = ref(null);

    const schema = yub.object({
      total: yub.number().required("Total cannot be left blank"),
      category: yub.string().required("Category cannot be left blank"),
      note: yub.string().required("Note cannot be left blank"),
      person: yub.string().required("Person cannot be left blank"),
      location: yub.string().required("Location cannot be left blank"),
    });

    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    const { value: total, errorMessage: totalError } = useField("total");
    const { value: category, errorMessage: categoryError } =
      useField("category");
    const { value: note, errorMessage: notelError } = useField("note");
    const { value: person, errorMessage: personError } = useField("person");
    const { value: location, errorMessage: locationError } =
      useField("location");
    function onChangeFile(event) {
      const selected = event.target.files[0];
      const typeFile = ["image/png", "image/jpg", "image/heic", "image/jpeg"];
      //console.log(selected);
      if (selected && typeFile.includes(selected.type)) {
        file.value = selected;
        //console.log(file.value);
      } else {
        console.log("error");
        file.value = null;
        errorFile.value =
          "Invalid file format. (Please select a file with the extension .png, .jpg, jpeg, heic)";
      }
    }

    const { getCollectionCategory } = useCategory();
    const cats = ref([]);
    async function fectCategory() {
      try {
        cats.value = await getCollectionCategory();
        // console.log(cats.value);
      } catch (err) {
        console.log(err);
        error.value = err.message;
      }
    }
    onMounted(() => {
      fectCategory();
    });
    const onSubmit = handleSubmit(async () => {
      if (file.value) await uploadFile(file.value);
      const transactions = {
        total: total.value,
        category: category.value,
        note: note.value,
        time: time.value,
        location: location.value,
        person: person.value,
        userID: user.value.uid,
        thumbnail: url.value,
      };

      await addRecord(transactions);
    });
    return {
      file,
      total,
      category,
      note,
      time,
      location,
      person,
      totalError,
      categoryError,
      notelError,
      personError,
      locationError,
      isMoreDetail,
      onSubmit,
      error,
      isPending,
      addRecord,
      onChangeFile,
      errorFile,
      fectCategory,
      cats,
    };
  },
};
</script>
