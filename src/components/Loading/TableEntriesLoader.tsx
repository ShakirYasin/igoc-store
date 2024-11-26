import {
  ORDERS_COLORS
} from "@/constants/orders.constants";

const TableEntriesLoader = ({
  currentEntries,
  totalOrders,
}: {
  currentEntries: number;
  totalOrders: number;
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-16 h-16 group cursor-pointer">
        {/* Background circle */}
        <div
          className={`absolute inset-0 ${ORDERS_COLORS.primary} opacity-10 rounded-full group-hover:opacity-20 transition-opacity`}
        />
        {/* Scroll indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className={`w-6 h-6 ${ORDERS_COLORS.primary} animate-bounce`}
            fill="none"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className={`${ORDERS_COLORS.text} text-sm font-medium`}>
          Scroll for more
        </p>
        <p className="text-xs text-muted-foreground">
          Showing {currentEntries} of {totalOrders}
        </p>
      </div>
    </div>
  );
};

export default TableEntriesLoader;
