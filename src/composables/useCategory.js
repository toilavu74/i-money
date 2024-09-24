import { ref } from "vue";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { projectFirestore } from "@/configs/firebase";
import { useUser } from "./useUser";

function useCategory() {
  const error = ref(null);
  const isPending = ref(false);
  async function getCollectionCategory() {
    error.value = null;
    const { getUser } = useUser();
    const { user } = getUser();
    try {
      const categoryCollectionRef = query(
        collection(projectFirestore, "category"),
        where("userID", "==", user.value.uid)
      );
      const querySnapshot = await getDocs(categoryCollectionRef);
      const category = ref([]);
      querySnapshot.forEach((doc) => {
        category.value.push({ id: doc.id, ...doc.data() });
      });

      //console.log(category.value);
      return category.value;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }

  async function editCategory(id) {
    //console.log(id);
    error.value = null;
    try {
      const docRef = doc(projectFirestore, "category", id);
      const docSnap = await getDoc(docRef);
      //console.log(docSnap);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        throw new Error("Category does not exist");
      }
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }
  async function updateCategory(id, updatedData) {
    error.value = null;
    isPending.value = true;
    try {
      const docRef = doc(projectFirestore, "category", id);
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
  async function deleteCategory(id) {
    error.value = null;
    try {
      const docRef = doc(projectFirestore, "category", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(err);
      error.value = err.message;
    }
  }
  return {
    error,
    isPending,
    getCollectionCategory,
    editCategory,
    updateCategory,
    deleteCategory,
  };
}

export default useCategory;
