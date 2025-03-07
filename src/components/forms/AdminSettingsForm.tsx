"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUserQuery, useUpdateAdminInfoMutation } from "graphql/generated/hooks";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const adminSettingsSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  postcode: z.string().min(5, { message: "Please enter a valid postcode" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
});

type AdminSettingsFormValues = z.infer<typeof adminSettingsSchema>;

export function AdminSettingsForm() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch current user data
  const { data: userData, isLoading: isLoadingUser } = useCurrentUserQuery();
  
  const form = useForm<AdminSettingsFormValues>({
    resolver: zodResolver(adminSettingsSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
      city: "",
      postcode: "",
      email: "",
      state: "",
    },
  });

  // Update form values when user data is loaded
  useEffect(() => {
    if (userData?.currentUser) {
      const user = userData.currentUser;
      form.reset({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        postcode: user.postcode || "",
        email: user.email || "",
        state: user.state || "",
      });
    }
  }, [userData, form]);

  const { mutate: updateAdminInfo } = useUpdateAdminInfoMutation({
    onSuccess: () => {
      toast.success("Admin information updated successfully");
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error((error as Error[])?.[0]?.message || "Failed to update admin information");
      setIsLoading(false);
    },
  });

  function onSubmit(data: AdminSettingsFormValues) {
    setIsLoading(true);
    updateAdminInfo({
      input: {
        ...data
      }
    });
  }

  if (isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-lime-400" />
        <span className="ml-2 text-white">Loading user data...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lime-400">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your name" 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white focus:border-lime-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lime-400">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your email" 
                    type="email" 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white focus:border-lime-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lime-400">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your phone number" 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white focus:border-lime-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lime-400">Address</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your address" 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white focus:border-lime-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lime-400">City</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your city" 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white focus:border-lime-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lime-400">State</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your state" 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white focus:border-lime-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lime-400">Postcode</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your postcode" 
                    {...field} 
                    className="bg-gray-800 border-gray-700 text-white focus:border-lime-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-lime-400 text-gray-900 hover:bg-lime-500 transition-colors w-full md:w-auto"
        >
          {isLoading ? "Updating..." : "Save Settings"}
        </Button>
      </form>
    </Form>
  );
} 