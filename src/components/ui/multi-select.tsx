"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDown, X } from "lucide-react";
import * as React from "react";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  selected?: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  maxCount?: number;
};

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      selected = [],
      onChange,
      placeholder = "Select options...",
      className,
      maxCount = 3,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const selectedOptions = selected || [];

    const handleUnselect = (option: string) => {
      onChange(selectedOptions.filter((s) => s !== option));
    };

    const toggleOption = (value: string) => {
      onChange(
        selectedOptions.includes(value)
          ? selectedOptions.filter((s) => s !== value)
          : [...selectedOptions, value]
      );
    };

    const handleClear = () => {
      onChange([]);
    };

    const toggleAll = () => {
      onChange(
        selectedOptions.length === options.length
          ? []
          : options.map((o) => o.value)
      );
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
            {...props}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-1 flex-wrap">
                {selectedOptions.length > 0 ? (
                  <>
                    {selectedOptions.slice(0, maxCount).map((value) => {
                      const option = options.find((o) => o.value === value);
                      return (
                        <Badge
                          key={value}
                          variant="secondary"
                          className="mr-1"
                        >
                          {option?.label}
                          <button
                            className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleUnselect(value);
                              }
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onClick={() => handleUnselect(value)}
                          >
                            <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                          </button>
                        </Badge>
                      );
                    })}
                    {selectedOptions.length > maxCount && (
                      <Badge variant="secondary" className="mr-1">
                        +{selectedOptions.length - maxCount} more
                      </Badge>
                    )}
                  </>
                ) : (
                  <span className="text-muted-foreground">{placeholder}</span>
                )}
              </div>
              <ChevronDown className="h-4 w-4 opacity-50 ml-2 flex-shrink-0" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command className="w-full">
            <CommandInput placeholder="Search options..." className="w-full" />
            <CommandList className="w-full">
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                <CommandItem onSelect={toggleAll} className="w-full">
                  <div className={cn(
                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                    selectedOptions.length === options.length
                      ? "bg-primary text-primary-foreground"
                      : "opacity-50 [&_svg]:invisible"
                  )}>
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span>Select All</span>
                </CommandItem>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className="w-full"
                  >
                    <div className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedOptions.includes(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}>
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={handleClear}
                  className="justify-center text-center"
                >
                  Clear
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
