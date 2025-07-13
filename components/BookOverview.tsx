import Image from "next/image";
import BookCover from "./BookCover";
import { Button } from "./ui/button";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  color,
  coverUrl,
}: Book) => {
  return (
    <section className="book-overview flex flex-col lg:flex-row gap-12 items-start pb-10 max-w-6xl mx-auto px-4">
      {/* Book Cover with Shadow Effect */}
      <div className="flex-1 flex justify-center items-start pt-2">
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <div className="relative">
            <BookCover
              variant="wide"
              className="z-10 transform group-hover:-translate-y-1 transition duration-200"
              coverColor={color}
              coverImage={coverUrl}
            />
            <div className="absolute left-16 top-10 rotate-12 opacity-40 -z-10">
              <BookCover
                variant="wide"
                coverColor={color}
                coverImage={coverUrl}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Book Info */}
      <div className="flex-1 flex flex-col gap-6 lg:pt-8">
        <div>
          <h1 className="text-4xl font-bold text-light-100 mb-2">{title}</h1>
          <p className="text-xl text-light-200 font-medium">{author}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="bg-dark-300/50 px-4 py-2 rounded-full flex items-center">
            <span className="text-light-200">{genre}</span>
          </div>
          <div className="bg-dark-300/50 px-4 py-2 rounded-full flex items-center gap-2">
            <Image src="/icons/star.svg" width={18} height={18} alt="star" />
            <span className="text-light-200">{rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xs">
          <div className="bg-dark-300/20 p-3 rounded-lg">
            <p className="text-sm text-light-100">Total Copies</p>
            <p className="text-xl font-semibold text-light-200">
              {totalCopies}
            </p>
          </div>
          <div className="bg-dark-300/20 p-3 rounded-lg">
            <p className="text-sm text-light-100">Available</p>
            <p className="text-xl font-semibold text-light-200">
              {availableCopies}
            </p>
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-lg font-semibold text-light-100 mb-2">
            Description
          </h3>
          <p className="text-light-100 leading-relaxed text-justify">
            {description}
          </p>
        </div>

        <Button className="mt-4 flex items-center gap-3 w-fit px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 transform hover:scale-105">
          <Image src="/icons/book.svg" width={22} height={22} alt="borrow" />
          <span className="font-bebas-neue text-2xl tracking-wider">
            Borrow Now
          </span>
        </Button>
      </div>
    </section>
  );
};

export default BookOverview;
