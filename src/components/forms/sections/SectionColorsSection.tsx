// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "../../ui/form";
// import { ColorPicker } from "../../ui/color-picker";
// import { UseFormReturn } from "react-hook-form";
// import { ProductFormValues } from "../productSchema";
// import {
//   productInitialValues,
//   // TSectionColors,
// } from "@/constants/initialValues";

// interface SectionColorsSectionProps {
//   form: UseFormReturn<ProductFormValues>;
// }

// const SectionColorsSection = ({ form }: SectionColorsSectionProps) => (
//   <div className="bg-gray-800 p-4 rounded-lg mb-4 space-y-6">
//     <h3 className="text-lg font-semibold">Section Colors</h3>
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {Object.keys(productInitialValues.sectionColors).map((key) => (
//         <FormField
//           key={key}
//           control={form.control}
//           name={`sectionColors.${key as keyof TSectionColors}`}
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>{key} Color: </FormLabel>
//               <FormControl>
//                 <ColorPicker
//                   value={field.value}
//                   onChange={(color: string) => {
//                     form.setValue(
//                       `sectionColors.${key as keyof TSectionColors}`,
//                       color
//                     );
//                   }}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//       ))}
//     </div>
//   </div>
// );

// export default SectionColorsSection;
