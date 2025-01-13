import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { RiMessage3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import useConversation from "../../../zustand/useConverstaion";
import ChatModal from "./ChatModal";

const BookCard = ({ products, userId }) => {
  const authenticateToken = localStorage.getItem("token");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { setSelectedConversation } = useConversation();

  // Handle opening the chat modal
  const handleChatNow = async (seller) => {
    if (authenticateToken) {
      try {
        const res = await axios.get(`/api/user/get-user-by-id/${seller}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSelectedConversation(res.data);
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.error
          : error.message;
        toast.error(errorMessage);
      }
      setIsChatOpen(true); // Open modal
    } else {
      toast.error("Please login to chat with the seller.");
    }
  };

  const handleSaveBook = async (bookId) => {
    if (authenticateToken) {
      try {
        const response = await axios.post(
          "/api/user/add-to-favorites",
          { bookId },
          {
            headers: {
              Authorization: `Bearer ${authenticateToken}`,
            },
          }
        );
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please login to save the book.");
    }
  };

  return (
    <div
      className={`grid grid-cols-1 gap-x-10 md:gap-y-8 gap-y-5 mt-6 ${
        userId
          ? "grid-cols-1 xl:grid-cols-2 lg:px-8"
          : "md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {products.map((product) => (
        <div
          key={product?._id}
          className="flex flex-col md:flex-row items-center max-w-96 border rounded-lg p-3 hover:shadow-lg hover:bg-blue-50 hover:bg-opacity-50 hover:border-gray-300 transition-all delay-75"
        >
          <Link to={`/products/${product?._id}`} className=" md:w-44 w-full">
            <img
              src={`/api/product_images/${product?.images[0]}`}
              alt={product.title}
              className="w-full h-40 md:h-44 object-cover rounded-lg hover:scale-105 transition-all delay-75 hover:cursor-pointer"
            />
          </Link>
          <div className="info-div flex flex-col px-2 py-2 w-full">
            <div className="hover:cursor-pointer">
              <h1
                className="font-gilroySemiBold md:text-lg"
                style={{ lineHeight: "1" }}
              >
                {product?.title}
              </h1>
              <h1
                className="md:text-xs text-[10px] text-gray-600 mt-1"
                style={{ lineHeight: "1" }}
              >
                {product.description.length > 50
                  ? `${product?.description.substring(0, 50)}...`
                  : product?.description}
              </h1>
            </div>
            <div className="flex items-center justify-between md:mt-3 mt-1">
              <h1 className="font-gilroySemiBold text-gray-700 md:text-lg text-sm">
                NPR {product?.price}
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
            <div className="flex justify-between border-b pb-1 mt-2 text-gray-600 md:text-xs text-[10px]">
              <h1>{product.seller?.address}</h1>
              <h1>
                {formatDistanceToNowStrict(new Date(product?.updatedAt))} ago
              </h1>
            </div>
            <div className="flex mt-3 justify-between text-gray-600">
              <button
                onClick={() => handleSaveBook(product?._id)}
                className="flex items-center hover:text-yellow-600"
              >
                <MdOutlineBookmarkAdd className="text-xl" />
                <span className="text-sm ml-1">Save</span>
              </button>
              <button
                onClick={() => handleChatNow(product?.seller?._id)}
                className="flex items-center hover:text-green-700"
              >
                <RiMessage3Line className="text-xl" />
                <span className="text-sm ml-1">Chat now</span>
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Chat Modal */}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default BookCard;
