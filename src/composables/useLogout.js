import { ref } from "vue";
import { projectAuth } from "@/configs/firebase";
import { signOut } from "firebase/auth";

const error = ref(null);
async function logout() {
  error.value = null;
  try {
    const response = await signOut(projectAuth);
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}

export function useLogout() {
  return { error, logout };
}
