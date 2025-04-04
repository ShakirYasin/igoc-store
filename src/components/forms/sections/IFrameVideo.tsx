"use client";

import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../productSchema";
import { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface VideoSectionProps {
  form: UseFormReturn<ProductFormValues>;
}

const IFrameVideo = ({ form }: VideoSectionProps) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="bg-gray-800 p-4 mt-4 rounded-lg">
      <div className="flex flex-col">
        <h2 className="text-md font-semibold text-white">Video Upload</h2>
        <p className="text-sm text-gray-400">
          Add a video link to showcase your product.
        </p>
      </div>
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
  );
};

export default IFrameVideo;
