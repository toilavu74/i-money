import { ref } from "vue";
import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
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
  async function editTransaction(id) {
    //console.log(id);
    error.value = null;
    try {
      const docRef = doc(projectFirestore, "transactions", id);
      const docSnap = await getDoc(docRef);
      //console.log(docSnap);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("Transactions does not exist");
      }
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }
  async function updateTransactions(id, updatedData) {
    error.value = null;
    isPending.value = true;
    try {
      const docRef = doc(projectFirestore, "transactions", id);
      await updateDoc(docRef, {
        ...updatedData,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      isPending.value = false;
    }
  }
  return {
    error,
    isPending,
    getTransactions,
    editTransaction,
    updateTransactions,
  };
}

export default useTransactions;
