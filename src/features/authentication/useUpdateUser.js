import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isloading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("user account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error("user account can't be updated:\n" + err),
  });
  return { updateUser, isloading };
}
