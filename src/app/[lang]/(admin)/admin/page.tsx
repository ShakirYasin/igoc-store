import { redirect } from "next/navigation";

const page = () => {
  redirect("/admin/products");
};

export default page;
