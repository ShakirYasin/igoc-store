import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { OrderRowProps } from "@/types/orders.types";
import dayjs from "dayjs";
import { CheckCircle, MoreVertical, Trash2 } from "lucide-react";
import { memo, useCallback, useState } from "react";

export const OrdersTableRow = memo(
  ({
    order,
    isSelected,
    onSelect,
    onPaymentConfirmation,
    colors,
    handleDeleteOrder,
  }: OrderRowProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
                <div className="text-sm text-gray-500 text-center truncate">
                  Postcode: {order?.postcode as string}
                </div>
                <div className="text-sm text-gray-500 text-center truncate">
                  City: {order?.city as string}
                </div>
                <div className="text-sm text-gray-500 text-center truncate">
                  State: {order?.state as string}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[300px] whitespace-normal">
                  {order?.fullAddress}
                  <div className="text-sm text-gray-500 text-center ">
                    Postcode: {order?.postcode as string}
                  </div>
                  <div className="text-sm text-gray-500 text-center ">
                    City: {order?.city as string}
                  </div>
                  <div className="text-sm text-gray-500 text-center ">
                    State: {order?.state as string}
                  </div>
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
          <div className="space-y-1">
            <div className="font-medium text-center">
              {order?.packageId?.name?.en}
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
        <TableCell className="text-right">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {order.paymentDetails?.status === "PENDING" && (
                <DropdownMenuItem
                  onClick={() => {
                    setDropdownOpen(false);
                    setConfirmDialogOpen(true);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Payment
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => {
                  setDropdownOpen(false);
                  setDeleteDialogOpen(true);
                }}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
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
                <AlertDialogCancel className="border-gray-700" onClick={() => setConfirmDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handlePaymentConfirmation();
                    setConfirmDialogOpen(false);
                  }}
                  className={`${colors.primary} border-none hover:opacity-90`}
                >
                  Confirm Payment
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Order</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this order (#
                  {order?._id?.slice(-8)})? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-gray-700" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDeleteOrder();
                    setDeleteDialogOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete Order
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TableCell>
      </TableRow>
    );
  }
);

OrdersTableRow.displayName = "OrdersTableRow";
