import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
	const queryClient = useQueryClient();
	const [searchParams] = useSearchParams();

	//FILTER
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };

	//SORTING

	const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };

	//PAGINATION
	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

	//QUERY
	const {
		data: { data: bookings, count } = {},
		isLoading,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getAllBookings({ filter, sortBy, page }),
	});

	//PRE-FETCHING
	const pageCount = Math.ceil(count / PAGE_SIZE);

	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
		});

	return { isLoading, error, bookings, count };
}