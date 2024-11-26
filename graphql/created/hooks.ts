import { axiosGraphQL } from "@/utils/axios.fetcher";

import {
  PaginatedOrdersDocument,
  PaginatedOrdersQuery,
  PaginatedOrdersQueryVariables,
} from "graphql/generated/hooks";

import { useInfiniteQuery } from "@tanstack/react-query";

import { UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useInfinitePaginatedOrdersQuery = <
  TData = { pages: PaginatedOrdersQuery[] },
  TError = unknown
>(
  initialLimit: number = 10,
  variables?: Omit<PaginatedOrdersQueryVariables, "limit">,
  options?: Omit<
    UseInfiniteQueryOptions<PaginatedOrdersQuery, TError, TData>,
    "queryKey"
  > & {
    queryKey?: UseInfiniteQueryOptions<
      PaginatedOrdersQuery,
      TError,
      TData
    >["queryKey"];
  }
) => {
  return useInfiniteQuery<PaginatedOrdersQuery, TError, TData>({
    queryKey: ["InfinitePaginatedOrders", variables, initialLimit],
    initialPageParam: initialLimit,
    queryFn: async ({ pageParam = initialLimit }) => {
      return axiosGraphQL<PaginatedOrdersQuery, PaginatedOrdersQueryVariables>(
        PaginatedOrdersDocument,
        {
          ...(variables || {}),
          page: 1,
          limit: Number(pageParam),
        }
      )();
    },
    getNextPageParam: (lastPage, allPages) => {
      const info = lastPage.paginatedOrders?.paginatorInfo;
      const currentLimit = initialLimit + allPages.length * 5;
      return info?.hasNextPage ? currentLimit : undefined;
    },
    ...options,
  });
};
