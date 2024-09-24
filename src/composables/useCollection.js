import { ref } from "vue";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { projectFirestore } from "@/configs/firebase";
import { useUser } from "./useUser";

function useCollection(name) {
  const error = ref(null);
  const isPending = ref(false);

  async function addRecord(record) {
    error.value = null;
    isPending.value = true;
    try {
      const respone = await addDoc(collection(projectFirestore, name), record);
      return respone;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      isPending.value = false;
    }
  }

  async function getCollectionTransactions() {
    error.value = null;
    const { getUser } = useUser();
    const { user } = getUser();
    try {
      const transactionsCollectionRef = query(
        collection(projectFirestore, "transactions"),
        where("userID", "==", user.value.uid)
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
    addRecord,
    getCollectionTransactions,
  };
}

export default useCollection;
