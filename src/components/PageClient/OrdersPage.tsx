"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


import dayjs from "dayjs";
import { useOrdersQuery } from "graphql/generated/hooks";
import OrdersLoading from "../Loading/OrdersLoading";

const OrdersPage = () => {
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

  if (isLoading) {
    return <OrdersLoading />;
  }

  return (
    <div
      className={`max-w-[1440px] mx-auto ${colors.background} py-10 md:py-24 px-4 md:px-8`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-semibold ${colors.text}`}>
            Orders History
          </h1>
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
                  Package
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
                {/* <TableHead
                  className={`font-semibold ${colors.text} text-right`}
                >
                  Actions
                </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.orders?.map((order) => (
                <TableRow key={order._id} className={colors.hoverBg}>
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
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">
                        {order?.productId?.name?.en}
                      </div>
                      {/* <div className="text-sm text-gray-500">
                        {order?.packageId?.name?.en}
                      </div> */}
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
                      {order?.paymentDetails?.status}
                    </Badge>
                  </TableCell>
                  {/* <TableCell className="text-right">
                    <Link href={`/orders/${order._id}`}>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`${colors.primary} border-none hover:${colors.primary} hover:text-black transition-colors`}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell> */}
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
