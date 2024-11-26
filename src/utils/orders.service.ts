import dayjs from "dayjs";
import { PopulatedOrder } from "graphql/generated/hooks";

export const formatOrderForCSV = (
  orders: PopulatedOrder | PopulatedOrder[]
) => {
  const headers = [
    "Order ID",
    "Date",
    "Customer Name",
    "Email",
    "Phone Number",
    "Address",
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
    order.fullAddress || "-",
    order.productId?.name?.en,
    order.shippingRegion === "WEST" ? "West Malaysia" : "East Malaysia",
    `RM ${order.orderPrice}`,
    order.paymentOption === "ONLINE" ? "Online" : "COD",
    order.paymentDetails?.status || "UNKNOWN",
  ]);

  return { headers, rows };
};

export const downloadCSV = (headers: string[], rows: string[][]) => {
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
