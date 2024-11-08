"use client";

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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

import dayjs from "dayjs";
import {
  PopulatedOrder,
  useOrdersQuery,
  useUpdateStatusToPaidMutation,
} from "graphql/generated/hooks";
import { CheckCircle, FileDown } from "lucide-react";
import { toast } from "react-toastify";
import OrdersLoading from "../Loading/OrdersLoading";
import { Button } from "../ui/button";

const OrdersPage = () => {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const { data: orders, isLoading } = useOrdersQuery();

  // Define theme colors for dark theme
  const colors = {
    background: "", // Dark blue background
    primary: "bg-[#9eff00] text-[#1a1f2e]", // Neon green
    secondary: "bg-purple-500 text-white",
    headerBg: "bg-[#242b3d]", // Slightly lighter than background
    tableBg: "bg-[#1e2332]", // Slightly lighter than background
    hoverBg: "hover:bg-[#242b3d]",
    text: "text-lime-500",
    mutedText: "text-gray-400",
    border: "border-[#2a3241]",
  };
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
    const headers = [
      "Order ID",
      "Date",
      "Customer Name",
      "Email",
      "Phone Number",
      "Product Name",
      "Region",
      "Amount",
      "Payment Mode",
      "Payment Status",
    ];

    const ordersArray = Array.isArray(orders) ? orders : [orders];
    const rows = ordersArray.map((order) => [
      order._id?.slice(-8),
      dayjs(order.createdAt).format("DD MMM YYYY"),
      order.name,
      order.email || "-",
      order.phoneNumber || "-",
      order.productId?.name?.en,
      order.shippingRegion === "WEST" ? "West Malaysia" : "East Malaysia",
      `RM ${order.orderPrice}`,
      order.paymentOption === "ONLINE" ? "Online" : "COD",
      order.paymentDetails?.status || "UNKNOWN",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `orders-${dayjs().format("YYYY-MM-DD")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSelectAll = () => {
    if (selectedOrders.size === orders?.orders?.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(
        new Set(orders?.orders?.map((order) => order._id as string))
      );
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
      className={`max-w-[1440px] mx-auto ${colors.background} py-10 md:py-24 px-4 md:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className={`text-3xl md:text-4xl font-semibold ${colors.text}`}>
              Orders History
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`${colors.primary} rounded-full border-none hover:${colors.primary} hover:text-black transition-colors`}
                >
                  <FileDown className="h-4 w-4 mr-2" />
                  Export Orders
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleExportCSV(orders?.orders || [])}
                >
                  Export All Orders
                </DropdownMenuItem>
                {selectedOrders.size > 0 && (
                  <DropdownMenuItem
                    onClick={() =>
                      handleExportCSV(
                        orders?.orders?.filter((order) =>
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
          <Badge className={`px-4 py-1.5 ${colors.primary}`} variant="outline">
            Total Orders: {orders?.orders?.length || 0}
          </Badge>
        </div>

        <div
          className={`${colors.tableBg} rounded-xl shadow-lg ${colors.border} border`}
        >
          <Table>
            <TableHeader>
              <TableRow className={colors.headerBg}>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedOrders.size === orders?.orders?.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>
                  Order ID
                </TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>
                  Date
                </TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>
                  Customer
                </TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>
                  Product Name
                </TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>
                  Region
                </TableHead>
                <TableHead
                  className={`font-semibold ${colors.text} text-right`}
                >
                  Amount
                </TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>
                  Payment Mode
                </TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>
                  Payment Status
                </TableHead>
                <TableHead
                  className={`font-semibold ${colors.text} text-right`}
                >
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.orders?.map((order) => (
                <TableRow key={order._id} className={colors.hoverBg}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.has(order._id as string)}
                      onCheckedChange={() =>
                        handleSelectOrder(order._id as string)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    #{order?._id?.slice(-8)}
                  </TableCell>
                  <TableCell>
                    {dayjs(order.createdAt).format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{order.name}</div>
                      <div className="text-sm text-gray-500">
                        {order?.email as string}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order?.phoneNumber as string}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {order?.productId?.name?.en}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order?.shippingRegion === "WEST"
                          ? colors.primary
                          : colors.secondary
                      }
                    >
                      {order?.shippingRegion === "WEST"
                        ? "West Malaysia"
                        : "East Malaysia"}
                    </Badge>
                  </TableCell>
                  <TableCell>RM {order?.orderPrice}</TableCell>
                  <TableCell>
                    {order?.paymentOption === "ONLINE" ? "Online" : "COD"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order?.paymentDetails?.status === "PENDING"
                          ? colors.primary
                          : colors.secondary
                      }
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
                              {order?._id?.slice(-8)}) as paid? This action
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-gray-700">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handlePaymentConfirmation(order._id as string)
                              }
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
