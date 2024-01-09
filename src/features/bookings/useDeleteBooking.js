import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success("Booking Deleted Successfully");
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error("Booking can't be Deleted"),
  });
  return { deleteBooking, isDeleting };
}
