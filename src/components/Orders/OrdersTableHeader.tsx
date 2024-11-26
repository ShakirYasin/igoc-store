import { TableRow, TableHead } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

interface OrdersTableHeaderProps {
  colors: Record<string, string>;
  selectedOrders: Set<string>;
  ordersLength: number;
  onSelectAll: () => void;
}

export const OrdersTableHeader = ({
  colors,
  selectedOrders,
  ordersLength,
  onSelectAll,
}: OrdersTableHeaderProps) => {
  return (
    <TableRow className={colors.headerBg}>
      <TableHead className="w-[50px]">
        <Checkbox
          checked={selectedOrders.size === ordersLength}
          onCheckedChange={onSelectAll}
        />
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Order ID
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Date
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Customer
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Address
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Product Name
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Region
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Amount
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Payment Mode
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Payment Status
      </TableHead>
      <TableHead className={`font-semibold ${colors.text} text-center`}>
        Actions
      </TableHead>
    </TableRow>
  );
};
