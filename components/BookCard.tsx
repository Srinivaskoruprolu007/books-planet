// BookCard.tsx
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const BookCard = ({
  id,
  title,
  genre,
  rating,
  coverUrl,
  coverColor,
  isLoanedBook = false,
}: Book) => {
  return (
    <li
      className={cn(
        "group transition-all duration-200 hover:scale-[1.02]",
        isLoanedBook ? "xs:w-52 w-full" : "w-full"
      )}
    >
      <Link
        href={`/books/${id}`}
        className={cn(
          "block",
          isLoanedBook ? "w-full flex flex-col items-center" : ""
        )}
      >
        {/* Book Cover */}
        <div
          className={cn(
            "relative aspect-[2/3] rounded-lg overflow-hidden shadow-md",
            coverColor ? `bg-[${coverColor}]` : "bg-gray-200"
          )}
        >
          {coverUrl && (
            <Image
              src={coverUrl}
              alt={`Cover of ${title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          )}
        </div>

        {/* Book Info */}
        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="line-clamp-1 text-base font-semibold text-white group-hover:text-primary transition-colors">
            {title}
          </p>
          <p className="line-clamp-1 text-sm italic text-light-100 mt-1">
            {genre}
          </p>
        </div>

        {/* Loan Info (if applicable) */}
        {isLoanedBook && (
          <div className="mt-3 w-full space-y-2">
            <div className="flex items-center gap-1 text-light-100 text-sm">
              <Image
                src="/icons/calendar.svg"
                alt="Days remaining"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span>11 days left to return</span>
            </div>
            <Button
              variant="outline"
              className="w-full bg-dark-600 text-primary hover:bg-dark-500"
              onClick={(e) => {
                e.preventDefault();
                // Handle download receipt logic
              }}
            >
              Download Receipt
            </Button>
          </div>
        )}
      </Link>
    </li>
  );
};

export default BookCard;
