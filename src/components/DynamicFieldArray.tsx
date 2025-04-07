"use client";
import React from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUploadField from "@/components/ImageUploadField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState, useEffect } from "react";
interface FieldConfig {
  name: string;
  label?: string;
  type:
    | "text"
    | "number"
    | "textarea"
    | "select"
    | "switch"
    | "image"
    | "image-array"
    | "color";
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

interface DynamicFieldArrayProps {
  name: string;
  label?: string;
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
  const { fields: arrayFields } = useFieldArray({
    control: form.control,
    name,
  });

  const [openItems, setOpenItems] = useState<string[]>([]);

  useEffect(() => {
    setOpenItems(arrayFields.map((_, index) => `${name}-${index}`));
  }, [arrayFields, name]);

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
          <FormItem>
            <FormLabel>{field.label}</FormLabel>
            {field.type === "text" && (
              <FormControl>
                <Input
                  {...formField}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </FormControl>
            )}
            {field.type === "image" && (
              <FormControl>
                <div className="flex items-center space-x-2 mb-2">
                  <div className=" ">
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
                  </div>
                </div>
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
            {/* {field.type === "image-array" && (
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
            )} */}
            {/* {field.type === "color" && (
              <FormControl>
                <ColorPicker
                  value={formField.value}
                  onChange={(color: string) => {
                    form.setValue(fieldName, color);
                  }}
                />
              </FormControl>
            )} */}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <div>
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={openItems}
        value={openItems}
        onValueChange={setOpenItems}
      >
        {arrayFields.map((item, index) => (
          <AccordionItem key={item.id} value={`${name}-${index}`}>
            <AccordionTrigger className="mt-3">{`${label} ${
              index + 1
            }`}</AccordionTrigger>
            <AccordionContent className="">
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {fields.map((field) => renderField(field, index, name))}
                </div>
                {/* <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  className="mt-4"
                >
                  Remove {label}
                </Button> */}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {/* <Button
        type="button"
        variant="outline"
        onClick={() => {
          append(
            productInitialValues[name as keyof typeof productInitialValues]
          );
          // Open the newly added item
          setOpenItems((prev) => [...prev, `${name}-${arrayFields.length}`]);
        }}
        className="mt-2 text-black"
      >
        <Plus className="h-4 w-4 mr-2" /> Add {label}
      </Button> */}
    </div>
  );
};

export default DynamicFieldArray;
