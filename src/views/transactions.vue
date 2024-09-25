<template>
  <div class="container mx-auto px-8">
    <ul class="flex flex-col gap-3" v-if="transactions.length">
      <li class="bg-white px-4 py-3 rounded-lg">
        <span class="font-bold text-lg text-rose-500"
          >Total: {{ totalSum }} VND</span
        >
      </li>
      <li v-for="transaction in transactions" :key="transaction.id">
        <div
          class="flex items-center justify-between bg-white px-4 py-3 rounded-lg"
        >
          <div class="item-left">
            <div class="item-content flex items-center gap-3">
              <div
                class="img w-10 h-10 rounded-md overflow-hidden"
                v-if="transaction.thumbnail"
              >
                <img
                  class="w-full h-full object-cover"
                  :src="transaction.thumbnail"
                  alt="Images transaction"
                />
              </div>
              <span v-else class="block w-10 h-10 rounded-md"></span>
              <div class="text">
                <h3 class="font-bold text-black text-sm">
                  {{ transaction.category }}
                </h3>
                <p class="text-gray-400 text-sm">
                  {{ transaction.note }}
                </p>
              </div>
            </div>
          </div>
          <div class="item-right">
            <h3 class="font-bold text-red text-lg">
              {{ transaction.total }} VND
            </h3>
            <p class="text-gray-400 text-sm">
              {{ formatDate(transaction.time.toDate()) }}
            </p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
ul li:nth-child(odd) .item-left .item-content span {
  @apply bg-rose-100;
}
ul li:nth-child(even) .item-left .item-content span {
  @apply bg-green;
}
ul li:nth-child(3n) .item-left .item-content span {
  @apply bg-orange-300;
}
</style>
<script>
import { ref, onMounted } from "vue";
import useTransactions from "@/composables/useTransaction";
import { formatDate } from "@/constants/import";
export default {
  setup() {
    const transactions = ref([]);
    const error = ref(null);
    const { getTransactions } = useTransactions();
    const totalSum = ref();
    async function fectTransactions() {
      try {
        transactions.value = await getTransactions();
        //console.log(transactions.value);
        // Tính tổng 'total' của tất cả các giao dịch
        totalSum.value = transactions.value.reduce((sum, transaction) => {
          return sum + (transaction.total || 0); // Đảm bảo cộng giá trị, tránh undefined
        }, 0); // Giá trị khởi tạo của sum là 0
      } catch (err) {
        console.log(err);
        error.value = err.message;
      }
    }

    onMounted(() => {
      fectTransactions();
    });
    return { transactions, formatDate, totalSum };
  },
};
</script>
