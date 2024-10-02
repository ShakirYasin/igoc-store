import Image from "next/image";
import React from "react";

interface GiftItemProps {
  icon: string;
  title: string;
  subtitle: string;
}

export const GiftItem: React.FC<GiftItemProps> = ({
  icon,
  title,
  subtitle,
}) => {
  return (
    <div className="text-center">
      <Image
        src={icon}
        alt={title}
        width={173}
        height={103}
        className="mx-auto mb-4 h-[103px] w-[173px]"
      />
      <h3 className="font-bold text-2xl">{title}</h3>
      <p className="text-2xl">{subtitle}</p>
    </div>
  );
};
