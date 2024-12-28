import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import axios from "axios";

const RecommendSection = () => {
  const [activeTab, setActiveTab] = useState("Recommended");
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    const fetchbooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/book/get-all-books"
        );
        const books = response?.data;
  
        setAllBooks(books);
        filterBooks("Recommended", books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchbooks();
  }, []);
  
  const filterBooks = (tab, books) => {
    if (tab === "New Listings") {
      // Sort books based on createdAt timestamp for 'New Listings'
      const sortedBooks = [...books].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFilteredBooks(sortedBooks);
    } else if (tab === "Recommended") {
      // Recommendation logic based on price and condition
      const recommended = books
        .sort((a, b) => a.price - b.price) // Lower price first
        .filter((book) => book.condition === "Like New" || book.condition === "Brand New"); // Filter by better condition
      setFilteredBooks(recommended);
    }
  };

  // Handle tab switch
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterBooks(tab, allBooks);
  };

  return (
    <>
      <div className="md:px-8 px-4 lg:mt-0 md:mt-6 mt-10 pb-20">
        <button
          onClick={() => handleTabChange("Recommended")}
          className={`mr-4 md:text-xl text-lg font-ppMori ${
            activeTab === "Recommended"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-600 border-b-2 border-transparent"
          }`}
        >
          Recommended
        </button>
        <button
          onClick={() => handleTabChange("New Listings")}
          className={`md:text-xl text-lg font-ppMori ${
            activeTab === "New Listings"
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-600 border-b-2 border-transparent"
          }`}
        >
          New Listings
        </button>

        <BookCard products={filteredBooks} />
      </div>
    </>
  );
};

export default RecommendSection;
