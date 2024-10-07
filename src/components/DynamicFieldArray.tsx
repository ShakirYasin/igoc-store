"use client";

import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import ImageUploadField from "@/components/ImageUploadField";
import { initializeValues } from "./forms/ProductForm";

interface FieldConfig {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "select"
    | "switch"
    | "image"
    | "image-array";
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface DynamicFieldArrayProps {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  fields: FieldConfig[];
}

const DynamicFieldArray: React.FC<DynamicFieldArrayProps> = ({
  name,
  label,
  form,
  fields,
}) => {
  const {
    fields: arrayFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name,
  });

  const renderField = (
    field: FieldConfig,
    index: number,
    arrayName: string
  ) => {
    const fieldName = `${arrayName}.${index}.${field.name}`;

    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field: formField }) => (
          <FormItem
            className={field.type === "image-array" ? "col-span-2" : ""}
          >
            <FormLabel>{field.label}</FormLabel>
            {field.type === "text" && (
              <FormControl>
                <Input
                  {...formField}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </FormControl>
            )}
            {field.type === "number" && (
              <FormControl>
                <Input
                  {...formField}
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </FormControl>
            )}

            {field.type === "textarea" && (
              <FormControl>
                <Textarea
                  {...formField}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </FormControl>
            )}
            {field.type === "select" && (
              <FormControl>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            )}
            {field.type === "switch" && (
              <FormControl>
                <>
                  <br />
                  <Switch
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                </>
              </FormControl>
            )}
            {field.type === "image" && (
              <FormControl>
                <ImageUploadField
                  value={formField.value}
                  onChange={(url: string) => {
                    form.setValue(fieldName, url);
                  }}
                  onRemove={() => {
                    form.setValue(fieldName, "");
                  }}
                  fieldName={fieldName}
                />
              </FormControl>
            )}
            {field.type === "image-array" && (
              <FormControl className="">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formField.value.map((image: string, imgIndex: number) => (
                    <div
                      key={imgIndex}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <ImageUploadField
                        value={image}
                        onChange={(url: string) => {
                          const newImages = [...formField.value];
                          newImages[imgIndex] = url;
                          formField.onChange(newImages);
                        }}
                        onRemove={() => {
                          const newImages = formField.value.filter(
                            (_: string, i: number) => i !== imgIndex
                          );
                          formField.onChange(newImages);
                        }}
                        fieldName={`${fieldName}-${imgIndex}`}
                        isArray={true}
                      />
                      {!image && (
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => {
                            const newImages = formField.value.filter(
                              (_: string, i: number) => i !== imgIndex
                            );
                            formField.onChange(newImages);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      formField.onChange([...formField.value, ""]);
                    }}
                    className="mt-2 text-black"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Image
                  </Button>
                </div>
              </FormControl>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      {arrayFields.map((item, index) => (
        <div key={item.id} className="bg-gray-800 p-4 rounded-lg mb-4">
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 `}>
            {fields.map((field) => renderField(field, index, name))}
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
            className="mt-4"
          >
            Remove {label}
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append(initializeValues[name as keyof typeof initializeValues])
        }
        className="mt-2 text-black"
      >
        <Plus className="h-4 w-4 mr-2" /> Add {label}
      </Button>
    </div>
  );
};

export default DynamicFieldArray;
