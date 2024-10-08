"use client";

import React from "react";
import { HexColorPicker } from "react-colorful";
import ColorPickerFallback from "../fallbacks/ColorPickerFallback";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
}) => {
  if (!value) {
    return <ColorPickerFallback />;
  }
  return (
    <div className="pt-4">
      <HexColorPicker color={value} className="w-full" onChange={onChange} />
      <div className="mt-4 flex items-center">
        <div
          className="w-8 h-8 rounded-full mr-2 border border-gray-300"
          style={{ backgroundColor: value }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-gray-700 border-gray-600 text-white px-2 py-1 rounded"
        />
      </div>
    </div>
  );
};
