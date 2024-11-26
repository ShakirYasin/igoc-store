import { Table, TableHeader, TableBody } from "@/components/ui/table";

import { OrdersTableProps } from "@/types/orders.types";
import { OrdersTableHeader } from "./OrdersTableHeader";
import { OrdersTableRow } from "./OrdersTableRow";

export const OrdersTable = ({
  orders,
  selectedOrders,
  onSelectAll,
  onSelectOrder,
  onPaymentConfirmation,
  colors,
}: OrdersTableProps) => {
  return (
    <div
      className={`${colors.tableBg} rounded-xl shadow-lg ${colors.border} border`}
    >
      <Table className="overflow-x-auto">
        <TableHeader>
          <OrdersTableHeader
            colors={colors}
            selectedOrders={selectedOrders}
            ordersLength={orders?.length}
            onSelectAll={onSelectAll}
          />
        </TableHeader>
        <TableBody>
          {orders?.map((order, index) => (
            <OrdersTableRow
              key={index}
              order={order}
              colors={colors}
              isSelected={selectedOrders.has(order._id as string)}
              onSelect={() => onSelectOrder(order._id as string)}
              onPaymentConfirmation={onPaymentConfirmation}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
