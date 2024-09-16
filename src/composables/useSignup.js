import { ref } from "vue";
import { projectAuth } from "@/configs/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const error = ref(null);
const isPending = ref(false);

async function signup(email, password, fullName) {
  isPending.value = true;
  error.value = null;
  try {
    const response = await createUserWithEmailAndPassword(
      projectAuth,
      email,
      password
    );
    if (!response) throw new Error("Could not create a new user.");
    await updateProfile(response.user, { displayName: fullName });
    //console.log(response);
    return response;
  } catch (err) {
    //console.log(err);
    if (err.code === "auth/email-already-in-use") {
      error.value = "The email address is already in use by another account.";
    } else {
      error.value = "Could not create a new user.";
    }
  } finally {
    isPending.value = false;
    error.value = false;
  }
}
export function useSignUp() {
  return {
    error,
    isPending,
    signup,
  };
}
