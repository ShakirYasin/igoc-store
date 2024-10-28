import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrdersLoading = () => {
  // Define matching theme colors
  const colors = {
    background: "", // Dark blue background
    primary: "bg-[#9eff00]",
    headerBg: "bg-[#242b3d]",
    tableBg: "bg-[#1e2332]",
    text: "text-lime-500",
    border: "border-[#2a3241]",
  };

  return (
    <div className={`max-w-[1440px] mx-auto ${colors.background} py-10 md:py-24 px-4 md:px-8`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Skeleton className={`h-10 w-48 bg-[#242b3d]`} />
          <Skeleton className={`h-8 w-32 bg-[#242b3d]`} />
        </div>

        <div className={`${colors.tableBg} rounded-xl shadow-lg ${colors.border} border`}>
          <Table>
            <TableHeader>
              <TableRow className={colors.headerBg}>
                <TableHead className={`font-semibold ${colors.text}`}>Order ID</TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>Date</TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>Customer</TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>Package</TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>Region</TableHead>
                <TableHead className={`font-semibold ${colors.text} text-right`}>Amount</TableHead>
                <TableHead className={`font-semibold ${colors.text}`}>Payment</TableHead>
                <TableHead className={`font-semibold ${colors.text} text-right`}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-20 bg-[#242b3d]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24 bg-[#242b3d]" /></TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 bg-[#242b3d]" />
                      <Skeleton className="h-3 w-40 bg-[#242b3d]" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 bg-[#242b3d]" />
                      <Skeleton className="h-3 w-24 bg-[#242b3d]" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-6 w-24 bg-[#242b3d]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16 ml-auto bg-[#242b3d]" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 bg-[#242b3d]" /></TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Skeleton className="h-8 w-8 bg-[#242b3d] rounded-md" />
                    </div>
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

export default OrdersLoading; 