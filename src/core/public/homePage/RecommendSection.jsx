import { useEffect, useState } from "react";
import useApprovedBooks from "../../../hooks/useApprovedBooks";
import BookCard from "./BookCard";

const RecommendSection = ({activeTab, setActiveTab}) => {
  const { filteredBooks, filterBooks, loading } = useApprovedBooks(); // Use the custom hook

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterBooks(tab);
  };

  useEffect(() => {
    filterBooks(activeTab);
  }, [activeTab]);

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

        {loading ? (
          <div className="text-center mt-10"><h1 className="loading loading-infinity loading-lg"></h1></div>
        ) : (
          <BookCard products={filteredBooks} />
        )}
      </div>
    </>
  );
};

export default RecommendSection;
