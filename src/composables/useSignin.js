import { ref } from "vue";
import { projectAuth } from "@/configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);
async function signin(email, password) {
  error.value = null;
  isPending.value = true;
  try {
    const response = await signInWithEmailAndPassword(
      projectAuth,
      email,
      password
    );
    //console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  } finally {
    isPending.value = false;
  }
}

export function useSignIn() {
  return { error, isPending, signin };
}
