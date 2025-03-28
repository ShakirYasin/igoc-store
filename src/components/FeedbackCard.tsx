import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ConvertMultilingualToString } from "@/utils/site.utils";
import { Feedback } from "graphql/generated/hooks";

interface FeedbackCardProps {
  feedbackData: ConvertMultilingualToString<Feedback>;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedbackData }) => {
  return (
    <div className="border bg-white border-[#D9D9D9] rounded-2xl p-10">
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
        <Avatar className="w-16 h-16">
          <AvatarImage src={feedbackData?.customer?.image || ""} alt="avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-bold">
            {feedbackData?.customer?.name +
              ", " +
              feedbackData?.customer?.location}
          </h3>
          <p className="font-bold">Customer</p>
        </div>

        {feedbackData?.isGoogleReview && (
          <Image
            src="/images/icons/googlesvg.svg"
            alt="Google icon"
            width={50}
            height={50}
            className="rounded-full"
          />
        )}
      </div>
      <Separator className="my-4 w-full bg-[#D9D9D9]" />
      <p className=" text-black font-semibold">{feedbackData?.comment}</p>
    </div>
  );
};
