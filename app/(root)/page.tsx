import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";

const Home = async () => {

  return (
    <div>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        title="Featured Books"
        books={sampleBooks}
        containerClassName="mt-12"
      />
    </div>
  );
};
export default Home;
