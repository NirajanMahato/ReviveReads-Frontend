import BookCard from "./BookCard";

const RecommendSection = () => {
  return (
    <>
      <div className="md:px-8 px-4 lg:mt-0 md:mt-6 mt-10 pb-20">
        <h1 className="md:text-2xl text-lg font-ppMori ">
          Recommended for you
        </h1>
        <BookCard />
      </div>
    </>
  );
};

export default RecommendSection;
