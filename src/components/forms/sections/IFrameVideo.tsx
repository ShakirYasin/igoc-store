"use client";

import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../productSchema";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import DynamicFieldArray from "@/components/DynamicFieldArray";

interface VideoSectionProps {
  form: UseFormReturn<ProductFormValues>;
  type?: "create" | "update";
}

const IFrameVideo = ({ form }: VideoSectionProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div className="bg-gray-800 p-4 mt-4 rounded-lg">
        <h1 className="text-md font-semibold mb-4">
          Add Youtube Video Url and instruction{" "}
        </h1>

        <FormField
          control={form.control}
          name="instruction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruction to Use Product (Malay)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4  rounded-md">
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {!field.value ? (
                    <input
                      type="text"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="Enter YouTube iframe link"
                      className="border p-2 w-full bg-gray-700 text-white rounded-md"
                    />
                  ) : (
                    <div
                      className="relative w-full"
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <iframe
                        src={field.value}
                        width="100%"
                        height="200"
                        allowFullScreen
                        className="object-cover rounded-md"
                        title="YouTube Video"
                      ></iframe>
                      {hovered && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => field.onChange("")}
                        >
                          <Trash className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className="bg-gray-800 my-4 px-4 py-2 rounded-lg">
        <DynamicFieldArray
          name="sections"
          label="Add Review Images"
          form={form}
          fields={[
            {
              name: "reviewImage",
              label: "Review Image",
              type: "image",
            },
          ]}
        />
      </div>
    </>
  );
};

export default IFrameVideo;
