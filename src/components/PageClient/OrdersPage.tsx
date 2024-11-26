"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  useUpdateStatusToPaidMutation,
  PopulatedOrder,
} from "graphql/generated/hooks";
import { toast } from "react-toastify";
import { ORDERS_COLORS } from "@/constants/orders.constants";
import { formatOrderForCSV, downloadCSV } from "@/utils/orders.service";
import OrdersLoading from "../Loading/OrdersLoading";
import { useInfinitePaginatedOrdersQuery } from "graphql/created/hooks";

import { OrdersTable } from "../Orders/OrdersTable";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FileDown } from "lucide-react";
import OnScrollLoader from "../Loading/OnScrollLoader";
import TableEntriesLoader from "../Loading/TableEntriesLoader";
import SearchBar from "../ui/search-bar";
import { useSearchParams } from "next/navigation";

const INITIAL_PAGE_SIZE = 10;
const PAGE_SIZE_INCREMENT = 5;

const OrdersPage = () => {
  const searchParams = useSearchParams();
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfinitePaginatedOrdersQuery(INITIAL_PAGE_SIZE, {
      search: searchParams.get("search") ?? "",
    });

  const { ref: targetRef, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
    delay: 500,
    triggerOnce: false,
  });

  // Add this helper function to deduplicate orders by ID
  const deduplicateOrders = (orders: PopulatedOrder[]): PopulatedOrder[] => {
    const seen = new Map();
    return orders.filter((order) => {
      const id = order._id;
      if (seen.has(id)) {
        return false;
      }
      seen.set(id, true);
      return true;
    });
  };

  // Update the orders extraction
  const orders: PopulatedOrder[] = deduplicateOrders(
    data?.pages?.flatMap((page) => page.paginatedOrders?.results ?? []) ?? []
  );

  const totalOrders =
    data?.pages[0]?.paginatedOrders?.paginatorInfo?.totalRecords || 0;

  useEffect(() => {
    if (!inView || !hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  }, [
    inView,
    hasNextPage,
    isFetchingNextPage,
    data?.pages?.length,
    fetchNextPage,
    orders.length,
  ]);

  const { mutate: updateStatusToPaid } = useUpdateStatusToPaidMutation({
    onSuccess: (data) => {
      toast.success(data.UpdateStatusToPaid?.message);
    },
    onError: (error) => {
      toast.error((error as Error[])?.[0]?.message);
    },
  });

  const handlePaymentConfirmation = (orderId: string) => {
    updateStatusToPaid({
      updateStatusToPaidId: orderId,
    });
  };

  const handleExportCSV = (orders: PopulatedOrder | PopulatedOrder[]) => {
    const { headers, rows } = formatOrderForCSV(orders);
    downloadCSV(headers, rows as string[][]);
  };

  const handleSelectAll = () => {
    if (selectedOrders.size === orders?.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(orders?.map((order) => order._id as string)));
    }
  };

  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  if (isLoading) {
    return <OrdersLoading />;
  }

  return (
    <div
      className={`max-w-[1440px] mx-auto ${ORDERS_COLORS.background} py-10 md:py-24 px-4 md:px-8`}
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1
            className={`text-3xl md:text-4xl font-semibold ${ORDERS_COLORS.text}`}
          >
            Orders History
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`${ORDERS_COLORS.primary} rounded-full border-none hover:${ORDERS_COLORS.primary} hover:text-black transition-colors`}
              >
                <FileDown className="h-4 w-4 mr-2" />
                Export Orders
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExportCSV(orders || [])}>
                Export All Orders
              </DropdownMenuItem>
              {selectedOrders.size > 0 && (
                <DropdownMenuItem
                  onClick={() =>
                    handleExportCSV(
                      orders?.filter((order) =>
                        selectedOrders.has(order._id as string)
                      ) || []
                    )
                  }
                >
                  Export Selected Orders ({selectedOrders.size})
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
          <Badge
            className={`px-4 py-1.5 ${ORDERS_COLORS.primary}`}
            variant="default"
          >
            Total Orders: {totalOrders || 0}
          </Badge>
        </div>
      </div>
      <div className="">
        <OrdersTable
          orders={orders}
          selectedOrders={selectedOrders}
          onSelectAll={handleSelectAll}
          onSelectOrder={handleSelectOrder}
          onPaymentConfirmation={handlePaymentConfirmation}
          colors={ORDERS_COLORS}
        />

        <div ref={targetRef} className="h-40 flex items-center justify-center">
          {hasNextPage ? (
            <div className="relative flex flex-col items-center">
              {isFetchingNextPage ? (
                <OnScrollLoader />
              ) : (
                <TableEntriesLoader
                  currentEntries={
                    INITIAL_PAGE_SIZE +
                    (data?.pages?.length || 0) * PAGE_SIZE_INCREMENT
                  }
                  totalOrders={totalOrders}
                />
              )}
            </div>
          ) : (
            <div
              className={`${ORDERS_COLORS.text} font-medium text-sm opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]`}
            >
              You&apos;ve reached the end of the list!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
