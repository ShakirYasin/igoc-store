import {
  PopulatedOrderWithPackage
} from "graphql/generated/hooks";

export interface OrdersTableProps {
  orders: PopulatedOrderWithPackage[];
  selectedOrders: Set<string>;
  onSelectAll: () => void;
  onSelectOrder: (orderId: string) => void;
  onPaymentConfirmation: (orderId: string) => void;
  colors: Record<string, string>;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  targetRef: (node?: Element | null) => void;
  currentEntries: number;
  totalOrders: number;
  refetch: () => void;
}

export interface OrdersHeaderProps {
  totalOrders: number;
  orders: PopulatedOrderWithPackage[];
  selectedOrders: Set<string>;
  onExportCSV: (
    orders: PopulatedOrderWithPackage | PopulatedOrderWithPackage[]
  ) => void;
  colors: Record<string, string>;
}

export interface OrderRowProps {
  order: PopulatedOrderWithPackage;
  isSelected: boolean;
  onSelect: () => void;
  onPaymentConfirmation: (orderId: string) => void;
  colors: Record<string, string>;
  handleDeleteOrder: () => void;
}
