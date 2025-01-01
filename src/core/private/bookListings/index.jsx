import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuSearch } from "react-icons/lu";
import useBooks from "../../../hooks/useBooks";

const BookListings = () => {
  const { allBooks, loading, setAllBooks } = useBooks();

  // State variables for filtering and sorting
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [conditionFilter, setConditionFilter] = useState("All Conditions");
  const [sortOption, setSortOption] = useState("Latest");

  // Filter books based on the selected criteria
  const filteredBooks = allBooks
    .filter((book) => {
      return (
        ((statusFilter === "All Statuses" || book.status === statusFilter) &&
          (conditionFilter === "All Conditions" ||
            book.condition === conditionFilter) &&
            book.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            book.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.seller.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortOption === "Price: Low to High") return a.price - b.price;
      if (sortOption === "Price: High to Low") return b.price - a.price;
      if (sortOption === "Latest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      return 0;
    });

  // Function to handle status updates
  const handleStatusUpdate = async (bookId, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/book/approve-book/${bookId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update the UI with the new status
      const updatedBooks = allBooks.map((book) =>
        book._id === bookId
          ? { ...book, status: response.data.data.status }
          : book
      );

      setAllBooks(updatedBooks);
      toast.success(`Book ${status.toLowerCase()} successfully!`);
    } catch (error) {
      toast.error("Failed to update book status.");
      console.error(error);
    }
  };

  return (
    <div className="px-4 bg-gray-100 min-h-screen flex flex-col">
      <h2 className="text-2xl font-bold">Book Listings</h2>

      {/* Filters Section */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-6 bg-white rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Search Box */}
              <div className="rounded-md flex items-center justify-around w-full py-2 border border-gray-300 bg-white">
                <input
                  type="text"
                  className="sm:text-sm"
                  placeholder="Search books, sellers, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <LuSearch className="text-lg text-gray-500" />
              </div>

              {/* Filter by Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md sm:text-sm"
              >
                <option>All Statuses</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Declined</option>
              </select>

              {/* Filter by Condition */}
              <select
                value={conditionFilter}
                onChange={(e) => setConditionFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md sm:text-sm"
              >
                <option>All Conditions</option>
                <option>Brand New</option>
                <option>Like New</option>
                <option>Used</option>
                <option>Acceptable</option>
              </select>

              {/* Sort by Price */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md sm:text-sm"
              >
                <option>Sort by: Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Book Table */}
          <div className="flex flex-col">
            <div className="py-2 min-w-full">
              <div className="overflow-hidden border-b border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="pl-6 py-3 text-left">Select</th>
                      <th className="px-6 w-full py-3 text-center">Book</th>
                      <th className="px-6 py-3 text-left">Genre</th>
                      <th className="px-6 py-3 text-left">Condition</th>
                      <th className="px-6 py-3 text-left">Seller</th>
                      <th className="px-6 py-3 text-left">Status</th>
                      <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBooks.map((book) => (
                      <tr key={book._id}>
                        <td className="pl-9 py-4">
                          <input type="checkbox" className="h-4 w-4" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col items-center">
                            <div className="grid grid-cols-4 gap-1 mb-2">
                              {book?.images.slice(0, 4).map((image, index) => (
                                <div
                                  key={index}
                                  className="w-10 h-10 overflow-hidden rounded"
                                >
                                  <img
                                    className="object-cover w-full h-full"
                                    src={`http://localhost:5000/product_images/${image}`}
                                    alt={`Image ${index + 1} of ${book.title}`}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="text-sm font-gilroyMedium text-gray-900 hover:text-custom cursor-pointer">
                              {book?.title}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">{book.genre}</td>
                        <td className="px-6 py-4">{book.condition}</td>
                        <td className="px-6 py-4 ">{book.seller.name}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                              book.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : book.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : book.status === "Declined"
                                ? "bg-red-100 text-red-800"
                                : ""
                            }`}
                          >
                            {book.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(book._id, "Approved")
                              }
                              className="py-1 w-20 text-sm text-white bg-gray-900 hover:bg-green-600 rounded-md border border-transparent"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(book._id, "Declined")
                              }
                              className="py-1 w-20 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md border border-transparent"
                            >
                              Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookListings;
