import { PopulatedOrder } from "graphql/generated/hooks";

export interface OrdersTableProps {
  orders: PopulatedOrder[];
  selectedOrders: Set<string>;
  onSelectAll: () => void;
  onSelectOrder: (orderId: string) => void;
  onPaymentConfirmation: (orderId: string) => void;
  colors: Record<string, string>;
}

export interface OrdersHeaderProps {
  totalOrders: number;
  orders: PopulatedOrder[];
  selectedOrders: Set<string>;
  onExportCSV: (orders: PopulatedOrder | PopulatedOrder[]) => void;
  colors: Record<string, string>;
}

export interface OrderRowProps {
  order: PopulatedOrder;
  isSelected: boolean;
  onSelect: () => void;
  onPaymentConfirmation: (orderId: string) => void;
  colors: Record<string, string>;
}
