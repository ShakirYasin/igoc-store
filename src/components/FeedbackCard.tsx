import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";

interface FeedbackCardProps {
  name: string;
  comment: string;
  avatar: string;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  name,
  comment,
  avatar,
}) => {
  return (
    <div className="border border-[#D9D9D9] rounded-2xl p-10">
      <div className="flex items-center justify-between">
        <Avatar className="w-16 h-16">
          <AvatarImage src={avatar} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="font-bold">Customer</p>
        </div>

        <Image
          src="/assets/images/icons/googlesvg.svg"
          alt="Google icon"
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
      <Separator className="my-4 w-full bg-[#D9D9D9]" />
      <p className=" text-[#D9D9D9] font-semibold">{comment}</p>
    </div>
  );
};
