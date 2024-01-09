import { useSearchParams } from 'react-router-dom';
import { getBookings } from '../../services/apiBookings';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const filterValue = searchParams.get("status")
    const sortByRaw = searchParams.get("sortBy") || "startDate-asc"
    const currentPage = !searchParams.get("page") ? 1 : +searchParams.get("page")
    const [field, direction] = sortByRaw.split("-")
    const sortBy = { field, direction }
    const filterArray = [
        // { method: "lt", field: "totalPrice", value: 1000 },
        // { method: "gt", field: "totalPrice", value: 5000 },
        { method: "eq", field: "status", value: filterValue }
    ]
    const filter = !filterValue || filterValue === "all"
        ? null
        : filterArray
    const { data: { data: bookings, count } = {}, error, isLoading } = useQuery({
        queryKey: ["bookings", filter, sortBy, currentPage],
        queryFn: () => getBookings({ filter, sortBy, currentPage }),
    })
    const pageCount = Math.ceil(count / PAGE_SIZE)
    if (currentPage < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, currentPage + 1],
            queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage + 1 })
        })
    }
    if (currentPage > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, currentPage - 1],
            queryFn: () => getBookings({ filter, sortBy, currentPage: currentPage - 1 })
        })
    }
    return { bookings, pageCount, error, isLoading, currentPage };
}

