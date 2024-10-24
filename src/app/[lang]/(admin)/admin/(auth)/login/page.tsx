"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AdminFallback from "@/components/fallbacks/Fallback";
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
import { Spinner } from "@/components/ui/spinner";
import { AUTH_KEY } from "@/constants/locales";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useLoginMutation } from "graphql/generated/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Define the form schema
const formSchema = z.object({
  username: z.string().min(3, {
    message: "Please enter a valid username.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const AdminLoginPage: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { loading } = useAuthCheck("/admin/products");
  const router = useRouter();
  const { mutate } = useLoginMutation({
    onSuccess: (data) => {
      toast.success("Login Success");
      localStorage.setItem(AUTH_KEY, data.login as string);
      router.replace("/admin/products");
    },
    onError: (error) => {
      toast.error(
        (error as Error[])?.[0]?.message ?? (error as Error)?.message
      );
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ input: { username: values.username, password: values.password } });
  }
  if (loading) {
    return <AdminFallback />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="relative bg-white p-8 rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <div className="absolute inset-0 bg-lime-500 opacity-5"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Welcome back, administrator</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        className="bg-gray-50 border-gray-300 focus:border-lime-500 focus:ring-lime-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        className="bg-gray-50 border-gray-300 focus:border-lime-500 focus:ring-lime-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                {form.formState.isSubmitting ? (
                  <Spinner size="sm" className="mr-2" />
                ) : null}
                Sign In
              </Button>
            </form>
          </Form>

          <div className="mt-8 text-center text-xs text-gray-500">
            <Link
              href="#"
              className="hover:text-lime-500 transition duration-300"
            >
              Terms of Use
            </Link>
            {" | "}
            <Link
              href="#"
              className="hover:text-lime-500 transition duration-300"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
