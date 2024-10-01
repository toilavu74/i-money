<template>
  <div class="container mx-auto px-8">
    <ul class="flex flex-col gap-3" v-if="paginatedData.length">
      <li class="bg-white rounded-lg">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          class="w-full h-[45px] px-5 rounded-lg outline-none"
        />
      </li>
      <li class="bg-white px-4 py-3 rounded-lg">
        <span class="font-bold text-lg text-rose-500"
          >Total: {{ formatCurrency(totalSum) }}</span
        >
      </li>
      <li v-for="transaction in paginatedData" :key="transaction.id">
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
                    {{ transaction.note }}
                  </h3>
                  <p class="text-gray-400 text-sm">
                    {{ transaction.category }}
                  </p>
                </div>
              </div>
            </div>
            <div class="item-right text-right">
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
    <div
      class="pagination-controls mt-5 flex justify-center items-center gap-1"
    >
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
.pagination-controls button {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #0012ff;
  font-size: 14px;
  background: #fff;
  color: #0012ff;
}
.pagination-controls button.active {
  @apply bg-primary;
  color: #fff;
}
</style>
<script>
import { ref, onMounted, computed } from "vue";
import useTransactions from "@/composables/useTransaction";
import { formatDate, formatCurrency } from "@/constants/import";
export default {
  setup() {
    const transactions = ref([]);
    const error = ref(null);
    const { getTransactions } = useTransactions();
    const totalSum = ref();
    async function fecthTransactions() {
      try {
        transactions.value = await getTransactions();
        //console.log(transactions.value);
        totalSum.value = transactions.value.reduce((sum, transaction) => {
          return sum + (transaction.total || 0);
        }, 0);
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
    const searchQuery = ref("");
    const filteredTransactions = computed(() => {
      const query = searchQuery.value.toLocaleLowerCase();
      return transactions.value.filter((transaction) => {
        return (
          transaction.category.toLowerCase().includes(query) ||
          transaction.note.toLowerCase().includes(query) ||
          transaction.total.toString().includes(query)
        );
      });
    });
    const itemsPerPage = ref(6);
    const currentPage = ref(1);

    const totalPages = computed(() => {
      return Math.ceil(filteredTransactions.value.length / itemsPerPage.value);
    });

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredTransactions.value.slice(start, end);
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
      transactions,
      formatDate,
      totalSum,
      formatCurrency,
      itemsPerPage,
      currentPage,
      totalPages,
      goToNextPage,
      goToPreviousPage,
      goToPage,
      paginatedData,
      searchQuery,
    };
  },
};
</script>
