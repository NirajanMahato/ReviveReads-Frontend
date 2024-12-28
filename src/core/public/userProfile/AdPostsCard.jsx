import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import notAvailable from "/BG/notAvailable.svg";

const AdPostsCard = () => {
  const [products, setProducts] = useState([]); // Original product list
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [searchQuery, setSearchQuery] = useState(""); // Search input state

  // Fetch Books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/book/get-book-by-user",
          {
            headers: {
              id: localStorage.getItem("id"),
            },
          }
        );
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Delete Book Function
  const deleteBook = async (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        "http://localhost:5000/book/delete-book",
        {
          headers: {
            bookid: bookId,
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(response.data.message);

      // Remove deleted book from the list
      const updatedProducts = products.filter(
        (product) => product._id !== bookId
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Search Filter
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered); // Update filtered results
  };

  return (
    <>
      <div className="font-gilroy">
        {/* Search Bar */}
        <div
          className={
            "md:w-10/12 w-11/12 py-2 border-solid border rounded-lg border-gray-500 mt-6 flex items-center justify-between p-4"
          }
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch} // Search functionality
            placeholder="Search Books"
            className="w-full focus:outline-none"
          />
          <span className={"text-2xl text-gray-600 cursor-pointer"}>
            <LuSearch />
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-y-8 gap-y-5 mt-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product?._id}
                className="flex items-center gap-x-2 lg:w-96 border rounded-lg p-3 hover:shadow-sm hover:border-gray-300 transition-all delay-75"
              >
                <Link>
                  <img
                    src={`http://localhost:5000/product_images/${product?.images[0]}`}
                    alt={product.title}
                    className="rounded-lg lg:w-36 md:w-40 w-32 md:h-44 h-36 object-cover"
                  />
                </Link>
                <div className="info-div flex flex-col px-2 pb-2">
                  <div className="hover:cursor-pointer">
                    <h1
                      className="font-gilroySemiBold md:text-lg "
                      style={{ lineHeight: "1" }}
                    >
                      {product?.title}
                    </h1>
                    <h1
                      className="md:text-xs text-[10px] text-gray-600 mt-1 md:mb-0 mb-1"
                      style={{ lineHeight: "1" }}
                    >
                      {product.description.length > 50
                        ? `${product?.description.substring(0, 50)}...`
                        : product?.description}
                    </h1>
                  </div>
                  <div className="flex items-center justify-between md:mt-3 mt-1">
                    <h1 className="font-gilroySemiBold text-gray-700 md:text-lg text-sm">
                      NPR {""}
                      {product?.price}
                    </h1>
                    <h1
                      className={`text-[10px] rounded-full px-[6px] py-[2px] bg-opacity-80 ${
                        product.condition === "Like New"
                          ? "bg-blue-200"
                          : product.condition === "Used"
                          ? "bg-yellow-200"
                          : product.condition === "Brand New"
                          ? "bg-green-200"
                          : product.condition === "Acceptable"
                          ? "bg-purple-200"
                          : "bg-gray-200 bg-opacity-80"
                      }`}
                    >
                      {product?.condition}
                    </h1>
                  </div>
                  <div className="flex md:text-xs text-[11px] justify-between border-b md:pb-2 pb-1">
                    <h1 className="pr-1 text-gray-600">
                      Posted{" "}
                      {formatDistanceToNowStrict(new Date(product?.updatedAt))}{" "}
                      ago
                    </h1>
                  </div>
                  <div className="flex md:mt-3 mt-2 text-gray-600">
                    <button className="flex items-center w-1/2 hover:text-green-700">
                      <FaEdit className="md:text-lg" />
                      <h1 className="text-sm pl-1">Edit</h1>
                    </button>
                    <button
                      onClick={() => deleteBook(product?._id)}
                      className="flex items-center w-1/2 hover:text-red-700"
                    >
                      <AiOutlineDelete className="md:text-xl" />
                      <h1 className="text-sm">Delete</h1>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-center">
                <img
                  src={notAvailable}
                  alt="No Ads Available"
                  className="w-40 mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold">No Ads Available</h2>
                <p className="text-gray-500 mb-4">
                  Start selling by posting your first ad
                </p>
                <button className="bg-gray-800 text-white px-4 py-2 rounded-md">
                  Post New Ad
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdPostsCard;
