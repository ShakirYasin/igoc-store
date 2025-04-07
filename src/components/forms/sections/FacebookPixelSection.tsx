// import {
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage,
// } from "../../ui/form";
// import { Switch } from "../../ui/switch";
// import { Input } from "../../ui/input";
// import { MultiSelect } from "../../ui/multi-select";
// import { UseFormReturn } from "react-hook-form";
// import { ProductFormValues } from "../productSchema";
// import { PasswordInput } from "../../ui/password-input";

// interface FacebookPixelSectionProps {
//   form: UseFormReturn<ProductFormValues>;
// }

// const facebookPixelEvents = [
//   { label: "Order", value: "ORDER" },
//   { label: "Purchase", value: "PURCHASE" },
// ];

// const FacebookPixelSection = ({ form }: FacebookPixelSectionProps) => {
//   return (
//     <div className="bg-gray-800 p-4 rounded-lg mb-4 space-y-6">
//       <FormField
//         control={form.control}
//         name="facebookPixel.enabled"
//         render={({ field }) => (
//           <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//             <div className="space-y-0.5">
//               <FormLabel className="text-base">Enable Facebook Pixel</FormLabel>
//               <FormDescription>
//                 Turn on to configure Facebook Pixel settings
//               </FormDescription>
//             </div>
//             <FormControl>
//               <Switch
//                 checked={field.value}
//                 onCheckedChange={(e) => {
//                   if (!e.valueOf()) {
//                     form.setValue("facebookPixel.settings", null);
//                   }
//                   field.onChange(e);
//                 }}
//               />
//             </FormControl>
//           </FormItem>
//         )}
//       />

//       {form.watch("facebookPixel.enabled") && (
//         <div className="space-y-4">
//           <FormField
//             control={form.control}
//             name="facebookPixel.settings.pixelId"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Pixel ID</FormLabel>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     className="bg-gray-700 border-gray-600 text-white"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="facebookPixel.settings.events"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Events</FormLabel>
//                 <FormControl>
//                   <MultiSelect
//                     options={facebookPixelEvents}
//                     selected={field.value || []}
//                     onChange={field.onChange}
//                     className="bg-gray-700 border-gray-600 text-white"
//                     placeholder="Select events..."
//                   />
//                 </FormControl>
//                 <FormDescription>Select the events to track</FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="facebookPixel.settings.accessToken"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Access Token</FormLabel>
//                 <FormControl>
//                   <PasswordInput
//                     {...field}
//                     className="bg-gray-700 border-gray-600 text-white"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="facebookPixel.settings.codeTestEvent"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Test Event Code</FormLabel>
//                 <FormControl>
//                   <Input
//                     {...field}
//                     className="bg-gray-700 border-gray-600 text-white"
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default FacebookPixelSection;
