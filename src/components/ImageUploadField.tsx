"use client";
import { Button } from "@/components/ui/button";
import { authenticator } from "@/services/api.services";
import { IKUpload, ImageKitProvider } from "imagekitio-next";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  fieldName: string;
  isArray?: boolean;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="flex-grow">
      {value ? (
        <div className="relative inline-block group">
          <Image
            src={value}
            alt="Uploaded image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto max-w-full max-h-[500px] object-contain rounded-md"
          />

          <div className="absolute inset-0  bg-black bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={onRemove}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : isUploading ? (
        <div className="w-full h-40 bg-gray-700 rounded-md animate-pulse flex items-center justify-center">
          <div className="text-white">Uploading...</div>
        </div>
      ) : (
        <>
          <ImageKitProvider
            publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
            authenticator={authenticator}
          >
            <IKUpload
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white cursor-pointer hover:bg-gray-600 transition-colors duration-200"
              onUploadStart={() => setIsUploading(true)}
              onSuccess={(response) => {
                setIsUploading(false);
                onChange(response.url);
              }}
              onError={(error) => {
                setIsUploading(false);
                console.error("Image upload failed:", error);
              }}
            />
          </ImageKitProvider>
        </>
      )}
    </div>
  );
};

export default ImageUploadField;
