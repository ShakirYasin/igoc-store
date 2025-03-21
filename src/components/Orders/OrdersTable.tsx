import { Table, TableBody, TableHeader } from "@/components/ui/table";

import { OrdersTableProps } from "@/types/orders.types";
import { useDeleteOrderMutation } from "graphql/generated/hooks";
import { toast } from "react-toastify";
import OnScrollLoader from "../Loading/OnScrollLoader";
import TableEntriesLoader from "../Loading/TableEntriesLoader";
import { OrdersTableHeader } from "./OrdersTableHeader";
import { OrdersTableRow } from "./OrdersTableRow";

export const OrdersTable = ({
  orders,
  selectedOrders,
  onSelectAll,
  onSelectOrder,
  onPaymentConfirmation,
  colors,
  hasNextPage,
  isFetchingNextPage,
  targetRef,
  currentEntries,
  totalOrders,
  refetch,
}: OrdersTableProps) => {
  const { mutate: deleteOrder } = useDeleteOrderMutation({
    onSuccess: () => {
      toast.success("Order deleted successfully");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete order");
    },
  });
  return (
    <div className="relative">
      <div
        className={`${colors.tableBg} max-h-[calc(100vh-20rem)] rounded-xl shadow-lg ${colors.border} border 
        overflow-y-auto overflow-x-scroll
        `}
      >
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 table-header-group">
            <OrdersTableHeader
              colors={colors}
              selectedOrders={selectedOrders}
              ordersLength={orders?.length}
              onSelectAll={onSelectAll}
            />
          </TableHeader>
          <TableBody className="divide-y divide-gray-200">
            {orders?.map((order, index) => (
              <OrdersTableRow
                key={index}
                order={order}
                colors={colors}
                isSelected={selectedOrders.has(order._id as string)}
                onSelect={() => onSelectOrder(order._id as string)}
                onPaymentConfirmation={onPaymentConfirmation}
                handleDeleteOrder={() =>
                  deleteOrder({ deleteOrderId: order._id as string })
                }
              />
            ))}
          </TableBody>
        </Table>

        <div ref={targetRef} className="h-20 flex items-center justify-center">
          {hasNextPage ? (
            <div className="relative flex flex-col items-center">
              {isFetchingNextPage ? (
                <OnScrollLoader />
              ) : (
                <TableEntriesLoader
                  currentEntries={currentEntries}
                  totalOrders={totalOrders}
                />
              )}
            </div>
          ) : (
            <div
              className={`${colors.text} font-medium text-sm text-center w-full opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]`}
            >
              You&apos;ve reached the end of the list!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
