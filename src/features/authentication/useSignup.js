import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isloading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("user signed up successfully");
    },
    onError: (err) => {
      toast.error("user can't be signed up:/n" + err);
    },
  });
  return { signup, isloading };
}
