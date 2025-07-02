import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/src/components/ui/card";
import { StarRender } from "./StarRender";

export interface BookAuthor {
  id: string;
  name: string;
  slug: string;
  role?: string;
}

export interface BookPrice {
  amount: number;
  currency: string;
  includes_taxes?: boolean;
}

export interface BookCardProps {
  image?: string;
  title: string;
  authors?: BookAuthor[];
  price?: BookPrice;
  averageRating?: number;
  description?: string;
}

const BookCard = ({
  image,
  title,
  authors,
  price,
  averageRating,
  description,
}: BookCardProps) => {
  return (
    <Card className="h-full flex flex-col justify-between py-3 gap-y-0 max-sm:max-w-xs max-sm:mx-auto">
      <CardHeader className="flex flex-col items-center gap-2 px-2">
        <div className="w-32 h-48 bg-gray-100 rounded mb-2 flex items-center justify-center overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              className="object-cover w-full h-full"
              width={150}
              height={200}
            />
          ) : (
            <span className="text-gray-400 text-xs">Pas d&apos;image</span>
          )}
        </div>
        <div className="">
          <CardTitle className="text-center text-base line-clamp-2">
            {title}
          </CardTitle>
          {authors && authors.length > 0 && (
            <CardDescription className="text-xs text-center">
              {authors.map((a) => a.name).join(", ")}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-1">
        {price && (
          <div className="text-xs text-green-600 font-bold mt-1">
            {price.amount / 100} {price.currency}
          </div>
        )}

        {typeof averageRating === "number" && (
          <div className="text-xs text-yellow-500 flex items-center gap-1">
            <StarRender rating={averageRating} />
          </div>
        )}
        {description && (
          <div
            className="text-xs text-gray-400 mt-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default BookCard;
