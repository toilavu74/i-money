<template>
  <div class="container mx-auto px-8">
    <ul class="flex items-center gap-2" v-if="filterOptions.length">
      <li v-for="option in filterOptions" :key="option.value">
        <button
          class="filter-btn text-[14px] bg-white text-gray-500 py-1 px-3 rounded-md"
          @click="filterType = option.value"
          :class="{ active: filterType === option.value }"
        >
          {{ option.text }}
        </button>
      </li>
    </ul>
    <ul class="flex flex-col gap-3 mt-6" v-if="filteredTransactions.length">
      <li v-for="transaction in filteredTransactions" :key="transaction.id">
        <router-link
          :to="{ name: 'EditTransactions', params: { id: transaction.id } }"
        >
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
                {{ formatCurrency(transaction.total) }}
              </h3>
              <p class="text-gray-400 text-sm">
                {{ formatDate(transaction.time.toDate()) }}
              </p>
            </div>
          </div>
        </router-link>
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
import { ref, onMounted, computed } from "vue";
import useTransactions from "@/composables/useTransaction";
import { formatDate, formatCurrency } from "@/constants/import";
export default {
  setup() {
    const filterOptions = ref([
      {
        text: "All",
        value: "all",
      },
      {
        text: "Week",
        value: "week",
      },
      {
        text: "Month",
        value: "month",
      },
      {
        text: "Year",
        value: "year",
      },
    ]);

    const transactions = ref([]);
    const error = ref(null);
    const { getTransactions } = useTransactions();
    async function fecthTransactions() {
      try {
        transactions.value = await getTransactions();
        //console.log(transactions.value);
        return transactions.value;
      } catch (err) {
        console.log(err);
        error.value = err.message;
      }
    }
    //console.log(transactions);
    onMounted(() => {
      fecthTransactions();
    });

    const filterType = ref("all");
    function getStartOfWeek(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Lấy Thứ Hai là ngày đầu tuần
      return new Date(date.setDate(diff));
    }
    const filteredTransactions = computed(() => {
      const now = new Date();
      return transactions.value.filter((transaction) => {
        // Kiểm tra nếu transaction.time là một Firebase Timestamp, thì chuyển thành đối tượng Date
        const transactionDate =
          transaction.time instanceof Date
            ? transaction.time
            : transaction.time.toDate();

        switch (filterType.value) {
          case "week": {
            const startOfWeek = getStartOfWeek(new Date(now));
            return transactionDate >= startOfWeek;
          }
          case "month": {
            return (
              transactionDate.getMonth() === now.getMonth() &&
              transactionDate.getFullYear() === now.getFullYear()
            );
          }
          case "year": {
            return transactionDate.getFullYear() === now.getFullYear();
          }
          default:
            return true; // Hiển thị tất cả các giao dịch (All)
        }
      });
    });

    return {
      filterOptions,
      transactions,
      formatCurrency,
      formatDate,
      filteredTransactions,
      filterType,
    };
  },
};
</script>
