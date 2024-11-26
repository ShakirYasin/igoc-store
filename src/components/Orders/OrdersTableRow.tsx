import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { OrderRowProps } from "@/types/orders.types";
import { memo, useCallback } from "react";

export const OrdersTableRow = memo(
  ({
    order,
    isSelected,
    onSelect,
    onPaymentConfirmation,
    colors,
  }: OrderRowProps) => {
    const handlePaymentConfirmation = useCallback(() => {
      onPaymentConfirmation(order._id as string);
    }, [order._id, onPaymentConfirmation]);

    return (
      <TableRow className={colors.hoverBg}>
        <TableCell>
          <Checkbox checked={isSelected} onCheckedChange={onSelect} />
        </TableCell>
        <TableCell className="font-medium text-center">
          #{order?._id?.slice(-8)}
        </TableCell>
        <TableCell className="text-center">
          {dayjs(order.createdAt).format("DD MMM YYYY")}
        </TableCell>
        <TableCell className="text-center">
          <div className="space-y-1">
            <div className="font-medium text-center">{order.name}</div>
            <div className="text-sm text-gray-500 text-center">
              {order?.email as string}
            </div>
            <div className="text-sm text-gray-500 text-center">
              {order?.phoneNumber as string}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="max-w-[200px] truncate block mx-auto">
                {order?.fullAddress}
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[300px] whitespace-normal">
                  {order?.fullAddress}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="text-center">
          <div className="space-y-1">
            <div className="font-medium text-center">
              {order?.productId?.name?.en}
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center">
          <Badge
            className={cn(
              "text-center",
              order?.shippingRegion === "WEST"
                ? colors.primary
                : colors.secondary
            )}
          >
            {order?.shippingRegion === "WEST"
              ? "West Malaysia"
              : "East Malaysia"}
          </Badge>
        </TableCell>
        <TableCell className="text-center">RM {order?.orderPrice}</TableCell>
        <TableCell className="text-center">
          {order?.paymentOption === "ONLINE" ? "Online" : "COD"}
        </TableCell>
        <TableCell className="text-center">
          <Badge
            className={cn(
              "text-center",
              order?.paymentDetails?.status === "PENDING"
                ? colors.primary
                : colors.secondary
            )}
          >
            {order?.paymentDetails?.status || "UNKNOWN"}
          </Badge>
        </TableCell>
        <TableCell className="text-right space-x-2">
          {order.paymentDetails?.status === "PENDING" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className={`${colors.primary} border-none hover:${colors.primary} hover:text-black transition-colors`}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to mark this order (#
                    {order?._id?.slice(-8)}) as paid? This action cannot be
                    undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="border-gray-700">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handlePaymentConfirmation}
                    className={`${colors.primary} border-none hover:opacity-90`}
                  >
                    Confirm Payment
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </TableCell>
      </TableRow>
    );
  }
);

OrdersTableRow.displayName = "OrdersTableRow";
