import type { User, UserFilters, UserResponse } from "@/types/user";
import { ENDPOINTS } from "@api/endpoints";
import { useGet } from "@hooks/useGet";
import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useUsers = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filters: UserFilters = useMemo(() => {
    const isActiveParam = searchParams.get("is_active");
    return {
      search: searchParams.get("search") || "",
      country: searchParams.get("country") || undefined,
      age: searchParams.get("age")
        ? parseInt(searchParams.get("age")!, 10)
        : undefined,
      is_active:
        isActiveParam === "true"
          ? true
          : isActiveParam === "false"
            ? false
            : undefined,
      sortBy: searchParams.get("sortBy") || "first_name",
      order: (searchParams.get("order") as "asc" | "desc") || "asc",
      page: parseInt(searchParams.get("page") || "1", 10),
      page_size: parseInt(searchParams.get("page_size") || "20", 10),
    };
  }, [searchParams]);

  const { search, country, age, is_active, sortBy, order, page, page_size } =
    filters;

  const queryParams: Record<
    string,
    string | number | boolean | undefined | null
  > = {
    search,
    country,
    age,
    is_active,
    ordering: sortBy ? (order === "desc" ? `-${sortBy}` : sortBy) : undefined,
    page,
    page_size,
  };

  const query = useGet<UserResponse>({
    endpoint: ENDPOINTS.USERS,
    queryParams,
    queryKey: ["users", filters],
    options: {
      placeholderData: (previousData) => previousData,
    },
  });

  const handleFilterChange = useCallback(
    (newFilters: Partial<UserFilters>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(newFilters).forEach(([key, value]) => {
          if (value === undefined || value === "") {
            next.delete(key);
          } else {
            next.set(key, value.toString());
          }
        });
        if (!newFilters.page) next.set("page", "1");
        return next;
      });
    },
    [setSearchParams],
  );

  const handleRowClick = useCallback((user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  return {
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    status: query.status,
    error: query.error,
    filters,
    selectedUser,
    isDrawerOpen,
    handleFilterChange,
    handleRowClick,
    closeDrawer,
    setSearchParams,
  };
};

export const useCountries = () => {
  return useGet<string[]>({
    endpoint: ENDPOINTS.COUNTRIES,
    queryKey: ["countries"],
    options: {
      staleTime: 1000 * 60 * 60,
    },
  });
};
