import { ref as vueRef } from "vue";
import { useUser } from "./useUser";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const { getUser } = useUser();
const { user } = getUser();

function useStorage(name) {
  const error = vueRef(null);
  const filePath = vueRef(null);
  const url = vueRef(null);
  async function uploadFile(file) {
    error.value = null;
    filePath.value = `${name}/${user.value.uid}/${file.name}`;
    const storage = getStorage();
    const fileRef = storageRef(storage, filePath.value);
    try {
      await uploadBytes(fileRef, file);
      url.value = await getDownloadURL(fileRef);
      return url.value;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  }
  return { error, filePath, url, uploadFile };
}
export default useStorage;
