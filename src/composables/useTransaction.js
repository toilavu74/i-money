import { ref } from "vue";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { projectFirestore } from "@/configs/firebase";
import { useUser } from "./useUser";

function useTransactions() {
  const error = ref(null);
  const isPending = ref(false);

  async function getTransactions() {
    error.value = null;
    const { getUser } = useUser();
    const { user } = getUser();
    try {
      const transactionsCollectionRef = query(
        collection(projectFirestore, "transactions"),
        where("userID", "==", user.value.uid),
        orderBy("time", "desc")
      );
      const querySnapshot = await getDocs(transactionsCollectionRef);
      const transactions = ref([]);
      querySnapshot.forEach((doc) => {
        transactions.value.push({ id: doc.id, ...doc.data() });
      });

      //console.log(transactions.value);
      return transactions.value;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }
  return {
    error,
    isPending,
    getTransactions,
  };
}

export default useTransactions;
